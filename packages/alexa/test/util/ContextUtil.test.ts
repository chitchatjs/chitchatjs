import { context_util } from "../../src/util/ContextUtil";
import { intentRequest as intentRequestWithNoSlots } from "../data/intentRequest";
import { intentRequestOneMissingSlot as intentRequestWithOneFilledSlotAndOneUnfilled } from "../data/intentRequestOneMissingSlot";

import * as _ from "lodash";
import { expect } from "chai";
import "mocha";
import { Intent, IntentRequest } from "ask-sdk-model";
import { AlexaBuilderContext, AlexaDialogContext, AlexaEvent, Locale } from "../../src/models";

describe("ContextUtil", () => {
  describe(".shouldRender()", () => {
    it("should return true if configured locales are undefined", async () => {
      let c: AlexaDialogContext = {
        currentResponse: JSON.parse("{}"),
        platformState: { globalState: {}, currentStateName: "" },
      };
      let e: AlexaEvent = {
        currentRequest: {
          version: "1.0",
          context: JSON.parse("{}"),
          request: {
            type: "LaunchRequest",
            requestId: "",
            timestamp: "",
            locale: "en-US",
          },
        },
      };
      let shouldRender = context_util.shouldRender(c, e);

      expect(shouldRender).to.be.true;
    });

    it("should return true if configured locales are []", async () => {
      let c: AlexaDialogContext = {
        currentResponse: JSON.parse("{}"),
        platformState: { globalState: {}, currentStateName: "" },
        currentLocales: [],
      };
      let e: AlexaEvent = {
        currentRequest: {
          version: "1.0",
          context: JSON.parse("{}"),
          request: {
            type: "LaunchRequest",
            requestId: "",
            timestamp: "",
            locale: "en-US",
          },
        },
      };
      let shouldRender = context_util.shouldRender(c, e);

      expect(shouldRender).to.be.true;
    });

    it("should return true if configured locales are [en-US] and matching input", async () => {
      let c: AlexaDialogContext = {
        currentResponse: JSON.parse("{}"),
        platformState: { globalState: {}, currentStateName: "" },
        currentLocales: [Locale.en_US],
      };
      let e: AlexaEvent = {
        currentRequest: {
          version: "1.0",
          context: JSON.parse("{}"),
          request: {
            type: "LaunchRequest",
            requestId: "",
            timestamp: "",
            locale: "en-US",
          },
        },
      };
      let shouldRender = context_util.shouldRender(c, e);

      expect(shouldRender).to.be.true;
    });

    it("should return true if configured locales are [en-US] and input is undefined", async () => {
      let c: AlexaDialogContext = {
        currentResponse: JSON.parse("{}"),
        platformState: { globalState: {}, currentStateName: "" },
        currentLocales: [Locale.en_US],
      };
      let e: AlexaEvent = {
        currentRequest: {
          version: "1.0",
          context: JSON.parse("{}"),
          request: {
            type: "LaunchRequest",
            requestId: "",
            timestamp: "",
          },
        },
      };
      let shouldRender = context_util.shouldRender(c, e);

      expect(shouldRender).to.be.true;
    });

    it("should return false if configured locales are [en-US] and not matching input", async () => {
      let c: AlexaDialogContext = {
        currentResponse: JSON.parse("{}"),
        platformState: { globalState: {}, currentStateName: "" },
        currentLocales: [Locale.en_US],
      };
      let e: AlexaEvent = {
        currentRequest: {
          version: "1.0",
          context: JSON.parse("{}"),
          request: {
            type: "LaunchRequest",
            requestId: "",
            timestamp: "",
            locale: "en-GB",
          },
        },
      };
      let shouldRender = context_util.shouldRender(c, e);

      expect(shouldRender).to.be.false;
    });
  });

  describe(".getSkillManifestString()", () => {
    it("should return skill manifest string", () => {
      let c: AlexaBuilderContext = {
        resources: {
          resourceMap: {
            "/skill.json": "dummy-manifest",
          },
        },
      };

      let m = context_util.getSkillManifestString(c);
      expect(m).equals("dummy-manifest");
    });

    it("should throw error if manifest missing", () => {
      let c: AlexaBuilderContext = {
        resources: {
          resourceMap: {},
        },
      };

      let errorMessage = "";
      try {
        let m = context_util.getSkillManifestString(c);
      } catch (err) {
        errorMessage = err.message;
      }
      expect(errorMessage).equals(
        "Skill Manifest does not exist in the AlexaBuilderContext resourceMap"
      );
    });
  });

  describe(".getSkillManifest()", () => {
    it("should return skill manifest", () => {
      let c: AlexaBuilderContext = {
        resources: {
          resourceMap: {
            "/skill.json": "{}",
          },
        },
      };

      let m = context_util.getSkillManifest(c);
      expect(JSON.stringify(m)).equals("{}");
    });
  });

  describe(".getIMString()", () => {
    it("should return interaction model string", () => {
      let c: AlexaBuilderContext = {
        resources: {
          resourceMap: {
            "/interactionModels/custom/en-US.json": "dummy-im",
          },
        },
      };

      let m = context_util.getIMString(c, Locale.en_US);
      expect(m).equals("dummy-im");
    });

    it("should throw error if interaction model is missing", () => {
      let c: AlexaBuilderContext = {
        resources: {
          resourceMap: {},
        },
      };

      let errorMessage = "";
      try {
        let m = context_util.getIMString(c, Locale.en_US);
      } catch (err) {
        errorMessage = err.message;
      }
      expect(errorMessage).equals(
        "Interaction Model does not exist in the AlexaBuilderContext resourceMap for locale en-US"
      );
    });
  });

  describe(".getIM()", () => {
    it("should return interaction model", () => {
      let c: AlexaBuilderContext = {
        resources: {
          resourceMap: {
            "/interactionModels/custom/en-US.json": "{}",
          },
        },
      };

      let m = context_util.getIM(c, Locale.en_US);
      expect(JSON.stringify(m)).equals("{}");
    });
  });
});
