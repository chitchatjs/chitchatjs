import { IntentRequest } from "ask-sdk-model";
import { WhenUserSaysBlock } from "@chitchatjs/core";
import { v1 } from "ask-smapi-model";
import { extractVariables, getSlotTypeFromSlotName } from "../../util/StringUtils";
import {
    AlexaBlock,
    AlexaBuilderContext,
    AlexaDialogContext,
    AlexaEvent,
    DEFAULT_LOCALE,
    Intent,
    InteractionModel,
    Locale,
    Slot,
} from "../../models";
import { resource_utils, paths } from "../../util/ResourceUtil";

type TypeMapping = { [name: string]: string };

/**
 * WhenUserSaysBlock implementation for Alexa
 */
export class WhenUserSaysBlockBuilder {
    private _sampleUtterances: string[];
    private _thenBlock?: AlexaBlock;
    private _otherwiseBlock?: AlexaBlock;
    private _typeMapping?: TypeMapping;

    constructor() {
        this._sampleUtterances = [];
        this._typeMapping = {};
    }

    userSays(sampleUtterances: string[]) {
        this._sampleUtterances = sampleUtterances;
        return this;
    }

    withSlotType(slotName: string, slotType: string) {
        if (this._typeMapping) {
            this._typeMapping[slotName] = slotType;
        }
        return this;
    }

    then(block: AlexaBlock) {
        this._thenBlock = block;
        return this;
    }

    otherwise(block: AlexaBlock) {
        this._otherwiseBlock = block;
        return this;
    }

    build(): WhenUserSaysBlock<AlexaBuilderContext, AlexaDialogContext, AlexaEvent> {
        if (this._sampleUtterances === undefined || this._sampleUtterances.length == 0) {
            throw new Error("WhenUserSays block is missing sample utterances.");
        }

        if (this._thenBlock === undefined) {
            throw new Error("Then block is missing in the when().then(..).");
        }

        return {
            type: "WhenUserSaysBlock",
            then: this._thenBlock,
            otherwise: this._otherwiseBlock,
            execute: this._executor,
            sampleUtterances: this._sampleUtterances,
            build: this._builder,
        };
    }

    // Generate intent name from the first utterance
    private _generateIntentName = (sampleUtterances: string[]) => {
        return sampleUtterances[0].replace(/[^a-zA-Z]/g, "").substring(0, 10) + "Intent";
    };

    private _isIntentMatching = (event: AlexaEvent, intentName: string): boolean => {
        if (event.currentRequest.request.type === "IntentRequest") {
            return (<IntentRequest>event.currentRequest.request).intent.name === intentName;
        } else {
            return false;
        }
    };

    private _executor = (context: AlexaDialogContext, event: AlexaEvent) => {
        let intentName = this._generateIntentName(this._sampleUtterances);

        if (this._isIntentMatching(event, intentName) === true) {
            this._thenBlock?.execute && this._thenBlock?.execute(context, event);
        } else {
            this._otherwiseBlock?.execute && this._otherwiseBlock?.execute(context, event);
        }
    };

    private _builder = (context: AlexaBuilderContext) => {
        let locales = context.currentLocales;
        if (!locales || locales.length === 0) {
            this._updateArtifacts(context, DEFAULT_LOCALE);
        } else {
            locales.forEach((locale) => this._updateArtifacts(context, locale));
        }
    };

    private _updateArtifacts = (context: AlexaBuilderContext, locale: Locale) => {
        let vars: string[] = [];
        this._sampleUtterances.forEach((utt: string) => {
            vars.push(...new Set(extractVariables(utt)));
        });
        vars = [...new Set(vars)];

        let slots = vars.map((v: string) => {
            return this._buildSlot(v);
        });

        let intent: Intent = {
            name: this._generateIntentName(this._sampleUtterances),
            samples: this._sampleUtterances,
            slots: slots,
        };

        this._updateInteractionModel(context, intent, slots, locale);
    };

    private _updateInteractionModel = (context: AlexaBuilderContext, intent: Intent, slots: Slot[], locale: Locale) => {
        let imPath = paths.getInteractionModelPath(locale);

        let im: InteractionModel | undefined = undefined;
        if (!context.resources.resourceMap[imPath]) {
            im = resource_utils.getDefaultInteractionModel();
        } else {
            im = JSON.parse(context.resources.resourceMap[paths.getInteractionModelPath(locale)]);
        }

        if (!im) return;

        im.interactionModel?.languageModel?.intents?.push(intent);

        let proposedSlotTypeNames = slots.map((s) => {
            return s.type;
        });

        let existingSlotTypeNames = im.interactionModel?.languageModel?.types?.map((t) => {
            return t.name;
        });
        existingSlotTypeNames = existingSlotTypeNames || [];

        let allSlotTypeNames = [...new Set([...proposedSlotTypeNames, ...existingSlotTypeNames])];

        allSlotTypeNames.forEach((t) => {
            if (!existingSlotTypeNames?.includes(t) && t?.startsWith("AMAZON.") === false) {
                im?.interactionModel?.languageModel?.types?.push({
                    name: t,
                    values: [],
                });
            }
        });
        context.resources.resourceMap[paths.getInteractionModelPath(locale)] = JSON.stringify(im);
    };

    private _buildSlot(slotName: string): v1.skill.interactionModel.SlotDefinition {
        let slot: { name: string; type: string } | undefined = getSlotTypeFromSlotName(slotName);

        if (slot) {
            return {
                name: slot.name,
                samples: [],
                type: slot.type,
            };
        } else if (this._typeMapping && this._typeMapping[slotName]) {
            // check the with operator
            return {
                name: slotName,
                samples: [],
                type: this._typeMapping[slotName],
            };
        } else {
            throw new Error(`Type mapping is missing for slot "${slotName}", try using .withTypes()`);
        }
    }
}
