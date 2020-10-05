import { HandlerInput } from "ask-sdk-core";
export declare const IntentHandler: {
    canHandle(handlerInput: HandlerInput): boolean;
    handle(handlerInput: HandlerInput): Promise<import("ask-sdk-model").Response>;
};
