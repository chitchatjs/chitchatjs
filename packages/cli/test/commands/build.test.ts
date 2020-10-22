import "mocha";

import { expect } from "chai";
import { program } from "commander";
import * as sinon from "sinon";

import { BuildCommand } from "../../src/commands/build";

describe("Build", () => {
  it("should return correct program", () => {
    let bc = new BuildCommand();
    bc.register(program);
    expect(program).not.be.undefined;
  });

  describe("action", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should execute action", () => {
      let command = {};

      let bc = new BuildCommand();
      let configRead = sinon.stub(bc.projectConfigReader, "read").callsFake(() => {
        return JSON.parse("{}");
      });
      let buildProject = sinon.stub(bc.projectBuilder, "build").callsFake(() => {
        return JSON.parse("{}");
      });

      bc._action(JSON.parse(JSON.stringify(command)));

      expect(configRead.callCount).eq(1);
      expect(buildProject.callCount).eq(1);
    });
  });
});
