import { BuilderContext, DialogContext, Event, TellSpeechBlock } from "@chitchatjs/core";
import { ResponseFactory } from "ask-sdk-core";
import { interpolateString } from "../../util/StringUtils";

/**
 * Alexa platform implementation of TellSpeechBlock
 */
export class TellSpeechBlockBuilder {
    private _say: string;

    constructor(msg: string) {
        this._say = msg;
    }

    build(): TellSpeechBlock {
        return {
            type: "TellSpeechBlock",
            say: this._say,
            execute: this._executor,
            build: (context: BuilderContext) => {},
        };
    }

    private _executor = (context: DialogContext, event: Event): void => {
        let responseBuilder = ResponseFactory.init();
        responseBuilder.speak(interpolateString(this._say, context.platformState.globalState));
        context.currentResponse.response = Object.assign(
            context.currentResponse.response,
            responseBuilder.getResponse()
        );
    };
}
