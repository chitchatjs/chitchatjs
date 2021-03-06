import { ResponseFactory } from "ask-sdk-core";

import { AskSpeechBlock } from "@chitchatjs/core";

import { AlexaBuilderContext, AlexaDialogContext, AlexaEvent, SSMLSpeechBlock } from "../../models";
import { context_util } from "../../util/ContextUtil";
import { interpolateString } from "../../util/StringUtils";

/**
 * An Alexa Platform implementation of AskSpeechBlock
 */
export class AskSpeechBlockBuilder {
  private _say: string;
  private _reprompt: string;

  constructor() {
    this._say = "";
    this._reprompt = "";
  }

  say(msg: string | SSMLSpeechBlock) {
    if (typeof msg === "string") {
      this._say = msg;
    } else {
      const ssmlMsg: SSMLSpeechBlock = msg;
      this._say = msg.speech;
    }
    return this;
  }

  reprompt(msg: string | SSMLSpeechBlock) {
    if (typeof msg === "string") {
      this._reprompt = msg;
    } else {
      const ssmlMsg: SSMLSpeechBlock = msg;
      this._reprompt = ssmlMsg.speech;
    }
    return this;
  }

  build(): AskSpeechBlock<AlexaBuilderContext, AlexaDialogContext, AlexaEvent> {
    return {
      type: "AskSpeechBlock",
      say: this._say,
      reprompt: this._reprompt,
      execute: this._executor,
      build: (context: AlexaBuilderContext) => {},
    };
  }

  private _executor = (context: AlexaDialogContext, event: AlexaEvent): void => {
    if (context_util.shouldRender(context, event)) {
      const responseBuilder = ResponseFactory.init();
      responseBuilder
        .speak(interpolateString(this._say, context.platformState.globalState))
        .reprompt(interpolateString(this._reprompt, context.platformState.globalState));
      context.currentResponse.response = Object.assign(
        context.currentResponse.response,
        responseBuilder.getResponse()
      );
    }
  };
}
