import { ResponseEnvelope } from "ask-sdk-model";

/************************************************************
 * Primitive interfaces                                     *
 ************************************************************/

/**
 * A Agent is a collections of State objects and how they interact with each other.
 * It also defines how a dialog manager will generate resource artifacts during build process.
 */
export interface Agent<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> {
  type: "Agent";
  states: { [name: string]: State<B, D, E> };
}

/**
 * State is a representation of the application at a specific point in time
 * and which blocks it uses to handle user requests.
 */
export interface State<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> {
  type: "State";
  name: string;
  block: Block<B, D, E>;
  fallback?: Block<B, D, E>;
  errorHandler?: (
    dialogContext: D,
    event: E,
    err: Error
  ) => Promise<Block<B, D, E>> | Block<B, D, E>;
}

/**
 * Dialog context object holds key information during runtime execution.
 */
export interface DialogContext {
  platformState: PlatformState;
}

/**
 * Builder context object holds key information during the build process.
 */
export interface BuilderContext {
  resources: Resources;
}

export interface Resources {
  resourceMap: { [name: string]: string };
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
export interface Event {}

/**
 * Blocks - a pluggable interface that defines a specific piece of functionality to build voice interface.
 */
export interface Block<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> {
  /**
   * Using this interface a block can define what to build.
   */
  build: (context: B) => Promise<void> | void;

  /**
   * Actionable interface for each block. Invoked in runtime.
   */
  execute: (context: D, event: E) => Promise<void> | void;
}

/**
 * CompoundBlock is simply a list of Block.
 */
export interface CompoundBlock<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> extends Block<B, D, E> {
  type: "CompoundBlock";
  blocks: Block<B, D, E>[];
}

/**
 * WhenBlock is a if-then-else implementation with a hook for condition execution.
 */
export interface WhenBlock<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> extends Block<B, D, E> {
  type: "WhenBlock";
  condition: (context: D, event: E) => Promise<boolean> | boolean;
  then: Block<B, D, E>;
  otherwise?: Block<B, D, E>;
}

/**
 * WhenUserSaysBlock is a block that operates directly on the user utterances
 * in an if-then-else manner.
 */
export interface WhenUserSaysBlock<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> extends Block<B, D, E> {
  type: "WhenUserSaysBlock";
  sampleUtterances: string[];
  then: Block<B, D, E>;
  otherwise?: Block<B, D, E>;
}

/**
 * AskSpeechBlock is a block to ask users a question and to keep microphone open.
 */
export interface AskSpeechBlock<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> extends Block<B, D, E> {
  type: "AskSpeechBlock";
  say: string;
  reprompt: string;
}

/**
 * TellSpeechBlock is a block to tell users something and then close the microphone.
 */
export interface TellSpeechBlock<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> extends Block<B, D, E> {
  type: "TellSpeechBlock";
  say: string;
}

/**
 * SetGlobalState block is used to set a state variable globally.
 */
export interface SetGlobalStateBlock<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> extends Block<B, D, E> {
  type: "SetGlobalStateBlock";
  evaluate: (
    context: D,
    event: E
  ) => Promise<{ [name: string]: any }> | { [name: string]: any };
}

/**
 * RemoveGlobalStateBlock removes a state variable from the global state.
 */
export interface RemoveGlobalStateBlock<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> extends Block<B, D, E> {
  type: "RemoveGlobalStateBlock";
  evaluate: (
    context: D,
    event: E
  ) => Promise<{ [name: string]: any }> | { [name: string]: any };
}

/**
 * GotoStateBlock transitions to the specified state name.
 */
export interface GotoStateBlock<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> extends Block<B, D, E> {
  type: "GotoStateBlock";
  name: string;
}

/**
 * A block that allows users to plugin a block dynamically.
 */
export interface CustomBlock<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> extends Block<B, D, E> {
  type: "CustomBlock";
  doBuild?: (
    context: B
  ) => Promise<Block<B, D, E>> | Block<B, D, E> | Promise<void> | void;
  doExecute?: (
    context: D,
    event: E
  ) => Promise<Block<B, D, E>> | Block<B, D, E> | Promise<void> | void;
}

/**
 * Dialog Engine interface
 */
export interface DialogEngine<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> {
  execute(agent: Agent<B, D, E>, event: E): Promise<ResponseEnvelope> | ResponseEnvelope;
}
