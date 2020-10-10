import { Block, BuilderContext, CompoundBlock, Context, Event } from "../../models";

export class CompoundBlockBuilder {
    private _blocks: Block[];

    constructor() {
        this._blocks = [];
    }

    add(block: Block) {
        this._blocks.push(block);
        return this;
    }

    build(): CompoundBlock {
        return {
            type: "CompoundBlock",
            blocks: this._blocks,
            execute: this._executor,
            build: this._builder,
        };
    }

    private _executor = (context: Context, event: Event): void => {
        this._blocks.forEach((block: Block) => block.execute(context, event));
    };

    private _builder = (context: BuilderContext): void => {
        this._blocks.forEach((block: Block) => block.build(context));
    };
}
