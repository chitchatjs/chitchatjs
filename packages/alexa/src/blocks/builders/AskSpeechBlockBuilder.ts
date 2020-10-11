import { ResponseFactory } from "ask-sdk-core";
import { AskSpeechBlock, BuilderContext, DialogContext, Event } from "@chitchatjs/core";
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

    say(msg: string) {
        this._say = msg;
        return this;
    }

    reprompt(msg: string) {
        this._reprompt = msg;
        return this;
    }

    build(): AskSpeechBlock {
        return {
            type: "AskSpeechBlock",
            say: this._say,
            reprompt: this._reprompt,
            execute: this._executor,
            build: (context: BuilderContext) => {},
        };
    }

    private _executor = (context: DialogContext, event: Event): void => {
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
