import "mocha";

import { expect } from "chai";
import { program } from "commander";

import { NewCommand } from "../../src/commands/new";
import { CliConfig } from "../../src/types";
import { DEFAULT_CLI_CONFIG } from "../../src/util/constants";
import * as _ from "lodash";
import * as sinon from "sinon";
import inquirer from "inquirer";
// const projectConfig: ProjectConfig = {
//   outDir: "/fake",
//   target: "Alexa",
// };

const cliConfig: CliConfig = _.cloneDeep(DEFAULT_CLI_CONFIG);

describe("NewCommand", () => {
  it("should return correct program", () => {
    let rc = new NewCommand(cliConfig);
    rc.register(program);
    expect(program).not.be.undefined;
  });

  describe("action", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should execute action", () => {
      let command = {
        outputDir: "/fake",
        sample: "fake-sample-bot",
      };

      let rc = new NewCommand(cliConfig);
      let inqLaunch = sinon.stub(rc, "_launchInquirer").callsFake(() => {});

      rc._action(JSON.parse(JSON.stringify(command)));
      expect(program).not.be.undefined;
      expect(inqLaunch.callCount).eq(1);
    });
  });
});
