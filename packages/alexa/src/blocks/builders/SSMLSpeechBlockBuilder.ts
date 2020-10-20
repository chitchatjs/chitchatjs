import { TellSpeechBlock } from "@chitchatjs/core";
import { ResponseFactory } from "ask-sdk-core";
import { number } from "yup";
import {
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent,
  SSMLSpeechBlock,
  ssml,
  Locale,
} from "../../models";
import { interpolateString } from "../../util/StringUtils";

/**
 * SSML Speech Builder
 */
export class SSMLSpeechBlockBuilder {
  private _speech: string;

  constructor(speech: string | SSMLSpeechBlock) {
    if (typeof speech === "string") {
      this._speech = speech;
    } else {
      this._speech = speech.speech;
    }
  }

  voice(voice: ssml.Voice) {
    this._speech = `<voice name="${voice}">${this._speech}</voice>`;
    return this;
  }

  domain(domain: ssml.Domain) {
    this._speech = `<amazon:domain name="${domain}">${this._speech}</amazon:domain>`;
    return this;
  }

  effect(effect: ssml.Effect) {
    this._speech = `<amazon:effect name="${effect}">${this._speech}</amazon:effect>`;
    return this;
  }

  emotion(name: ssml.Emotion, intensity: ssml.Intensity) {
    this._speech = `<amazon:emotion name="${name}" intensity="${intensity}">${this._speech}</amazon:emotion>`;
    return this;
  }

  emphasis(level: ssml.EmphasisLevel) {
    this._speech = `<emphasis level="${level}">${this._speech}</emphasis>`;
    return this;
  }

  lang(locale: Locale) {
    this._speech = `<lang xml:lang="${locale}">${this._speech}</lang>`;
    return this;
  }

  paragraph() {
    this._speech = `<p>${this._speech}</p>`;
    return this;
  }

  phoneme(phoneticAlphabet: ssml.PhoneticAlphabet, pronunciation: string) {
    this._speech = `<phoneme alphabet="${phoneticAlphabet}" ph="${pronunciation}">${this._speech}</phoneme>`;
    return this;
  }

  /**
   * https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html#prosody
   *
   * @param vol ssml.Volume
   */
  volume(vol: ssml.Volume) {
    this._speech = `<prosody volume="${vol}">${this._speech}</prosody>`;
    return this;
  }

  pitch(pitch: ssml.Pitch) {
    this._speech = `<prosody pitch="${pitch}">${this._speech}</prosody>`;
    return this;
  }

  rate(rate: ssml.Rate) {
    this._speech = `<prosody rate="${rate}">${this._speech}</prosody>`;
    return this;
  }

  sentence() {
    this._speech = `<s>${this._speech}</s>`;
    return this;
  }

  sayAs(interpreter: ssml.Interpreters, dateFormat?: ssml.DateInterpreterFormat) {
    if (!dateFormat) {
      this._speech = `<say-as interpret-as="${interpreter}">${this._speech}</say-as>`;
    } else {
      this._speech = `<say-as interpret-as="${interpreter}" format="${dateFormat}">${this._speech}</say-as>`;
    }
    return this;
  }

  sub(alias: string) {
    this._speech = `<sub alias="${alias}">${this._speech}</sub>`;
    return this;
  }

  wordRole(wordRole: ssml.WordRole) {
    this._speech = `<w role="${wordRole}">${this._speech}</w>`;
    return this;
  }

  appendAudio(src: string) {
    this._speech = this._speech + ` <audio src="${src}" />`;
    return this;
  }

  /**
   *
   * @param prop can be
   *  - time in milliseconds
   *  - ssml.BreakStrength
   */
  appendBreak(prop?: ssml.BreakStrength | number) {
    if (typeof prop === "number") {
      this._speech = this._speech + ` <break time="${prop}ms" />`;
    } else {
      this._speech = this._speech + ` <break strength="${prop}" />`;
    }
    return this;
  }

  append(ssml: SSMLSpeechBlock) {
    this._speech += " " + ssml.speech;
    return this;
  }

  build(): SSMLSpeechBlock {
    return {
      type: "SSMLSpeechBlock",
      speech: this._speech,
      execute: (context: AlexaDialogContext, event: AlexaEvent) => {},
      build: (context: AlexaBuilderContext) => {},
    };
  }
}
