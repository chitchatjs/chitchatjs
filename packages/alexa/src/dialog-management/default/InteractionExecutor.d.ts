import { Interaction } from "@chitchatjs/core";
import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import * as cjs from "@chitchatjs/core";
export interface InteractionExecutor {
    execute(handlerInput: HandlerInput, interaction: Interaction): Response | Promise<Response> | never;
}
export declare class DefaultInteractionExecutor implements InteractionExecutor {
    execute(handlerInput: HandlerInput, interaction: Interaction): Response;
    isTellSpeechAction(arg: any): arg is cjs.TellSpeechAction;
    isAskSpeechAction(arg: any): arg is cjs.AskSpeechAction;
}
