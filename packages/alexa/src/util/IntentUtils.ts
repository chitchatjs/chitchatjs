import { IntentRequest } from "ask-sdk-model";

export namespace intent_utils {
  export let flattenSlotValues = (req: IntentRequest) => {
    const slots = req.intent.slots || {};

    const res: { [name: string]: string } = {};
    Object.keys(slots).forEach((slotName) => {
      if (slotName && slots[slotName].value) {
        res[slotName] = slots[slotName].value || "";
      }
    });

    return res;
  };
}
