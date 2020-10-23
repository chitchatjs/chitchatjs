import { ResponseFactory } from "ask-sdk-core";

import { AlexaBuilderContext, AlexaDialogContext, AlexaEvent, EmptyBlock } from "../../models";

/**
 * Renders an empty response. This is useful when returing a response back for SessionEndedRequest.
 */
export class EmptyBlockBuilder {
  constructor() {}

  build(): EmptyBlock {
    return {
      type: "EmptyBlock",
      execute: this._executor,
      build: (context: AlexaBuilderContext) => {},
    };
  }

  private _executor = (context: AlexaDialogContext, event: AlexaEvent): void => {
    context.currentResponse.response = ResponseFactory.init().getResponse();
  };
}
