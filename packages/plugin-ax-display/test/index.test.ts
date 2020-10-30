import { display } from "../src";
import "mocha";
import { expect } from "chai";
import { ax } from "@chitchatjs/alexa";

describe("display", () => {
  describe("conditionals", () => {
    it("should build whenScreenDisplay()", () => {
      let b = display.conditionals.whenScreenDisplay().then(ax.say("hello")).build();

      expect(b).not.undefined;
      expect(b.type).to.equal("WhenBlock");

      const intents = ax
        .compound()
        .add(ax.intent("AMAZON.YesIntent").build())
        .add(ax.intent("AMAZON.NoIntent").build())
        .build();
    });
  });
});
