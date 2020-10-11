import { AlexaBuilderContext, AlexaDialogContext, AlexaEvent, SkillInfoBlock } from "../../models";
import { Locale, LocalizedSkillInfo, SkillManifestEnvelope } from "../../models";

/**
 * Generates localized Skill Info in the Skill Manifest file.
 */
export class SkillInfoBlockBuilder {
    private _name: string;
    private _locale: Locale;

    constructor(locale: Locale) {
        this._name = "";
        this._locale = locale;
    }

    name(name: string) {
        this._name = name;
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
    };
}
