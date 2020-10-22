import "mocha";

import { expect } from "chai";
import { program } from "commander";
import * as sinon from "sinon";
import shell, { ShellString } from "shelljs";
import { DeployCommand } from "../../src/commands/deploy";
import { ProjectConfig } from "../../src/types";

let projectConfig: ProjectConfig = {
  outDir: "/fake",
  target: "Alexa",
};
describe("DeployCommand", () => {
  it("should return correct program", () => {
    let dc = new DeployCommand();
    dc.register(program);
    expect(program).not.be.undefined;
  });

  describe("action", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should deploy", () => {
      let command = {};

      let bc = new DeployCommand();
      let configStub = sinon.stub(bc.projectConfigReader, "read").callsFake(() => {
        return projectConfig;
      });

      let shellWhich = sinon.stub(shell, "which").callsFake(() => {
        return JSON.parse("{}");
      });
      let deploy = sinon.stub(bc, "_deploy").callsFake(() => {});

      bc._action(JSON.parse(JSON.stringify(command)));

      expect(shellWhich.callCount).eq(1);
      expect(deploy.callCount).eq(1);
    });
  });
});
