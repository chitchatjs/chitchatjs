import { Directive, IntentRequest } from "ask-sdk-model";

import {
  AgentBuilder,
  CompoundBlockBuilder,
  CustomBlockBuilder,
  GotoStateBlockBuilder,
  RemoveGlobalStateBlockBuilder,
  SetGlobalStateBlockBuilder,
  StateBuilder,
  WhenBlockBuilder,
} from "@chitchatjs/core";

import { AlexaDialogManager } from "../";
import { RuleBasedDialogEngine } from "../engine";
import {
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent,
  INITIAL_STATE_NAME,
  Locale,
  Skill,
  Slot,
  SSMLSpeechBlock,
} from "../models";
import { intent_utils } from "../util/IntentUtils";
import { AskSpeechBlockBuilder } from "./builders/AskSpeechBlockBuilder";
import { DirectiveBlockBuilder } from "./builders/DirectiveBlockBuilder";
import { EmptyBlockBuilder } from "./builders/EndBlockBuilder";
import { IntentBlockBuilder } from "./builders/IntentBlockBuilder";
import { LocalizedBlockBuilder } from "./builders/LocalizedBlockBuilder";
import { SkillInfoBlockBuilder } from "./builders/SkillInfoBlockBuilder";
import { SlotTypeBlockBuilder } from "./builders/SlotTypeBlockBuilder";
import { SSMLSpeechBlockBuilder } from "./builders/SSMLSpeechBlockBuilder";
import { TellSpeechBlockBuilder } from "./builders/TellSpeechBlockBuilder";
import { WhenSlotNotFilledBlockBuilder } from "./builders/WhenSlotNotFilledBlockBuilder";
import { WhenUserSaysBlockBuilder } from "./builders/WhenUserSaysBuilder";

/**
 * A collection of core Alexa building blocks
 * that allows skill builders generate artifacts as well as
 * handle runtime requests.
 */
export namespace alexa {
  /**
   * Instantiates AlexaDialogManager with RuleBasedDialogEngine.
   *
   * Usage:
   *  ax.dialogManager(<skill>)
   *  ax.dialogManager(<skill>).exports()
   *
   * @param s Skill
   */
  export function dialogManager(s: Skill) {
    return new AlexaDialogManager(s, new RuleBasedDialogEngine());
  }

  /**
   * A building block to build an Alexa Skill.
   *
   * Usage:
   *  ax.skill().addState(..).build()
   */
  export function skill() {
    return new AgentBuilder<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>();
  }

  /**
   * The initial/root state of the skill.
   *
   * Usage:
   *  ax
   *    .start()
   *    .block(ax.say("hello!"))
   *  .build()
   */
  export function start() {
    return alexa.state(INITIAL_STATE_NAME);
  }

  /**
   * Builds a new state with a specified name.
   *
   * Usage:
   *  ax
   *    .state("WelcomeUser")
   *    .block(..)
   *  .build()
   *
   * @param name State name
   */
  export function state(name: string) {
    return new StateBuilder<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>(name);
  }

  /**
   * Localizes the associated block.
   *
   * Usage:
   *  ax
   *    .localize([Locale.en_US])
   *    .block(..)
   *  .build()
   *
   * @param locales Locale[]
   */
  export function localize(locales: Locale[]) {
    return new LocalizedBlockBuilder(locales);
  }

  export function compound() {
    return new CompoundBlockBuilder<
      AlexaBuilderContext,
      AlexaDialogContext,
      AlexaEvent
    >();
  }

  export function when(
    conditionProvider?: (context: AlexaDialogContext, event: AlexaEvent) => boolean
  ) {
    if (conditionProvider) {
      return new WhenBlockBuilder<
        AlexaBuilderContext,
        AlexaDialogContext,
        AlexaEvent
      >().true(conditionProvider);
    } else {
      return new WhenBlockBuilder<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>();
    }
  }

  export function whenLaunch() {
    return new WhenBlockBuilder<
      AlexaBuilderContext,
      AlexaDialogContext,
      AlexaEvent
    >().true((c: AlexaDialogContext, e: AlexaEvent) => {
      return e.currentRequest.request.type === "LaunchRequest";
    });
  }

  export function whenUserSays(sampleUtterances: string[]) {
    return new WhenUserSaysBlockBuilder().userSays(sampleUtterances);
  }

