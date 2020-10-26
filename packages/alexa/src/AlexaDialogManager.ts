import * as Alexa from "ask-sdk-core";
import { AlexaDialogEngine, AlexaEvent, Skill } from "./models";

/**
 * An Alexa Dialog Manager
 */
export class AlexaDialogManager {
  skill: Skill;
  dialogEngine: AlexaDialogEngine;

  constructor(skill: Skill, dialogEngine: AlexaDialogEngine) {
    this.skill = skill;
    this.dialogEngine = dialogEngine;
  }

  /**
   * Returns an Alexa Handler
   */
  handler(): Alexa.LambdaHandler {
    return Alexa.SkillBuilders.custom()
      .addRequestHandlers(this._executor)
      .addErrorHandlers()
      .lambda();
  }

  /**
   * Handy exports for your skill's index.js file
   */
  exports(): { default: Skill; handler: Alexa.LambdaHandler } {
    return {
      default: this.skill,
      handler: this.handler(),
    };
  }

  /**
   * Executor to handler the requests
   */
  private _executor: Alexa.RequestHandler = {
    canHandle: async (handlerInput: Alexa.HandlerInput) => {
      return true;
    },
    handle: async (handlerInput: Alexa.HandlerInput) => {
      const event: AlexaEvent = {
        currentRequest: handlerInput.requestEnvelope,
      };
      const resEnvelope = await this.dialogEngine.execute(this.skill, event);
      handlerInput.attributesManager.setSessionAttributes(resEnvelope.sessionAttributes || {});
      return resEnvelope.response;
    },
  };
}
