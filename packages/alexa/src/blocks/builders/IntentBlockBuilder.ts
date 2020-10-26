import {
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent,
  Intent,
  IntentBlock,
  InteractionModel,
  Locale,
  Slot,
} from "../../models";
import { paths, resource_utils } from "../../util/ResourceUtil";

/**
 * Adds a slot type
 */
export class IntentBlockBuilder {
  private _name?: string;
  private _slots?: Slot[];
  private _samples?: string[];

  constructor(name?: string, samples?: string[], slots?: Slot[]) {
    this._name = name;
    this._samples = samples || [];
    this._slots = slots || [];
  }

  name(name: string) {
    this._name = name;
    return this;
  }

  samples(samples: string[]) {
    this._samples = samples;
    return this;
  }

  slot(name: string, typeName: string) {
    this._slots?.push({ name, type: typeName });
    return this;
  }

  build(): IntentBlock {
    if (!this._name) {
      throw new Error("name is missing in the intent block.");
    }

    return {
      type: "IntentBlock",
      name: this._name,
      samples: this._samples || [],
      slots: this._slots || [],
      execute: this._executor,
      build: this._builder,
    };
  }

  private _executor = (context: AlexaDialogContext, event: AlexaEvent): void => {};

  private _builder = (context: AlexaBuilderContext) => {
    // add slot type to the interaction model in the locale specified
    resource_utils.invokePerLocale(context, this._updateInteractionModel);
  };

  private _updateInteractionModel = (context: AlexaBuilderContext, locale: Locale): void => {
    const im: InteractionModel = resource_utils.getInteractionModelOrDefault(context, locale);
    const intents = im.interactionModel?.languageModel?.intents;
    const intentToAdd: Intent = {
      name: this._name,
      samples: this._samples,
      slots: this._slots,
    };

    const duplicateIntents = intents?.filter((intent: Intent) => {
      return intent.name === intentToAdd.name;
    });

    // if we find intent with same name.
    // replace the old definition
    if (duplicateIntents && duplicateIntents.length > 0) {
      const updatedIntents = intents?.map((intent) =>
        intent.name === intentToAdd.name ? intentToAdd : intent
      );
      im.interactionModel!.languageModel!.intents = updatedIntents;
    } else {
      // otherwise add it to the list
      im.interactionModel?.languageModel?.intents?.push(intentToAdd);
    }
    context.resources.resourceMap[paths.getInteractionModelPath(locale)] = JSON.stringify(im);
  };
}
