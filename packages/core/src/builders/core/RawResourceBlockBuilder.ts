import { BuilderContext, DialogContext, Event, RawResourceBlock, SkillInfoBlock, TellSpeechBlock } from "../../models";
import { ResponseFactory } from "ask-sdk-core";
import { interpolateString } from "../../util/StringUtils";
import { Locale, LocalizedSkillInfo } from "../../skill/Artifacts";

export class RawResourceBlockBuilder {
    private _path: string;
    private _resourceContent: string;

    constructor(path: string, resourceContent: string) {
        this._path = path;
        this._resourceContent = resourceContent;
    }

    build(): RawResourceBlock {
        return {
            type: "RawResourceBlock",
            path: this._path,
            resourceContent: this._resourceContent,
            execute: (context: DialogContext, event: Event) => {},
            build: this._builder,
        };
    }

    private _builder = (context: BuilderContext): void => {
        if (context.package.pathBasedResources !== undefined)
            context.package.pathBasedResources[this._path] = this._resourceContent;
    };
}
