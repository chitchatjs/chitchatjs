import { AskSpeechBlockBuilder } from "../../../src/blocks/builders/AskSpeechBlockBuilder";
import * as _ from "lodash";
import { expect } from "chai";
import "mocha";
import { AlexaDialogContext, AlexaEvent, Locale, ssml } from "../../../src/models";
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

describe("AskSpeechBlockBuilder", () => {
  it("should build plain text", async () => {
    let speech = "sample speech";
    let b = new AskSpeechBlockBuilder().say(speech).reprompt(speech).build();

    let c = _.cloneDeep(context);
    let e = _.cloneDeep(event);
    b.execute(c, e);
    speechEquals(c, `<speak>${speech}</speak>`, `<speak>${speech}</speak>`);
  });

  it("should build ssml", async () => {
    let speech = "sample speech";
    let ssmlObj = alexa.ssml(speech).emotion(ssml.Emotion.excited, ssml.Intensity.high).build();
    let b = new AskSpeechBlockBuilder().say(ssmlObj).reprompt(ssmlObj).build();
    let c = _.cloneDeep(context);
    let e = _.cloneDeep(event);
    b.execute(c, e);
    speechEquals(
      c,
      `<speak><amazon:emotion name="excited" intensity="high">${speech}</amazon:emotion></speak>`,
      `<speak><amazon:emotion name="excited" intensity="high">${speech}</amazon:emotion></speak>`
    );
  });

  it("should not build speech if context_util.shouldRender() returns false", async () => {
    let speech = "sample speech";
    let b = new AskSpeechBlockBuilder().say(speech).reprompt(speech).build();

    let c = _.cloneDeep(context);
    let e = _.cloneDeep(event);
    c.currentLocales = [Locale.en_GB];

    b.execute(c, e);

    expect(c.currentResponse.response.outputSpeech).to.be.undefined;
    expect(c.currentResponse.response.reprompt).to.be.undefined;
  });
});

function speechEquals(c: AlexaDialogContext, text: string, reprompt: string) {
  let res = c.currentResponse;

  expect(res.response.outputSpeech).to.not.be.undefined;
  let ssml = <ui.SsmlOutputSpeech>res.response.outputSpeech;

  if (ssml) {
    expect(ssml.ssml).equals(text);
  }

  expect(res.response.reprompt).to.not.be.undefined;

  if (res.response.reprompt) {
    let rpmt = <ui.SsmlOutputSpeech>res.response.reprompt.outputSpeech;
    expect(rpmt).to.not.be.undefined;
    if (rpmt) {
      expect(rpmt.ssml).equals(text);
    }
  }
}
