import "mocha";

import { ResponseFactory } from "ask-sdk-core";
import { expect } from "chai";

import { AlexaDialogContext, AlexaEvent } from "@chitchatjs/alexa";

import { card } from "../src";

describe("card", () => {
  let c: AlexaDialogContext;
  let e: AlexaEvent;
  beforeEach(() => {
    c = {
      currentResponse: {
        version: "1.0",
        response: ResponseFactory.init().getResponse(),
      },
      platformState: {
        currentStateName: "",
        globalState: {},
      },
    };
    e = {
      currentRequest: JSON.parse("{}"),
    };
  });

  describe("simple()", () => {
    it("should build simple card", async () => {
      let b = card.simple("title", "text");

      await b.execute(c, e);
      expect(c.currentResponse.response.card).not.undefined;
      expect(c.currentResponse.response.card?.type).equals("Simple");
    });
  });

  describe("standard()", () => {
    it("should build standard card", async () => {
      let b = card.standard("title", "text", "smurl", "lgurl");

      await b.execute(c, e);
      expect(c.currentResponse.response.card).not.undefined;
      expect(c.currentResponse.response.card?.type).equals("Standard");
    });
  });

  describe("linkAccount()", () => {
    it("should build account linking card", async () => {
      let b = card.linkAccount();

      await b.execute(c, e);
      expect(c.currentResponse.response.card).not.undefined;
      expect(c.currentResponse.response.card?.type).equals("LinkAccount");
    });
  });

  describe("askPermission()", () => {
    it("should build permission card", async () => {
      let b = card.askPermissions([card.Permission.ListRead]);

      await b.execute(c, e);
      expect(c.currentResponse.response.card).not.undefined;
      expect(c.currentResponse.response.card?.type).equals("AskForPermissionsConsent");
    });
  });
});
