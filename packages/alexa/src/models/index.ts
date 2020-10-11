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
import { Locale, SkillPackage } from "./artifacts";

export interface AlexaDialogContext extends DialogContext {
    currentResponse: ResponseEnvelope;
}

export interface AlexaBuilderContext extends BuilderContext {
    package: SkillPackage;
}

export interface AlexaEvent extends Event {
    currentRequest: RequestEnvelope;
}

export interface SkillInfoBlock extends AlexaBlock {
    type: "SkillInfoBlock";
    skillName: string;
    locale: Locale;
}

export type AlexaBlock = Block<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>;
export type SkillDefinition = AgentDefinition<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>;
export type AlexaDialogEngine = DialogEngine<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>;
