interface Context {
    slots: Map<string, any>;
    stateVariables: Map<string, any>;
    currentStateId: string;
    stateHistory: string[];
}
export { Context };
