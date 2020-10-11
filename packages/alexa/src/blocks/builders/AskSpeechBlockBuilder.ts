import { ResponseFactory } from "ask-sdk-core";
import { AskSpeechBlock } from "@chitchatjs/core";
import { interpolateString } from "../../util/StringUtils";
import { AlexaBuilderContext, AlexaDialogContext, AlexaEvent } from "../../models";

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

    say(msg: string) {
        this._say = msg;
        return this;
    }

    reprompt(msg: string) {
        this._reprompt = msg;
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
        let responseBuilder = ResponseFactory.init();
        responseBuilder
            .speak(interpolateString(this._say, context.platformState.globalState))
            .reprompt(interpolateString(this._reprompt, context.platformState.globalState));
        context.currentResponse.response = Object.assign(
            context.currentResponse.response,
            responseBuilder.getResponse()
        );
    };
}
