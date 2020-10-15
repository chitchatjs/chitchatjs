import { IntentRequest } from "ask-sdk-model";
import { AlexaBlock, AlexaBuilderContext, AlexaDialogContext, AlexaEvent, WhenSlotNotFilledBlock } from "../../models";

export class WhenSlotNotFilledBlockBuilder {
  private _slotName: string;
  private _thenBlock?: AlexaBlock;
  private _otherwiseBlock?: AlexaBlock;

  constructor(name: string) {
    this._slotName = name;
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
      then: this._thenBlock,
      otherwise: this._otherwiseBlock,
      execute: this._executor,
      build: this._builder,
    };
  }

  private _executor = (context: AlexaDialogContext, event: AlexaEvent) => {
    let request = <IntentRequest>event.currentRequest.request;
    if (request.type !== "IntentRequest") return;

    if (!context.platformState.globalState[this._slotName]) {
      this._thenBlock?.execute(context, event);
    } else {
      this._otherwiseBlock?.execute(context, event);
    }
  };

  private _builder = (context: AlexaBuilderContext) => {};
}
