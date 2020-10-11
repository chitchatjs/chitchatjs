import { ResponseFactory } from "ask-sdk-core";
import { AskSpeechBlock, WhenBlock } from "@chitchatjs/core";
import { interpolateString } from "../../util/StringUtils";
import { EmptyBlock, AlexaBuilderContext, AlexaDialogContext, AlexaEvent, AlexaBlock } from "../../models";
import { alexa as ax } from "..";

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
