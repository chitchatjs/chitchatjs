import { TellSpeechBlockBuilder } from "../../../src/blocks/builders/TellSpeechBlockBuilder";
import * as _ from "lodash";
import { expect } from "chai";
import "mocha";
import { AlexaDialogContext, AlexaEvent, ssml } from "../../../src/models";
import { launchRequest } from "../../data/launchRequest";
import { paths, resource_utils } from "../../../src/util/ResourceUtil";
import { alexa } from "../../../src/blocks/index";
import { ui } from "ask-sdk-model";
const context: AlexaDialogContext = {
  currentResponse: {
    version: "1.0",
    response: {},
  },
  platformState: {
    currentStateName: "",
    globalState: {},
  },
};
const event: AlexaEvent = {
  currentRequest: launchRequest,
};

describe("TellSpeechBlockBuilder", () => {
  it("should build plain text", async () => {
    let speech = "sample speech";
    let b = new TellSpeechBlockBuilder(speech).build();

    b.execute(context, event);
    speechEquals(context, `<speak>${speech}</speak>`);
  });

  it("should build ssml", async () => {
    let speech = "sample speech";
    let ssmlObj = alexa.ssml(speech).emotion(ssml.Emotion.excited, ssml.Intensity.high).build();
    let b = new TellSpeechBlockBuilder(ssmlObj).build();

    b.execute(context, event);
    speechEquals(
      context,
      `<speak><amazon:emotion name="excited" intensity="high">${speech}</amazon:emotion></speak>`
    );
  });
});

function speechEquals(c: AlexaDialogContext, text: string) {
  let r = c.currentResponse;

  expect(r.response.outputSpeech).to.not.be.undefined;
  let ssml = <ui.SsmlOutputSpeech>r.response.outputSpeech;

  if (ssml) {
    expect(ssml.ssml).equals(text);
  }
}
