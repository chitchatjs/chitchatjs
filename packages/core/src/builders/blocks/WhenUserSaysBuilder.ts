import { IntentRequest } from "ask-sdk-model";
import { Block, Event, Context, WhenBlock, WhenUserSaysBlock, BuilderContext } from "../../models";
import { WhenBlockBuilder } from "./WhenBlockBuilder";
import { v1 } from "ask-smapi-model";
import { extractVariables, slotToSlotTypeMapping } from "../../util/StringUtils";

export class WhenUserSaysBlockBuilder {
    private _sampleUtterances: string[];
    private _thenBlock?: Block;
    private _otherwiseBlock?: Block;

    constructor() {
        this._sampleUtterances = [];
    }

    userSays(sampleUtterances: string[]) {
        this._sampleUtterances = sampleUtterances;
        return this;
    }

    then(block: Block) {
        this._thenBlock = block;
        return this;
    }

    otherwise(block: Block) {
        this._otherwiseBlock = block;
        return this;
    }

    build(): WhenUserSaysBlock {
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
            generatedIntentName: this._generateIntentName(this._sampleUtterances),
            sampleUtterances: this._sampleUtterances,
            build: this._builder,
        };
    }

    // Generate intent name from the first utterance
    private _generateIntentName = (sampleUtterances: string[]) => {
        return sampleUtterances[0].replace(/[^a-zA-Z]/g, "").substring(0, 10) + "Intent";
    };

    private _isIntentMatching = (event: Event, intentName: string): boolean => {
        return (<IntentRequest>event.currentRequest.request).intent.name === intentName;
    };

    private _executor = (context: Context, event: Event) => {
        let intentName = this._generateIntentName(this._sampleUtterances);

        if (this._isIntentMatching(event, intentName) === true) {
            this._thenBlock?.execute && this._thenBlock?.execute(context, event);
        } else {
            this._otherwiseBlock?.execute && this._otherwiseBlock?.execute(context, event);
        }
    };

    private _builder = (context: BuilderContext) => {
        let vars: string[] = [];
        this._sampleUtterances.forEach((utt: string) => {
            vars.push(...extractVariables(utt));
        });

        let slots = vars.map((v: string) => {
            return this._buildSlot(v);
        });

        let intent: v1.skill.interactionModel.Intent = {
            name: this._generateIntentName(this._sampleUtterances),
            samples: this._sampleUtterances,
            slots: slots,
        };

        // TODO need to figure out the locale story
        context.package.interactionModels["en-US"].interactionModel?.languageModel?.intents?.push(intent);
    };

    private _buildSlot(slotName: string): v1.skill.interactionModel.SlotDefinition {
        let slotType = slotToSlotTypeMapping(slotName);
        return {
            name: slotName,
            samples: [],
            type: slotType,
        };
    }
}
