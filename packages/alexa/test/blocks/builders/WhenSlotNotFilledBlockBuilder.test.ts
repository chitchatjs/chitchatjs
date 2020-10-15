import { WhenSlotNotFilledBlockBuilder } from "../../../src/blocks/builders/WhenSlotNotFilledBlockBuilder";
import { alexa as ax } from "../../../src/blocks/index";
import { ui } from "ask-sdk-model";
import * as _ from "lodash";
import { expect } from "chai";
import "mocha";
import { AlexaDialogContext, AlexaEvent } from "../../../src/models";
import { intentRequestOneMissingSlot as weatherIntentRequestOneMissingSlot } from "../../data/intentRequestOneMissingSlot";
import { launchRequest } from "../../data/launchRequest";
import { intentRequest as helloIntentRequest } from "../../data/intentRequest";

describe("WhenSlotNotFilledBlockBuilder", () => {
  it("should throw validation error if name is empty", async () => {
    let err: Error = new Error();
    try {
      new WhenSlotNotFilledBlockBuilder("").build();
    } catch (e) {
      err = e;
    }
    expect(err.message).to.be.equal("WhenSlotNotFilledBlock must be supplied a slot name.");
  });

  it("should throw validation error if thenBlock is not supplied", async () => {
    let err: Error = new Error();
    try {
      new WhenSlotNotFilledBlockBuilder("city").build();
    } catch (e) {
      err = e;
    }
    expect(err.message).to.be.equal("then() block is missing in the whenSlotNotFilled().");
  });

  it("should invoke thenBlock if slot is missing in the intent request", async () => {
    let event: AlexaEvent = { currentRequest: weatherIntentRequestOneMissingSlot };
    let dialogContext: AlexaDialogContext = {
      platformState: { globalState: {}, currentStateName: "" },
      currentResponse: {
        version: "1.0",
        response: JSON.parse("{}"),
      },
    };

    let promptMsg = "Hello world";
    let b = new WhenSlotNotFilledBlockBuilder("date").then(ax.say(promptMsg)).build();
    b.execute(dialogContext, event);

    expect(dialogContext.currentResponse.response.outputSpeech).to.not.be.undefined;
    let s = <ui.SsmlOutputSpeech>dialogContext.currentResponse.response.outputSpeech;
    expect(s.ssml).equals(`<speak>${promptMsg}</speak>`);
  });

  it("should not invoke thenBlock if slot is present in the intent request", async () => {
    let event: AlexaEvent = { currentRequest: weatherIntentRequestOneMissingSlot };
    let dialogContext: AlexaDialogContext = {
      platformState: { globalState: {}, currentStateName: "" },
      currentResponse: {
        version: "1.0",
        response: JSON.parse("{}"),
      },
    };

    let promptMsg = "Hello world";
    let b = new WhenSlotNotFilledBlockBuilder("city").then(ax.say(promptMsg)).build();
    b.execute(dialogContext, event);

    expect(dialogContext.currentResponse.response.outputSpeech).to.be.undefined;
  });

  it("should invoke thenBlock if slot is present in the intent request", async () => {
    let event: AlexaEvent = { currentRequest: weatherIntentRequestOneMissingSlot };
    let dialogContext: AlexaDialogContext = {
      platformState: { globalState: {}, currentStateName: "" },
      currentResponse: {
        version: "1.0",
        response: JSON.parse("{}"),
      },
    };

    let promptMsg = "Hello world";
    let b = new WhenSlotNotFilledBlockBuilder("city").then(ax.say("bla bla")).otherwise(ax.say(promptMsg)).build();
    b.execute(dialogContext, event);

    expect(dialogContext.currentResponse.response.outputSpeech).to.not.be.undefined;
    let s = <ui.SsmlOutputSpeech>dialogContext.currentResponse.response.outputSpeech;
    expect(s.ssml).equals(`<speak>${promptMsg}</speak>`);

    b.build(JSON.parse("{}")); // to keep coverage happy
  });

  it("should not break if request is non-intent request", async () => {
    let event: AlexaEvent = { currentRequest: launchRequest };
    let dialogContext: AlexaDialogContext = {
      platformState: { globalState: {}, currentStateName: "" },
      currentResponse: {
        version: "1.0",
        response: JSON.parse("{}"),
      },
    };

    let promptMsg = "Hello world";
    let b = new WhenSlotNotFilledBlockBuilder("date").then(ax.say(promptMsg)).build();
    b.execute(dialogContext, event);

    expect(dialogContext.currentResponse.response.outputSpeech).to.be.undefined;
  });
});
