import { BaseAction } from "./BaseAction";
import { Context } from "./Context";

/** Things that Agent would do */

export interface TextSpeechAction extends BaseAction {
    TextSpeechAction: boolean
    text: string
}

export interface InvokeAction extends BaseAction {
    InvokeAction: boolean
    call: (context: Context) => any
}

/** User actions */
export interface TypeDecl {
    name: string
    type: string
}

export interface IntentAction extends BaseAction {
    IntentAction: boolean
    readonly name: string
    types?: TypeDecl[]
    samples?: string[]
}

export type Action = TextSpeechAction | InvokeAction | IntentAction

// let a: IntentAction = {
//     id: 'hello',
//     name: 'kevindra',
//     IntentAction: true
// }

// let b: InvokeAction = {
//     InvokeAction: true,
//     id: "id-2",
//     call: () => { }
// }

// let c: TextSpeechAction = {
//     TextSpeechAction: true,
//     id: "id-3",
//     text: "hello how are you"
// }

// let t:Action[] = [a, b, c]

// t[0]