  export function whenIntentName(intentName: string) {
    return alexa.when().true((c: AlexaDialogContext, e: AlexaEvent) => {
      let isIntentRequest = false;
      if (e.currentRequest.request.type === "IntentRequest") {
        const req: IntentRequest = e.currentRequest.request;
        if ((isIntentRequest = req.intent.name === intentName)) {
          // update state to capture slots
          const _state = c.platformState.globalState;
          const flattenSlots = intent_utils.flattenSlotValues(req);
          c.platformState.globalState = Object.assign(_state, flattenSlots);
          return true;
        }
      }

      return false;
    });
  }

  export function setStateVar(
    f:
      | string
      | ((
          ctx: AlexaDialogContext,
          event: AlexaEvent
        ) => Promise<{ [name: string]: any }> | { [name: string]: any }),
    value?: any
  ) {
    let func: (
      ctx: AlexaDialogContext,
      event: AlexaEvent
    ) => Promise<{ [name: string]: any }> | { [name: string]: any };

    if (typeof f === "string") {
      func = () => {
        return { [f]: value };
      };
    } else {
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      func = <typeof func>f;
    }

    return new SetGlobalStateBlockBuilder<
      AlexaBuilderContext,
      AlexaDialogContext,
      AlexaEvent
    >()
      .set(func)
      .build();
  }

  export function removeStateVar(
    f:
      | string
      | string[]
      | ((ctx: AlexaDialogContext, event: AlexaEvent) => Promise<string[]> | string[])
  ) {
    let func: (
      ctx: AlexaDialogContext,
      event: AlexaEvent
    ) => Promise<string[]> | string[];

    if (typeof f === "string") {
      const varName = f;
      func = () => {
        return [varName];
      };
    } else if (Array.isArray(f)) {
      const varNames = f;
      func = () => {
        return varNames;
      };
    } else {
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      func = <typeof func>f;
    }

    return new RemoveGlobalStateBlockBuilder<
      AlexaBuilderContext,
      AlexaDialogContext,
      AlexaEvent
    >()
      .remove(func)
      .build();
  }

  export function goto(stateName: string) {
    return new GotoStateBlockBuilder<
      AlexaBuilderContext,
      AlexaDialogContext,
      AlexaEvent
    >()
      .stateName(stateName)
      .build();
  }

  export function ask(msg: string | SSMLSpeechBlock) {
    return new AskSpeechBlockBuilder().say(msg);
  }

  export function say(msg: string | SSMLSpeechBlock) {
    return new TellSpeechBlockBuilder(msg).build();
  }

  export function empty() {
    return new EmptyBlockBuilder().build();
  }

  export function end() {
    return alexa
      .when()
      .true((ctx: AlexaDialogContext, event: AlexaEvent) => {
        return event.currentRequest.request.type === "SessionEndedRequest";
      })
      .then(empty())
      .build();
  }

  export function info() {
    return new SkillInfoBlockBuilder();
  }

  /**
   * Custom block allows your to manually generate artifacts or response.
   *
   * ax.custom()
   *  .executor((..) => { return ax.say("Hello") })
   *  .builder((..) => { .. })
   * .build()
   */
  export function custom() {
    return new CustomBlockBuilder<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>();
  }

  /**
   * Adds a slot type to the interaction model
   *
   * @param typeName Slot type name
   */
  export function slotType(typeName?: string) {
    return new SlotTypeBlockBuilder(typeName);
  }

  /**
   * Adds an intent to the interaction model.
   *
   * @param name intent name
   * @param samples samples
   * @param slots slot type
   */
  export function intent(name: string, samples?: string[], slots?: Slot[]) {
    return new IntentBlockBuilder(name, samples, slots);
  }

  /**
   * Use this block when you're expecting an intent request
   * and want to check if slot value is present.
   * You can then wire the .then() to a prompt.
   * And optionally use .otherwise().
   *
   * @param slotName Slot name
   */
  export function whenMissingSlot(slotName: string) {
    return new WhenSlotNotFilledBlockBuilder(slotName);
  }

  /**
   * Builds a SSML speech.
   *
   * @param speech text to speak or SSMLSpeechBlock
   */
  export function ssml(speech: string | SSMLSpeechBlock) {
    return new SSMLSpeechBlockBuilder(speech);
  }

  /**
   * Adds the specified directive to the response.
   * @param _directive Directive
   */
  export function directive(_directive: Directive) {
    return new DirectiveBlockBuilder(_directive).build();
  }
}

/**
 * A short hand of alexa
 */
export const ax = alexa;
