import { intent_utils } from "../../src/util/IntentUtils";
import { intentRequest as intentRequestWithNoSlots } from "../data/intentRequest";
import { intentRequestOneMissingSlot as intentRequestWithOneFilledSlotAndOneUnfilled } from "../data/intentRequestOneMissingSlot";

import * as _ from "lodash";
import { expect } from "chai";
import "mocha";
import { Intent, IntentRequest } from "ask-sdk-model";

describe("IntentUtils", () => {
  it("should return an empty object if intent request doesn't contain any slots", async () => {
    let res = intent_utils.flattenSlotValues(<IntentRequest>intentRequestWithNoSlots.request);
    expect(res).to.not.be.undefined;
    expect(JSON.stringify(res)).equals("{}");
  });

  it("should return a valid object if intent request does contain slots", async () => {
    let res = intent_utils.flattenSlotValues(<IntentRequest>intentRequestWithOneFilledSlotAndOneUnfilled.request);

    expect(res).to.not.be.undefined;
    expect(JSON.stringify(res)).equals(JSON.stringify({ city: "seattle" }));
  });
});
