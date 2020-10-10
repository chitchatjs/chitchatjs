import * as Mustache from "mustache";

export let interpolateString = (msg: string, state: { [name: string]: any }) => {
    return Mustache.render(msg, state, undefined, ["{", "}"]);
};
