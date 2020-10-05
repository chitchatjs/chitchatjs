import { BaseAction } from "./BaseAction";
import { Context } from "./Context";
export interface TextSpeechAction extends BaseAction {
    TextSpeechAction: boolean;
    text: string;
}
export interface InvokeAction extends BaseAction {
    InvokeAction: boolean;
    call: (context: Context) => any;
}
export interface TypeDecl {
    name: string;
    type: string;
}
export interface IntentAction extends BaseAction {
    IntentAction: boolean;
    readonly name: string;
    types?: TypeDecl[];
    samples?: string[];
}
export declare type Action = TextSpeechAction | InvokeAction | IntentAction;
