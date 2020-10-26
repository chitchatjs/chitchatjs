// import { CJS_CMD } from "../util/util";
import { execSync } from "child_process";
import commander from "commander";
import * as shell from "shelljs";

import { logger } from "../components/Logger";
import { ProjectConfigReader } from "../components/ProjectConfigReader";
import { ProjectConfig } from "../types";
import { CJS_CMD } from "../util/constants";
import { BaseCommand } from "./base";

/**
 * Command to deploy project.
 * $ cjs deploy
 */
export class DeployCommand implements BaseCommand {
  projectConfigReader: ProjectConfigReader;

  constructor() {
    this.projectConfigReader = new ProjectConfigReader();
  }

  register(program: commander.Command) {
    program.command("deploy").alias("d").description("🚀 Deploy the project.").action(this._action);
    logger.debug(`Registered ${CJS_CMD} deploy command.`);
  }

  _action = (command: commander.Command) => {
    const projectConfig = this.projectConfigReader.read();

    const s = shell.which("ask");
    if (!s) {
      logger.error(
        "cjs requires 'ask' command to deploy your Alexa Skill. \nASK-CLI quick start guide: " +
          "https://developer.amazon.com/en-US/docs/alexa/smapi/quick-start-alexa-skills-kit-command-line-interface.html"
      );
      return;
    }

    // deploy using ask
    this._deploy(projectConfig);
  };

  _deploy(projectConfig: ProjectConfig) {
    execSync(`cd ${projectConfig.outDir} && ask deploy`, {
      windowsHide: true,
      stdio: "inherit",
      cwd: process.cwd(),
    });
  }
}
