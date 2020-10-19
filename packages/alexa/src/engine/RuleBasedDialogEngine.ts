import { PlatformState, State } from "@chitchatjs/core";
import { AttributesManagerFactory } from "ask-sdk-core";
import { RequestEnvelope, ResponseEnvelope } from "ask-sdk-model";
import {
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaDialogEngine,
  AlexaEvent,
  Skill,
} from "../models";
import * as _ from "lodash";
import { alexa } from "../blocks";

/**
 * Beginning state name
 */
const INITIAL_STATE_NAME: string = "INIT";
/**
 * Session Attribute key name for platform state
 */
const PLATFORM_STATE_NAME: string = "platformState";
/**
 * A beginning response object
 */
const INITIAL_EMPTY_RESPONSE: ResponseEnvelope = {
  response: {},
  version: "1.0",
};

/**
 * A rule based dialog engine that executes the conversation states based on the
 * specified conditions and transitions.
 */
export class RuleBasedDialogEngine implements AlexaDialogEngine {
  constructor() {}

  /**
   * Entry point for runtime request handling.
   *
   * @param skill Alexa Skill object
   * @param event AlexaEvent object
   * @returns ResponseEnvelope
   */
  execute(skill: Skill, event: AlexaEvent): ResponseEnvelope {
    let context: AlexaDialogContext = this._initContext(event.currentRequest);

    let currentStateName = context.platformState.currentStateName;
    let currentState = skill.states[currentStateName];
    let currentStateBlock = currentState.block;

    try {
      currentStateBlock.execute(context, event);

      // if nothing changed in the response fallback to the fallbackBlock
      if (_.isEqual(context.currentResponse, INITIAL_EMPTY_RESPONSE)) {
        this._executeFallbackBlock(currentState, context, event);
      }
    } catch (err) {
      console.log(`Error occurred: ${err.name} ${err.message}`);
      console.log(`${err.stack}`);
      this._executeCatchBlock(currentState, context, event, err);
    }

    context = this._updateContext(context);
    return context.currentResponse;
  }

  /**
   * Initializes the context
   *    - if state defined in the session attributes, bootstraps the state from there
   *    - otherwise, starts fresh
   * @param request RequestEnvelope
   */
  private _initContext(request: RequestEnvelope): AlexaDialogContext {
    let platformState =
      this._getPlatformState(request) ||
      <PlatformState>{
        currentStateName: INITIAL_STATE_NAME,
        globalState: {},
      };

    return {
      currentResponse: _.cloneDeep(INITIAL_EMPTY_RESPONSE),
      platformState: platformState,
    };
  }

  /**
   * Updates the context by storing platformState from the AlexaDialogContext to the ResponseEnvelope's sessionAttributes.
   *
   * @param context AlexaDialogContext
   */
  private _updateContext(context: AlexaDialogContext): AlexaDialogContext {
    context.currentResponse.sessionAttributes = context.currentResponse.sessionAttributes || {};
    context.currentResponse.sessionAttributes[PLATFORM_STATE_NAME] = context.platformState;

    return context;
  }

  /**
   * Returns the platformState from the session attributes.
   *
   * @param request RequestEnvelope
   */
  private _getPlatformState(request: RequestEnvelope): PlatformState {
    return AttributesManagerFactory.init({ requestEnvelope: request }).getSessionAttributes()[
      PLATFORM_STATE_NAME
    ];
  }

  /**
   * Executes the fallback block. If user didn't specify, it executes a default block.
   *
   * @param state State<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>
   * @param context AlexaDialogContext
   * @param event AlexaEvent
   */
  private _executeFallbackBlock(
    state: State<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>,
    context: AlexaDialogContext,
    event: AlexaEvent
  ) {
    if (state.fallback) {
      state.fallback.execute(context, event);
    } else {
      alexa
        .ask("Sorry I don't understand, please try again.")
        .reprompt("Please try again.")
        .build()
        .execute(context, event);
    }
  }

  /**
   * Executes the catch block. If user didn't specify, it executes a default block.
   *
   * @param state State<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>
   * @param context AlexaDialogContext
   * @param event AlexaEvent
   * @param err Error
   */
  private _executeCatchBlock(
    state: State<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>,
    context: AlexaDialogContext,
    event: AlexaEvent,
    err: Error
  ) {
    // first, reset the response to empty
    context.currentResponse = _.cloneDeep(INITIAL_EMPTY_RESPONSE);
    if (state.errorHandler) {
      state.errorHandler(context, event, err).execute(context, event);
    } else {
      alexa
        .ask("Sorry something went wrong, please try again.")
        .reprompt("Please try again.")
        .build()
        .execute(context, event);
    }
  }
}
