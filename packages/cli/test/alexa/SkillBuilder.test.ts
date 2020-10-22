import "mocha";

import { expect } from "chai";
import * as sinon from "sinon";

import { alexa } from "@chitchatjs/alexa";

import { SkillBuilder } from "../../src/alexa/SkillBuilder";
import { BuildConfig } from "../../src/builder/ProjectBuilder";

const buildConfig: BuildConfig = {
  outDir: "/fake",
  target: "Alexa",
};

describe("SkillBuilder", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("build()", () => {
    it("should build skill", () => {
      let sb = new SkillBuilder();

      sinon.stub(sb.projectInitializer, "isInitialized").callsFake(() => {
        return true;
      });

      let skill = alexa
        .skill()
        .addState(alexa.state("foo").block(alexa.say("hello")).build())
        .build();
      let ctx = sb.build(skill, buildConfig);

      expect(ctx).not.undefined;
    });

    it("should initialize project and then build skill", () => {
      let sb = new SkillBuilder();

      sinon.stub(sb.projectInitializer, "isInitialized").callsFake(() => {
        return false;
      });
      let ini = sinon.stub(sb.projectInitializer, "initialize").callsFake(() => {});

      let skill = alexa
        .skill()
        .addState(alexa.state("foo").block(alexa.say("hello")).build())
        .build();
      let ctx = sb.build(skill, buildConfig);

      expect(ctx).not.undefined;
      expect(ini.callCount).eq(1);
    });
  });
});
