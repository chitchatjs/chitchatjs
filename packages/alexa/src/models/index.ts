import {
    BuilderContext,
    AgentDefinition,
    DialogContext,
    Event,
    DialogEngine,
    AskSpeechBlock,
    Block,
} from "@chitchatjs/core";
import { RequestEnvelope, ResponseEnvelope } from "ask-sdk-model";

import { v1 } from "ask-smapi-model";

/**
 * Type aliases
 */
export type SkillManifestEnvelope = v1.skill.Manifest.SkillManifestEnvelope;
export type InteractionModel = v1.skill.interactionModel.InteractionModelData;
export type LocalizedSkillInfo = v1.skill.Manifest.SkillManifestLocalizedPublishingInformation;
export type AlexaBlock = Block<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>;
export type SkillDefinition = AgentDefinition<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>;
export type AlexaDialogEngine = DialogEngine<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>;

// TODO - add all the locales
export enum Locale {
    en_AU = "en-AU",
    en_CA = "en-CA",
    en_US = "en-US",
}

export interface AlexaDialogContext extends DialogContext {
    currentResponse: ResponseEnvelope;
}

export interface AlexaBuilderContext extends BuilderContext {}

export interface AlexaEvent extends Event {
    currentRequest: RequestEnvelope;
}

/**
 * Alexa specific blocks
 */
export interface SkillInfoBlock extends AlexaBlock {
    type: "SkillInfoBlock";
    skillName: string;
    locale: Locale;
}

export interface EmptyBlock extends AlexaBlock {
    type: "EmptyBlock";
}
