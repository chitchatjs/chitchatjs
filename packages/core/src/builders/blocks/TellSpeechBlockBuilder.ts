import { BuilderContext, Context, Event, TellSpeechBlock } from "../../models";
import { ResponseFactory } from "ask-sdk-core";
import { interpolateString } from "../../util/StringUtils";

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

    private _executor = (context: Context, event: Event): void => {
        let responseBuilder = ResponseFactory.init();
        responseBuilder.speak(interpolateString(this._say, context.platformState.globalState));
        context.currentResponse.response = Object.assign(
            context.currentResponse.response,
            responseBuilder.getResponse()
        );
    };
}
