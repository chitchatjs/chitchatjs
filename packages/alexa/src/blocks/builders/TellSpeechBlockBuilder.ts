import { TellSpeechBlock } from "@chitchatjs/core";
import { ResponseFactory } from "ask-sdk-core";
import { AlexaBuilderContext, AlexaDialogContext, AlexaEvent } from "../../models";
import { interpolateString } from "../../util/StringUtils";

/**
 * Alexa platform implementation of TellSpeechBlock
 */
export class TellSpeechBlockBuilder {
    private _say: string;

    constructor(msg: string) {
        this._say = msg;
    }

    build(): TellSpeechBlock<AlexaBuilderContext, AlexaDialogContext, AlexaEvent> {
        return {
            type: "TellSpeechBlock",
            say: this._say,
            execute: this._executor,
            build: (context: AlexaBuilderContext) => {},
        };
    }

    private _executor = (context: AlexaDialogContext, event: AlexaEvent): void => {
        let responseBuilder = ResponseFactory.init();
        responseBuilder.speak(interpolateString(this._say, context.platformState.globalState));
        context.currentResponse.response = Object.assign(
            context.currentResponse.response,
            responseBuilder.getResponse()
        );
    };
}
