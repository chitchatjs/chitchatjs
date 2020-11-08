import { IntentRequest } from "ask-sdk-model";
import { WhenUserSaysBlock } from "@chitchatjs/core";
import { v1 } from "ask-smapi-model";
import {
  extractVariables,
  getSlotTypeFromSlotName,
  listEquals,
} from "../../util/StringUtils";
import {
  AlexaBlock,
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent,
  builtins,
  DEFAULT_LOCALE,
  Intent,
  InteractionModel,
  Locale,
  Slot,
} from "../../models";
import { resource_utils, paths } from "../../util/ResourceUtil";
import { intent_utils } from "../../util/IntentUtils";
import { context_util } from "../../util/ContextUtil";

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

  withSlotType(slotName: string, slotType: builtins.SlotType | string) {
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
    if (this._sampleUtterances === undefined || this._sampleUtterances.length === 0) {
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
      const intentRequest: IntentRequest = event.currentRequest.request;
      return intentRequest.intent.name === intentName;
    } else {
      return false;
    }
  };

  private _executor = async (context: AlexaDialogContext, event: AlexaEvent) => {
    const intentName = this._generateIntentName(this._sampleUtterances);

    if (this._isIntentMatching(event, intentName) === true) {
      this._addSlotsToGlobalState(context, event);
      this._thenBlock?.execute && (await this._thenBlock?.execute(context, event));
    } else {
      this._otherwiseBlock?.execute &&
        (await this._otherwiseBlock?.execute(context, event));
    }
  };

  private _builder = (context: AlexaBuilderContext) => {
    const locales = context.currentLocales;
    if (!locales || locales.length === 0) {
      this._updateArtifacts(context, DEFAULT_LOCALE);
    } else {
      locales.forEach((locale) => this._updateArtifacts(context, locale));
    }
  };

  private _addSlotsToGlobalState(context: AlexaDialogContext, event: AlexaEvent) {
    if (event.currentRequest.request.type === "IntentRequest") {
      const intentRequest: IntentRequest = event.currentRequest.request;
      // update state to capture slots
      const state = context.platformState.globalState;
      const flattenSlots = intent_utils.flattenSlotValues(intentRequest);
      context.platformState.globalState = Object.assign(state, flattenSlots);
    }
  }

  private _updateArtifacts = (context: AlexaBuilderContext, locale: Locale) => {
    let vars: string[] = [];
    this._sampleUtterances.forEach((utt: string) => {
      vars.push(...new Set(extractVariables(utt)));
    });
    vars = [...new Set(vars)];

    const slots = vars.map((v: string) => {
      return this._buildSlot(v);
    });

    const intent: Intent = {
      name: this._generateIntentName(this._sampleUtterances),
      samples: this._sampleUtterances,
      slots,
    };

    const duplicateSamples = this._utterancesAlreadyExist(context, intent, locale);

    // only add if interaction model doesn't already have this list
    if (!duplicateSamples) {
      this._updateInteractionModel(context, intent, slots, locale);
    }
  };

  private _utterancesAlreadyExist(
    context: AlexaBuilderContext,
    intent: Intent,
    locale: Locale
  ) {
    const intentSamples = intent.samples || [];

    const im = context_util.getIM(context, locale);
    const imIntents: Intent[] = im.interactionModel?.languageModel?.intents || [];

    for (const k in imIntents) {
      if (imIntents.hasOwnProperty(k)) {
        const imIntent = imIntents[k];
        const imIntentSamples = imIntent.samples || [];

        if (listEquals(intentSamples, imIntentSamples)) {
          return true;
        }
      }
    }
    return false;
  }

  private _updateInteractionModel = (
    context: AlexaBuilderContext,
    intent: Intent,
    slots: Slot[],
    locale: Locale
  ) => {
    const imPath = paths.getInteractionModelPath(locale);

    let im: InteractionModel | undefined;
    if (!context.resources.resourceMap[imPath]) {
      im = resource_utils.getDefaultInteractionModel();
    } else {
      im = JSON.parse(
        context.resources.resourceMap[paths.getInteractionModelPath(locale)]
      );
    }

    if (!im) return;

    im.interactionModel?.languageModel?.intents?.push(intent);

    const proposedSlotTypeNames = slots.map((s) => {
      return s.type;
    });

    let existingSlotTypeNames = im.interactionModel?.languageModel?.types?.map((t) => {
      return t.name;
    });
    existingSlotTypeNames = existingSlotTypeNames || [];

    const allSlotTypeNames = [
      ...new Set([...proposedSlotTypeNames, ...existingSlotTypeNames]),
    ];

    allSlotTypeNames.forEach((t) => {
      if (!existingSlotTypeNames?.includes(t) && t?.startsWith("AMAZON.") === false) {
        im?.interactionModel?.languageModel?.types?.push({
          name: t,
          values: [],
        });
      }
    });
    context.resources.resourceMap[paths.getInteractionModelPath(locale)] = JSON.stringify(
      im
    );
  };

  private _buildSlot(slotName: string): v1.skill.interactionModel.SlotDefinition {
    const slot: { name: string; type: string } | undefined = getSlotTypeFromSlotName(
      slotName
    );

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
      throw new Error(
        `Type mapping is missing for slot "${slotName}", try using .withTypes()`
      );
    }
  }
}
