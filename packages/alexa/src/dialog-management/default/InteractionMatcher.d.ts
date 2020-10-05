import { DialogSet, Interaction } from "@chitchatjs/core";
import { HandlerInput } from 'ask-sdk-core';
import * as cjs from "@chitchatjs/core";
export interface InteractionMatcher {
    match(handlerInput: HandlerInput, dialogSet: DialogSet): Interaction;
}
export declare class DefaultInteractionMatcher implements InteractionMatcher {
    match(handlerInput: HandlerInput, dialogSet: DialogSet): Interaction | never;
    isLaunchTrigger(arg: any): arg is cjs.LaunchTrigger;
    isUtteranceTrigger(arg: any): arg is cjs.UtteranceTrigger;
}
