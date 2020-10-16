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
};

export let listEquals = (a: any[], b: any[]) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
