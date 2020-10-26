import {
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent,
  InteractionModel,
  Locale,
  SlotType,
  SlotTypeBlock,
  SlotTypeValue,
} from "../../models";
import { paths, resource_utils } from "../../util/ResourceUtil";

/**
 * Adds a slot type
 */
export class SlotTypeBlockBuilder {
  private _name?: string;
  private _values?: SlotTypeValue[];

  private _slotType?: SlotType;

  constructor(name?: string) {
    this._name = name;
  }

  values(values: string[]) {
    this._values = [];
    values.forEach((v) => {
      this._values?.push({
        name: {
          value: v,
        },
      });
    });
    return this;
  }

  import(slotType: SlotType) {
    this._slotType = slotType;
    return this;
  }

  build(): SlotTypeBlock {
    if (this._name || this._values) {
      if (!this._name) {
        throw new Error("name is missing in the SlotTypeBlock.");
      }
      if (!this._values || this._values.length === 0) {
        throw new Error("values are missing in the SlotTypeBlock.");
      }
      this._slotType = {
        name: this._name,
        values: this._values,
      };
    } else if (!this._slotType) {
      throw new Error("Either (name,values) or slotType is required in the SlotTypeBlock.");
    }

    return {
      type: "SlotTypeBlock",
      slotType: this._slotType,
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
    if (!this._slotType) {
      return;
    }

    const im: InteractionModel = resource_utils.getInteractionModelOrDefault(context, locale);
    const slotTypes = im.interactionModel?.languageModel?.types;
    const slotTypeToAdd = this._slotType;

    const duplicateSlotTypes = slotTypes?.filter((slotType: SlotType) => {
      return slotType.name === slotTypeToAdd.name;
    });

    // if we find a slot type with same name
    // replace the old definition
    if (duplicateSlotTypes && duplicateSlotTypes.length > 0) {
      const updatedSlotTypes = slotTypes?.map((slotType) =>
        slotType.name === slotTypeToAdd.name ? slotTypeToAdd : slotType
      );
      im.interactionModel!.languageModel!.types = updatedSlotTypes;
    } else {
      // otherwise add it to the list
      im.interactionModel?.languageModel?.types?.push(this._slotType);
    }
    context.resources.resourceMap[paths.getInteractionModelPath(locale)] = JSON.stringify(im);
  };
}
