import { IntentRequest } from "ask-sdk-model";
import { Context } from "mustache";
import { AlexaBlock, AlexaBuilderContext, AlexaDialogContext, AlexaEvent, WhenSlotNotFilledBlock } from "../../models";

export class WhenSlotNotFilledBlockBuilder {
  private _slotName: string;
  private _intentName?: string;
  private _thenBlock?: AlexaBlock;
  private _otherwiseBlock?: AlexaBlock;

  constructor(name: string) {
    this._slotName = name;
  }

  for(intentName: string) {
    this._intentName = intentName;
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

  build(): WhenSlotNotFilledBlock {
    if (!this._slotName || this._slotName === "") {
      throw new Error("WhenSlotNotFilledBlock must be supplied a slot name.");
    }

    if (this._thenBlock === undefined) {
      throw new Error("then() block is missing in the whenSlotNotFilled().");
    }

    return {
      type: "WhenSlotNotFilledBlock",
      name: this._slotName,
      intentName: this._intentName,
      then: this._thenBlock,
      otherwise: this._otherwiseBlock,
      execute: this._executor,
      build: this._builder,
    };
  }

  private _executor = (context: AlexaDialogContext, event: AlexaEvent) => {
    let request = <IntentRequest>event.currentRequest.request;
    if (request.type !== "IntentRequest") return;

    // if intent name is provided but request doesn't match the intent name
    if (this._intentName && request.intent.name !== this._intentName) {
      this._otherwiseBlock?.execute(context, event);
    }

    let slots = request.intent.slots;
    if (slots && slots[this._slotName] && !slots[this._slotName].value) {
      this._thenBlock?.execute(context, event);
    } else {
      this._otherwiseBlock?.execute(context, event);
    }
  };

  private _builder = (context: AlexaBuilderContext) => {};
}
