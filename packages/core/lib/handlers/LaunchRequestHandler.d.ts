import { HandlerInput } from "ask-sdk-core";
declare const LaunchRequestHandler: {
    canHandle(handlerInput: HandlerInput): boolean;
    handle(handlerInput: HandlerInput): import("ask-sdk-model").Response;
};
export { LaunchRequestHandler };
