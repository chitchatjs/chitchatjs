import { BuilderContext, DialogContext, Event, RawResourceBlock } from "../../models";

export class RawResourceBlockBuilder<B extends BuilderContext, D extends DialogContext, E extends Event> {
    private _key: string;
    private _resourceContent: string;

    constructor(key: string, resourceContent: string) {
        this._key = key;
        this._resourceContent = resourceContent;
    }

    build(): RawResourceBlock<B, D, E> {
        return {
            type: "RawResourceBlock",
            key: this._key,
            content: this._resourceContent,
            execute: (context: D, event: E) => {},
            build: this._builder,
        };
    }

    private _builder = (context: B): void => {
        if (context.resources.resourceMap !== undefined)
            context.resources.resourceMap[this._key] = this._resourceContent;
    };
}
