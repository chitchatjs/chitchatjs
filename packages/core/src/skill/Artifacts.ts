import { v1 } from "ask-smapi-model";

/**
 * Type aliases
 */
export type SkillManifestEnvelope = v1.skill.Manifest.SkillManifestEnvelope;
export type InteractionModel = v1.skill.interactionModel.InteractionModelData;
export type LocalizedSkillInfo = v1.skill.Manifest.SkillManifestLocalizedPublishingInformation;

// TODO - add all the locales
export enum Locale {
    en_AU = "en-AU",
    en_CA = "en-CA",
    en_US = "en-US",
}

export interface Artifacts {}

export interface SkillPackage extends Artifacts {
    manifest: SkillManifestEnvelope;
    interactionModels: { [name: string]: InteractionModel };
    pathBasedResources?: { [name: string]: string };
}
