import { Block, BuilderContext, DialogContext, DoBlock, Event } from "../../models";

export class DoBlockBuilder<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> {
  private _doBuild?: (context: B) => Promise<Block<B, D, E>> | Block<B, D, E>;
  private _doExecute?: (context: D, event: E) => Promise<Block<B, D, E>> | Block<B, D, E>;

  executor(func: (c: D, e: E) => Promise<Block<B, D, E>> | Block<B, D, E>) {
    this._doExecute = func;
    return this;
  }

  builder(func: (c: B) => Promise<Block<B, D, E>> | Block<B, D, E>) {
    this._doBuild = func;
    return this;
  }

  build(): DoBlock<B, D, E> {
    return {
      type: "DoBlock",
      doBuild: this._doBuild,
      doExecute: this._doExecute,
      execute: this._executor,
      build: this._builder,
    };
  }

  private _executor = async (context: D, event: E) => {
    if (this._doExecute) {
      let b = await this._doExecute(context, event);
      await b.execute(context, event);
    }
  };

  private _builder = async (context: B) => {
    if (this._doBuild) {
      let b = await this._doBuild(context);
      await b.build(context);
    }
  };
}
