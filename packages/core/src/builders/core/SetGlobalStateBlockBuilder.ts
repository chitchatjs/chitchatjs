import { BuilderContext, DialogContext, Event, SetGlobalStateBlock } from "../../models";

export class SetGlobalStateBlockBuilder<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> {
  private _evaluate: (
    context: D,
    event: E
  ) => Promise<{ [name: string]: any }> | { [name: string]: any };

  constructor() {
    // default evalutation - no states set
    this._evaluate = (context: D, event: E) => {
      return {};
    };
  }

  set(f: (context: D, event: E) => Promise<{ [name: string]: any }> | { [name: string]: any }) {
    this._evaluate = f;
    return this;
  }

  build(): SetGlobalStateBlock<B, D, E> {
    return {
      type: "SetGlobalStateBlock",
      evaluate: this._evaluate,
      execute: this._executor,
      build: async (context: B) => {},
    };
  }

  private _executor = async (context: D, event: E) => {
    const vars: { [name: string]: any } = await this._evaluate(context, event);
    Object.assign(context.platformState.globalState, vars);
  };
}
