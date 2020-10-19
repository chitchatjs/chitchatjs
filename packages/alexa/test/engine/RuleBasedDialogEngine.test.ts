import { RuleBasedDialogEngine } from "../../src/engine/RuleBasedDialogEngine";
import { expect } from "chai";
import "mocha";
import { launchRequest } from "../data/launchRequest";
import { alexa as ax } from "../../src";
import { AlexaDialogContext, AlexaEvent, Skill } from "../../src/models/index";
import { ResponseEnvelope, ui } from "ask-sdk-model";
import { intentRequestWithPlatformState } from "../data/intentRequestWithPlatformState";

describe("RuleBasedDialogEngine", () => {
  describe(".execute()", () => {
    it("should execute the user defined block", () => {
      let engine = new RuleBasedDialogEngine();
      let skill: Skill = ax
        .skill()
        .addState(ax.start().block(ax.say("Welcome")).build())
        .build();
      let e: AlexaEvent = {
        currentRequest: launchRequest,
      };

      let res = engine.execute(skill, e);
      outputMessageEquals(res, "Welcome");
    });

    describe("on fallback", () => {
      it("should execute the fallback user defined block", () => {
        let engine = new RuleBasedDialogEngine();
        let fallbackMessage = "This is user defined fallback message.";
        let state = ax.start().block(ax.empty()).fallback(ax.say(fallbackMessage)).build();
        let skill: Skill = ax.skill().addState(state).build();
        let e: AlexaEvent = {
          currentRequest: launchRequest,
        };

        let res = engine.execute(skill, e);
        outputMessageEquals(res, fallbackMessage);
      });

      it("should execute the default fallback block", () => {
        let engine = new RuleBasedDialogEngine();
        let fallbackMessage = "Sorry I don't understand, please try again.";
        let state = ax.start().block(ax.empty()).build();
        let skill: Skill = ax.skill().addState(state).build();
        let e: AlexaEvent = {
          currentRequest: launchRequest,
        };

        let res = engine.execute(skill, e);
        outputMessageEquals(res, fallbackMessage);
      });
    });

    describe("on error", () => {
      it("should execute the user defined catch block", () => {
        let engine = new RuleBasedDialogEngine();
        let errorMessage = "Error occurred";
        let state = ax
          .start()
          .block(
            ax
              .custom()
              .executor((c: AlexaDialogContext, e: AlexaEvent) => {
                throw new Error("deliberate error");
              })
              .build()
          )
          .catch((c: AlexaDialogContext, e: AlexaEvent, err: Error) => {
            return ax.say(errorMessage);
          })
          .build();
        let skill: Skill = ax.skill().addState(state).build();
        let e: AlexaEvent = {
          currentRequest: launchRequest,
        };

        let res = engine.execute(skill, e);
        outputMessageEquals(res, errorMessage);
      });

      it("should execute the default catch block", () => {
        let engine = new RuleBasedDialogEngine();
        let errorMessage = "Sorry something went wrong, please try again.";
        let state = ax
          .start()
          .block(
            ax
              .custom()
              .executor((c: AlexaDialogContext, e: AlexaEvent) => {
                throw new Error("deliberate error");
              })
              .build()
          )
          .build();
        let skill: Skill = ax.skill().addState(state).build();
        let e: AlexaEvent = {
          currentRequest: launchRequest,
        };

        let res = engine.execute(skill, e);
        outputMessageEquals(res, errorMessage);
      });
    });

    describe("platform state", () => {
      let engine = new RuleBasedDialogEngine();
      let expectedMsg = "This is state 2";
      let state1 = ax.start().block(ax.say("Welcome")).build();
      let state2 = ax.state("State2").block(ax.say(expectedMsg)).build();
      let skill: Skill = ax.skill().addState(state1).addState(state2).build();

      let e: AlexaEvent = {
        currentRequest: intentRequestWithPlatformState,
      };

      let res = engine.execute(skill, e);
      outputMessageEquals(res, expectedMsg);
    });
  });
});

function outputMessageEquals(res: ResponseEnvelope, msg: string) {
  expect(res).not.to.be.undefined;
  expect(res.response.outputSpeech).not.to.be.undefined;
  if (res.response.outputSpeech) {
    let o = <ui.SsmlOutputSpeech>res.response.outputSpeech;
    expect(o.ssml).equals(`<speak>${msg}</speak>`);
  }
}
