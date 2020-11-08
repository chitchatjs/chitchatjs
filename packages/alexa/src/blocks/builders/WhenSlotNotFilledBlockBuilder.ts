import { IntentRequest } from "ask-sdk-model";
import {
  AlexaBlock,
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent,
  builtins,
  WhenSlotNotFilledBlock,
} from "../../models";

export class WhenSlotNotFilledBlockBuilder {
  private _slotName: string;
  private _thenBlock?: AlexaBlock;
  private _otherwiseBlock?: AlexaBlock;

  constructor(name: builtins.SlotType | string) {
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

  private _executor = async (context: AlexaDialogContext, event: AlexaEvent) => {
    if (event.currentRequest.request.type !== "IntentRequest") return;

    const request: IntentRequest = event.currentRequest.request;
    if (!context.platformState.globalState[this._slotName]) {
      await this._thenBlock?.execute(context, event);
    } else {
      await this._otherwiseBlock?.execute(context, event);
    }
  };

  private _builder = (context: AlexaBuilderContext) => {};
}
