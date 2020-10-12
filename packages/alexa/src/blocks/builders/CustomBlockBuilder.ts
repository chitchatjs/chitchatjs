import { TellSpeechBlock, Resources } from "@chitchatjs/core";
import { ResponseFactory } from "ask-sdk-core";
import { Response, ResponseEnvelope } from "ask-sdk-model";
import { AlexaBuilderContext, AlexaDialogContext, AlexaEvent, CustomBlock } from "../../models";
import { interpolateString } from "../../util/StringUtils";

/**
 * This block allows to customize the handling logic
 */
export class CustomBlockBuilder {
    private _resourceUpdater: (context: AlexaBuilderContext) => Resources;
    private _requestHandler: (context: AlexaDialogContext, event: AlexaEvent) => Response;

    constructor() {
        // By default, this block will not do anything
        this._resourceUpdater = (ctx: AlexaBuilderContext) => {
            return {} as Resources;
        };
        this._requestHandler = (ctx: AlexaDialogContext, event: AlexaEvent): Response => {
            return ResponseFactory.init().getResponse();
        };
    }

    builder(f: (context: AlexaBuilderContext) => Resources) {
        this._resourceUpdater = f;
        return this;
    }

    executor(f: (context: AlexaDialogContext, event: AlexaEvent) => Response) {
        this._requestHandler = f;
        return this;
    }

    build(): CustomBlock {
        return {
            type: "CustomBlock",
            execute: this._executor,
            build: this._builder,
        };
    }

    private _executor = (context: AlexaDialogContext, event: AlexaEvent): void => {
        let response = this._requestHandler(context, event);
        context.currentResponse.response = Object.assign(context.currentResponse.response, response);
    };

    private _builder = (context: AlexaBuilderContext) => {
        let resources = this._resourceUpdater(context);
        context.resources = Object.assign(context.resources, resources);
    };
}
