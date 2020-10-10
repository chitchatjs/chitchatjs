import { BuilderContext, Context, Event, SkillInfoBlock, TellSpeechBlock } from "../../models";
import { ResponseFactory } from "ask-sdk-core";
import { interpolateString } from "../../util/StringUtils";
import { Locale, LocalizedSkillInfo } from "../../skill/Artifacts";

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
            execute: (context: Context, event: Event) => {},
            build: this._builder,
        };
    }

    private _builder = (context: BuilderContext): void => {
        let locales = context.package.manifest.manifest?.publishingInformation?.locales;
        let updatedObj: any = {};
        updatedObj[this._locale] = <LocalizedSkillInfo>{
            name: this._name,
        };

        if (context?.package?.manifest?.manifest?.publishingInformation?.locales !== undefined)
            context.package.manifest.manifest.publishingInformation.locales = Object.assign(locales, updatedObj);
    };
}
