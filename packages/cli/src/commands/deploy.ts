import { BaseCommand } from "./base";
import * as shell from "shelljs";
import { BuildConfigReader } from "../components/BuildConfigReader";
import commander from "commander";
import { logger } from "../components/Logger";
import { CJS_CMD } from "../util/util";
import { execSync } from "child_process";

/**
 * Command to deploy project.
 * $ cjs deploy
 */
export class DeployCommand implements BaseCommand {
  buildConfigReader: BuildConfigReader;

  constructor() {
    this.buildConfigReader = new BuildConfigReader();
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
