import { RequestEnvelope, ResponseEnvelope } from "ask-sdk-model";
import { AskSpeechBlockBuilder } from "./builders/blocks/AskSpeechActionBuilder";
import { CompoundBlockBuilder } from "./builders/blocks/CompoundBlockBuilder";
import { GotoStateBlockBuilder } from "./builders/blocks/GotoStateActionBuilder";
import { RemoveGlobalStateBlockBuilder } from "./builders/blocks/RemoveGlobalStateActionBuilder";
import { SetGlobalStateBlockBuilder } from "./builders/blocks/SetGlobalStateActionBuilder";
import { TellSpeechBlockBuilder } from "./builders/blocks/TellSpeechActionBuilder";
import { WhenBlockBuilder } from "./builders/blocks/WhenBlockBuilder";
import { ConversationBuilder } from "./builders/ConversationBuilder";
import { StateBuilder } from "./builders/StateBuilder";

/**
 * Primitive interfaces
 */
export interface Conversation {
    type: "Conversation";
    states: { [name: string]: State };
}

export interface State {
    type: "State";
    name: string;
    block: Block;
}

/**
 * BLOCKS
 */
export interface Block {
    /**
     * Actionable interface for each block
     */
    execute: (context: Context, event: Event) => void;
}

export interface ContainerBlock extends Block {
    type: "ContainerBlock";
}
export interface CompoundBlock extends Block {
    type: "CompoundBlock";
    blocks: Block[];
}
export interface WhenBlock extends Block {
    type: "WhenBlock";
    condition: (context: Context, event: Event) => boolean;
    then: Block;
    otherwise?: Block;
}

export interface AskSpeechBlock extends Block {
    type: "AskSpeechBlock";
    say: string;
    reprompt: string;
}
export interface TellSpeechBlock extends Block {
    type: "TellSpeechBlock";
    say: string;
}
export interface SetGlobalStateBlock extends Block {
    type: "SetGlobalStateBlock";
    evaluate: (context: Context, event: Event) => { [name: string]: any };
}
export interface RemoveGlobalStateBlock extends Block {
    type: "RemoveGlobalStateBlock";
    evaluate: (context: Context, event: Event) => { [name: string]: any };
}
export interface GotoStateBlock extends Block {
    type: "GotoStateBlock";
    name: string;
}

export interface Context {
    currentResponse: ResponseEnvelope;
    platformState: PlatformState;
}

export interface PlatformState {
    currentStateName: string;
    globalState: { [name: string]: any };
}

export interface Event {
    currentRequest: RequestEnvelope;
}

export interface DialogEngine {
    execute(conversation: Conversation, request: RequestEnvelope): ResponseEnvelope;
}

/**********************************************************
 *                   Builder Methods                      *
 **********************************************************/

/**
 * Builds a conversation.
 */
export function conv() {
    return new ConversationBuilder();
}

/**
 * Builds a state.
 *
 * @param name State
 */
export function state(name: string) {
    return new StateBuilder(name);
}

/**
 * Available prebuilt blocks
 */
export namespace blocks {
    export function compound() {
        return new CompoundBlockBuilder();
    }

    export function when() {
        return new WhenBlockBuilder();
    }

    export function ask() {
        return new AskSpeechBlockBuilder();
    }

    export function say(msg: string) {
        return new TellSpeechBlockBuilder(msg);
    }

    export function setStateVar() {
        return new SetGlobalStateBlockBuilder();
    }

    export function removeStateVar() {
        return new RemoveGlobalStateBlockBuilder();
    }

    export function goto() {
        return new GotoStateBlockBuilder();
    }
}
