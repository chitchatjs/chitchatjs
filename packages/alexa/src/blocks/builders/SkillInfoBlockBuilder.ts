import { AlexaBuilderContext, AlexaDialogContext, AlexaEvent, InteractionModel, SkillInfoBlock } from "../../models";
import { Locale, LocalizedSkillInfo, SkillManifestEnvelope } from "../../models";
import { v1 } from "ask-smapi-model";
/**
 * Generates localized Skill Info in the Skill Manifest file.
 */
export class SkillInfoBlockBuilder {
    private _name: string;
    private _locale: Locale;
    private _invocationName: string;

    constructor(locale: Locale) {
        this._name = "";
        this._locale = locale;
        this._invocationName = "";
    }

    name(name: string) {
        this._name = name;
        return this;
    }

    invocationName(name: string) {
        this._invocationName = name;
        return this;
    }

    build(): SkillInfoBlock {
        return {
            type: "SkillInfoBlock",
            skillName: this._name,
            locale: this._locale,
            execute: (context: AlexaDialogContext, event: AlexaEvent) => {},
            build: this._builder,
        };
    }

    private _builder = (context: AlexaBuilderContext): void => {
        let skillManifestEnvelope: SkillManifestEnvelope = JSON.parse(context.resources.resourceMap["/skill.json"]);

        let locales = skillManifestEnvelope.manifest?.publishingInformation?.locales;
        let updatedObj: any = {};
        updatedObj[this._locale] = <LocalizedSkillInfo>{
            name: this._name,
        };

        if (skillManifestEnvelope.manifest?.publishingInformation?.locales !== undefined)
            skillManifestEnvelope.manifest.publishingInformation.locales = Object.assign(locales, updatedObj);

        context.resources.resourceMap["/skill.json"] = JSON.stringify(skillManifestEnvelope);

        let locale = this._locale;
        let im: InteractionModel = JSON.parse(
            context.resources.resourceMap[`/interactionModels/custom/${locale}.json`]
        );

        if (im.interactionModel && im.interactionModel.languageModel) {
            im.interactionModel.languageModel.invocationName = this._invocationName;
        }
        context.resources.resourceMap[`/interactionModels/custom/${locale}.json`] = JSON.stringify(im);
    };
}
