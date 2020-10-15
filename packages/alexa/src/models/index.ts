import { BuilderContext, Agent, DialogContext, Event, DialogEngine, Block } from "@chitchatjs/core";
import { RequestEnvelope, ResponseEnvelope } from "ask-sdk-model";

import { v1 } from "ask-smapi-model";

/**
 * Type aliases
 */
export type SkillManifestEnvelope = v1.skill.Manifest.SkillManifestEnvelope;
export type InteractionModel = v1.skill.interactionModel.InteractionModelData;
export type Intent = v1.skill.interactionModel.Intent;
export type Slot = v1.skill.interactionModel.SlotDefinition;
export type SlotType = v1.skill.interactionModel.SlotType;
export type SlotTypeValue = v1.skill.interactionModel.TypeValue;
export type LocalizedSkillInfo = v1.skill.Manifest.SkillManifestLocalizedPublishingInformation;
export type AlexaBlock = Block<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>;
export type AlexaDialogEngine = DialogEngine<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>;
export type Skill = Agent<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>;

export enum Locale {
  en_AU = "en-AU",
  en_CA = "en-CA",
  en_GB = "en-GB",
  en_IN = "en-IN",
  en_US = "en-US",
  de_DE = "de-DE",
  es_ES = "es-ES",
  es_MX = "es-MX",
  es_US = "es-US",
  fr_CA = "fr-CA",
  fr_FR = "fr-FR",
  hi_IN = "hi-IN",
  it_IT = "it-IT",
  ja_JP = "ja-JP",
  pt_BR = "pt-BR",
}
export const DEFAULT_LOCALE = Locale.en_US;

export interface AlexaDialogContext extends DialogContext {
  currentResponse: ResponseEnvelope;
}

export interface AlexaBuilderContext extends BuilderContext {
  currentLocales?: Locale[];
}

export interface AlexaEvent extends Event {
  currentRequest: RequestEnvelope;
}

/**
 * Alexa specific blocks
 */
export interface SkillInfoBlock extends AlexaBlock {
  type: "SkillInfoBlock";
  skillName: string;
}

export interface EmptyBlock extends AlexaBlock {
  type: "EmptyBlock";
}

export interface CustomBlock extends AlexaBlock {
  type: "CustomBlock";
}

export interface LocalizedBlock extends AlexaBlock {
  type: "LocalizedBlock";
  locales: Locale[];
  block: AlexaBlock;
}

export interface IntentBlock extends AlexaBlock {
  type: "IntentBlock";
  name: string;
  slots: Slot[];
  samples: string[];
}

export interface SlotTypeBlock extends AlexaBlock {
  type: "SlotTypeBlock";
  slotType: SlotType;
}

export interface WhenSlotNotFilledBlock extends AlexaBlock {
  type: "WhenSlotNotFilledBlock";
  name: string;
  then: AlexaBlock;
  otherwise?: AlexaBlock;
}
