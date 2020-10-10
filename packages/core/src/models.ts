import { RequestEnvelope, ResponseEnvelope } from "ask-sdk-model";
import { AskSpeechBlockBuilder } from "./builders/blocks/AskSpeechBlockBuilder";
import { CompoundBlockBuilder } from "./builders/blocks/CompoundBlockBuilder";
import { GotoStateBlockBuilder } from "./builders/blocks/GotoStateBlockBuilder";
import { RawResourceBlockBuilder } from "./builders/blocks/RawResourceBlockBuilder";
import { RemoveGlobalStateBlockBuilder } from "./builders/blocks/RemoveGlobalStateBlockBuilder";
import { SetGlobalStateBlockBuilder } from "./builders/blocks/SetGlobalStateBlockBuilder";
import { SkillInfoBlockBuilder } from "./builders/blocks/SkillInfoBlockBuilder";
import { TellSpeechBlockBuilder } from "./builders/blocks/TellSpeechBlockBuilder";
import { WhenBlockBuilder } from "./builders/blocks/WhenBlockBuilder";
import { WhenUserSaysBlockBuilder } from "./builders/blocks/WhenUserSaysBuilder";
import { ConversationBuilder } from "./builders/ConversationBuilder";
import { StateBuilder } from "./builders/StateBuilder";
import { SkillPackage, Locale, LocalizedSkillInfo } from "./skill/Artifacts";

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

export interface Context {
    currentResponse: ResponseEnvelope;
    platformState: PlatformState;
}

export interface BuilderContext {
    package: SkillPackage;
}

export interface PlatformState {
    currentStateName: string;
    globalState: { [name: string]: any };
}

export interface Event {
    currentRequest: RequestEnvelope;
}

/**
 * BLOCKS
 */
export interface Block {
    /**
     * Using this interface a block can define what to build.
     */
    build: (context: BuilderContext) => void;

    /**
     * Actionable interface for each block. Invoked in runtime.
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

export interface WhenUserSaysBlock extends Block {
    type: "WhenUserSaysBlock";
    generatedIntentName: string;
    sampleUtterances: string[];
    then: Block;
    otherwise?: Block;
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
 * Available prebuilt blocks
 */
export namespace blocks {
    export function compound() {
        return new CompoundBlockBuilder();
    }

    export function when() {
        return new WhenBlockBuilder();
    }

    export function whenUserSays() {
        return new WhenUserSaysBlockBuilder();
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

    export function info(locale: Locale) {
        return new SkillInfoBlockBuilder(locale);
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
