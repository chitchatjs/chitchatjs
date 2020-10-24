// import { CJS_CMD } from "../util/util";
import { execSync } from "child_process";
import commander from "commander";
import * as shell from "shelljs";

import { ProjectConfigReader } from "../components/ProjectConfigReader";
import { logger } from "../components/Logger";
import { CJS_CMD } from "../util/constants";
import { BaseCommand } from "./base";

/**
 * Command to deploy project.
 * $ cjs deploy
 */
export class DeployCommand implements BaseCommand {
  buildConfigReader: ProjectConfigReader;

  constructor() {
    this.buildConfigReader = new ProjectConfigReader();
  }

  register(program: commander.Command) {
    program.command("deploy").alias("d").description("🚀 Deploy the project.").action(this._action);
    logger.debug(`Registered ${CJS_CMD} deploy command.`);
  }

  _action = (command: commander.Command) => {
    let buildConfig = this.buildConfigReader.read();

    if (!buildConfig) {
      logger.error("Build config is undefined.");
      throw new Error("Build config is undefined.");
    }

    let s = shell.which("ask");
    if (!s) {
      logger.error(
        "cjs requires 'ask' command to deploy your Alexa Skill. \nASK-CLI quick start guide: " +
          "https://developer.amazon.com/en-US/docs/alexa/smapi/quick-start-alexa-skills-kit-command-line-interface.html"
      );
      return;
    }

    // deploy using ask
    execSync(`cd ${buildConfig.outDir} && ask deploy`, {
      windowsHide: true,
      stdio: "inherit",
      cwd: process.cwd(),
    });
  };
}
