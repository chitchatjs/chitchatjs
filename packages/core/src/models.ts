import { RequestEnvelope, ResponseEnvelope } from "ask-sdk-model";
import { CompoundBlockBuilder } from "./builders/core/CompoundBlockBuilder";
import { GotoStateBlockBuilder } from "./builders/core/GotoStateBlockBuilder";
import { RawResourceBlockBuilder } from "./builders/core/RawResourceBlockBuilder";
import { RemoveGlobalStateBlockBuilder } from "./builders/core/RemoveGlobalStateBlockBuilder";
import { SetGlobalStateBlockBuilder } from "./builders/core/SetGlobalStateBlockBuilder";
import { ConversationBuilder } from "./builders/ConversationBuilder";
import { WhenBlockBuilder } from "./builders/core/WhenBlockBuilder";
import { StateBuilder } from "./builders/StateBuilder";
import { SkillPackage, Locale } from "./skill/Artifacts";

/************************************************************
 * Primitive interfaces                                     *
 ************************************************************/

/**
 * A Conversation is a collections of State objects by user defined state names.
 */
export interface Conversation {
    type: "Conversation";
    states: { [name: string]: State };
}

/**
 * State is a representation of the application at a specific point in time
 * and which blocks it uses to handle user requests.
 */
export interface State {
    type: "State";
    name: string;
    block: Block;
}

/**
 * Dialog context object holds key information during runtime execution.
 */
export interface DialogContext {
    currentResponse: ResponseEnvelope;
    platformState: PlatformState;
}

/**
 * Builder context object holds key information during the build process.
 */
export interface BuilderContext {
    package: SkillPackage;
}

/**
 * Platform State is a simple state holder where framework keeps state related information.
 */
export interface PlatformState {
    currentStateName: string;
    globalState: { [name: string]: any };
}

/**
 * Event is an input trigger that cause state to start executing its block.
 */
export interface Event {
    currentRequest: RequestEnvelope;
}

/**
 * Blocks - a pluggable interface that defines a specific piece of functionality to build voice interface.
 */
export interface Block {
    /**
     * Using this interface a block can define what to build.
     */
    build: (context: BuilderContext) => void;

    /**
     * Actionable interface for each block. Invoked in runtime.
     */
    execute: (context: DialogContext, event: Event) => void;
}

/**
 * CompoundBlock is simply a list of Block.
 */
export interface CompoundBlock extends Block {
    type: "CompoundBlock";
    blocks: Block[];
}

/**
 * WhenBlock is a if-then-else implementation with a hook for condition execution.
 */
export interface WhenBlock extends Block {
    type: "WhenBlock";
    condition: (context: DialogContext, event: Event) => boolean;
    then: Block;
    otherwise?: Block;
}

/**
 * WhenUserSaysBlock is a block that operates directly on the user utterances
 * in an if-then-else manner.
 */
export interface WhenUserSaysBlock extends Block {
    type: "WhenUserSaysBlock";
    sampleUtterances: string[];
    then: Block;
    otherwise?: Block;
}

/**
 * AskSpeechBlock is a block to ask users a question and to keep microphone open.
 */
export interface AskSpeechBlock extends Block {
    type: "AskSpeechBlock";
    say: string;
    reprompt: string;
}

/**
 * TellSpeechBlock is a block to tell users something and then close the microphone.
 */
export interface TellSpeechBlock extends Block {
    type: "TellSpeechBlock";
    say: string;
}

/**
 * SetGlobalState block is used to set a state variable globally.
 */
export interface SetGlobalStateBlock extends Block {
    type: "SetGlobalStateBlock";
    evaluate: (context: DialogContext, event: Event) => { [name: string]: any };
}

/**
 * RemoveGlobalStateBlock removes a state variable from the global state.
 */
export interface RemoveGlobalStateBlock extends Block {
    type: "RemoveGlobalStateBlock";
    evaluate: (context: DialogContext, event: Event) => { [name: string]: any };
}

/**
 * GotoStateBlock transitions to the specified state name.
 */
export interface GotoStateBlock extends Block {
    type: "GotoStateBlock";
    name: string;
}

/**********************************************************
 *                  Resouce Only Blocks                   *
 **********************************************************/

export interface SkillInfoBlock extends Block {
    type: "SkillInfoBlock";
    skillName: string;
    locale: Locale;
}

export interface RawResourceBlock extends Block {
    type: "RawResourceBlock";
    path: string;
    resourceContent: string;
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
 * Available prebuilt core blocks
 */
export namespace core {
    export function compound() {
        return new CompoundBlockBuilder();
    }

    export function when() {
        return new WhenBlockBuilder();
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

    export function rawResource(path: string, content: string) {
        return new RawResourceBlockBuilder(path, content);
    }
}

/**
 * Dialog Engine interface
 */
export interface DialogEngine {
    execute(conversation: Conversation, request: RequestEnvelope): ResponseEnvelope;
}

export * from "./skill/Artifacts";
