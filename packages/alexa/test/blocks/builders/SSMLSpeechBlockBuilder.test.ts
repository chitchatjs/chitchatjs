import { SSMLSpeechBlockBuilder } from "../../../src/blocks/builders/SSMLSpeechBlockBuilder";
import { context_util } from "../../../src/util/ContextUtil";
import * as _ from "lodash";
import { expect } from "chai";
import "mocha";
import { AlexaBuilderContext, Locale, Slot, ssml, SSMLSpeechBlock } from "../../../src/models";
import { paths, resource_utils } from "../../../src/util/ResourceUtil";

describe("SSMLSpeechBlockBuilder", () => {
  it("should build plain text", async () => {
    let speech = "sample speech";
    let b = new SSMLSpeechBlockBuilder(speech).build();

    speechEquals(b, speech);
  });

  it("should apply voice", async () => {
    let speech = "sample speech";
    let b = new SSMLSpeechBlockBuilder(speech).voice(ssml.Voice.Bianca).build();

    speechEquals(b, `<voice name="Biance">${speech}</voice>`);
  });

  it("should apply domain", async () => {
    let speech = "sample speech";
    let b = new SSMLSpeechBlockBuilder(speech).domain(ssml.Domain.conversational).build();

    speechEquals(b, `<amazon:domain name="conversational">${speech}</amazon:domain>`);
  });

  it("should apply effect", async () => {
    let speech = "sample speech";
    let b = new SSMLSpeechBlockBuilder(speech).effect(ssml.Effect.whispered).build();

    speechEquals(b, `<amazon:effect name="whispered">${speech}</amazon:effect>`);
  });

  it("should apply emotion", async () => {
    let speech = "sample speech";
    let b = new SSMLSpeechBlockBuilder(speech)
      .emotion(ssml.Emotion.excited, ssml.Intensity.high)
      .build();

    speechEquals(b, `<amazon:emotion name="excited" intensity="high">${speech}</amazon:emotion>`);
  });

  it("should apply emphasis", async () => {
    let speech = "sample speech";
    let b = new SSMLSpeechBlockBuilder(speech).emphasis(ssml.EmphasisLevel.moderate).build();

    speechEquals(b, `<emphasis level="${ssml.EmphasisLevel.moderate}">${speech}</emphasis>`);
  });

  it("should apply lang", async () => {
    let speech = "sample speech";
    let b = new SSMLSpeechBlockBuilder(speech).lang(Locale.fr_FR).build();

    speechEquals(b, `<lang xml:lang="${Locale.fr_FR}">${speech}</lang>`);
  });

  it("should apply paragraph", async () => {
    let speech = "sample speech";
    let b = new SSMLSpeechBlockBuilder(speech).paragraph().build();

    speechEquals(b, `<p>${speech}</p>`);
  });

  it("should apply phoneme", async () => {
    let speech = "pecan";
    let b = new SSMLSpeechBlockBuilder(speech)
      .phoneme(ssml.PhoneticAlphabet.ipa, "pɪˈkɑːn")
      .build();

    speechEquals(b, `<phoneme alphabet="ipa" ph="pɪˈkɑːn">pecan</phoneme>`);
  });

  it("should apply volume", async () => {
    let speech = "pecan";
    let b = new SSMLSpeechBlockBuilder(speech).volume(ssml.Volume.medium).build();

    speechEquals(b, `<prosody volume="medium">${speech}</prosody>`);
  });

  it("should apply pitch", async () => {
    let speech = "pecan";
    let b = new SSMLSpeechBlockBuilder(speech).pitch(ssml.Pitch.medium).build();

    speechEquals(b, `<prosody pitch="medium">${speech}</prosody>`);
  });

  it("should apply rate", async () => {
    let speech = "pecan";
    let b = new SSMLSpeechBlockBuilder(speech).rate(ssml.Rate.medium).build();

    speechEquals(b, `<prosody rate="medium">${speech}</prosody>`);
  });

  it("should apply sentence", async () => {
    let speech = "pecan";
    let b = new SSMLSpeechBlockBuilder(speech).sentence().build();

    speechEquals(b, `<s>${speech}</s>`);
  });

  it("should apply sayAs", async () => {
    let speech = "pecan";
    let b = new SSMLSpeechBlockBuilder(speech).sayAs(ssml.Interpreters.address).build();

    speechEquals(b, `<say-as interpret-as="address">${speech}</say-as>`);
  });

  it("should apply sayAs with date format", async () => {
    let speech = "pecan";
    let b = new SSMLSpeechBlockBuilder(speech)
      .sayAs(ssml.Interpreters.date, ssml.DateInterpreterFormat.mdy)
      .build();

    speechEquals(b, `<say-as interpret-as="date" format="mdy">${speech}</say-as>`);
  });

  it("should apply sub", async () => {
    let speech = "pecan";
    let b = new SSMLSpeechBlockBuilder(speech).sub("aluminum").build();

    speechEquals(b, `<sub alias="aluminum">${speech}</sub>`);
  });

  it("should apply word role", async () => {
    let speech = "pecan";
    let b = new SSMLSpeechBlockBuilder(speech).wordRole(ssml.WordRole.vbd).build();

    speechEquals(b, `<w role="amazon:VBD">${speech}</w>`);
  });

  it("should append audio", async () => {
    let speech1 = "sample speech";
    let audio = "soundbank://soundlibrary/transportation/amzn_sfx_car_accelerate_01";
    let b = new SSMLSpeechBlockBuilder(speech1).appendAudio(audio).build();

    speechEquals(b, `${speech1} <audio src="${audio}" />`);
  });

  it("should append break with strength", async () => {
    let speech1 = "sample speech";
    let b = new SSMLSpeechBlockBuilder(speech1).appendBreak(ssml.BreakStrength.medium).build();

    speechEquals(b, `${speech1} <break strength="${ssml.BreakStrength.medium}" />`);
  });

  it("should append break with time in milliseconds", async () => {
    let speech1 = "sample speech";
    let b = new SSMLSpeechBlockBuilder(speech1).appendBreak(100).build();

    speechEquals(b, `${speech1} <break time="100ms" />`);
  });

  it("should append", async () => {
    let speech1 = "sample speech";
    let speech2 = "sample speech2";
    let b = new SSMLSpeechBlockBuilder(speech1)
      .append(new SSMLSpeechBlockBuilder(speech2).build())
      .build();

    speechEquals(b, `${speech1} ${speech2}`);
  });

  it("should apply nested tags", async () => {
    let speech = "this is an example of multiple tags.";
    let b = new SSMLSpeechBlockBuilder(speech)
      .volume(ssml.Volume.loud)
      .rate(ssml.Rate.fast)
      .emotion(ssml.Emotion.excited, ssml.Intensity.low)
      .build();

    speechEquals(
      b,
      `<amazon:emotion name="excited" intensity="low"><prosody rate="fast"><prosody volume="loud">this is an example of multiple tags.</prosody></prosody></amazon:emotion>`
    );
  });
});

function speechEquals(b: SSMLSpeechBlock, text: string) {
  expect(b).to.not.be.undefined;
  if (b) {
    expect(b.speech).equals(text);
  }
}
