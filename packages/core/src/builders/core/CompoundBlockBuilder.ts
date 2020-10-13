import { Block, BuilderContext, CompoundBlock, DialogContext, Event } from "../../models";

export class CompoundBlockBuilder<B extends BuilderContext, D extends DialogContext, E extends Event> {
    private _blocks: Block<B, D, E>[];

    constructor() {
        this._blocks = [];
    }

    add(block: Block<B, D, E>) {
        this._blocks.push(block);
        return this;
    }

    async build(): Promise<CompoundBlock<B, D, E>> {
        return {
            type: "CompoundBlock",
            blocks: this._blocks,
            execute: this._executor,
            build: this._builder,
        };
    }

    private _executor = async (context: D, event: E): Promise<void> => {
        this._blocks.forEach((block: Block<B, D, E>) => block.execute(context, event));
    };

    private _builder = async (context: B): Promise<void> => {
        this._blocks.forEach((block: Block<B, D, E>) => block.build(context));
    };
}
