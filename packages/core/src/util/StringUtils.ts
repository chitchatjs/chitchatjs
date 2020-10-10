import * as Mustache from "mustache";

export let interpolateString = (msg: string, state: { [name: string]: any }) => {
    return Mustache.render(msg, state, undefined, ["{", "}"]);
};

export let extractVariables = (msg: string): string[] => {
    let regex = /\({.*?}\)/g;
    let tokens: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = regex.exec(msg))) {
        tokens.push(match[1]);
    }
    return tokens;
};

export let slotToSlotTypeMapping = (name: string) => {
    let mapping: { [name: string]: string } = {
        firstName: "AMAZON.FIRST_NAME",
        lastName: "AMAZON.LAST_NAME",
        usCity: "AMAZON.US_CITY",
        date: "AMAZON.DATE",
        number: "AMAZON.NUMBER",
    };

    return mapping[name];
};
