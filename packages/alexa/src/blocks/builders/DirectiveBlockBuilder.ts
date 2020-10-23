import { ResponseFactory } from "ask-sdk-core";
import { Directive } from "ask-sdk-model";

import { AlexaBuilderContext, AlexaDialogContext, AlexaEvent, DirectiveBlock } from "../../models";
import { context_util } from "../../util/ContextUtil";

/**
 * Directive Block Builder
 */
export class DirectiveBlockBuilder {
  private _directive: Directive;
  constructor(directive: Directive) {
    this._directive = directive;
  }

  build(): DirectiveBlock {
    return {
      type: "DirectiveBlock",
      directive: this._directive,
      execute: this._executor,
      build: (context: AlexaBuilderContext) => {},
    };
  }

  private _executor = (context: AlexaDialogContext, event: AlexaEvent): void => {
    if (context_util.shouldRender(context, event)) {
      let responseBuilder = ResponseFactory.init();
      responseBuilder.addDirective(this._directive);

      if (!context.currentResponse.response.directives) {
        context.currentResponse.response.directives = [];
      }
      context.currentResponse.response.directives.push(this._directive);
    }
  };
}
