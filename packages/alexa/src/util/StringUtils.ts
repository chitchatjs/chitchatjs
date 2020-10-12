import * as Mustache from "mustache";

export let interpolateString = (msg: string, state: { [name: string]: any }) => {
    return Mustache.render(msg, state, undefined, ["{", "}"]);
};

export let extractVariables = (msg: string): string[] => {
    let regex = /{([a-zA-Z_][a-zA-Z0-9]+[|[a-zA-Z_]+[a-zA-Z0-9_.]*]*)?}/g;

    let tokens: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = regex.exec(msg))) {
        tokens.push(match[1]);
    }
    return tokens;
};

export let getSlotTypeFromSlotName = (varName: string) => {
    console.log(varName);
    if (!varName) {
        throw new Error('You seem to have defined a "{}" without a variable name.');
    }

    if (varName.includes("|")) {
        let tokens = varName.split("|");
        if (tokens.length > 2) {
            throw new Error("Looks like you are using | more than once within single {} expression.");
        }
        let slotName = tokens[0];
        let slotType = tokens[1];
        return { name: slotName, type: slotType };
    }
    return undefined;

    // let mapping: { [name: string]: string } = {
    //     firstName: "AMAZON.FIRST_NAME",
    //     lastName: "AMAZON.LAST_NAME",
    //     usCity: "AMAZON.US_CITY",
    //     date: "AMAZON.DATE",
    //     number: "AMAZON.NUMBER",
    // };

    // return mapping[varName];
};
