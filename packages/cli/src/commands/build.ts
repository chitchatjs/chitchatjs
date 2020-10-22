import commander from "commander";

import { AlexaProjectBuilder } from "../builder/AlexaProjectBuilder";
import { ProjectConfigReader } from "../components/ProjectConfigReader";
import { logger } from "../components/Logger";
import { CJS_CMD } from "../util/constants";
import { BaseCommand } from "./base";

/**
 * Command to build the project.
 * $ cjs build
 */
export class BuildCommand implements BaseCommand {
  buildConfigReader: ProjectConfigReader;

  constructor() {
    this.buildConfigReader = new ProjectConfigReader();
  }

  register(program: commander.Command) {
    program.command("build").alias("b").description("🔨 Build the project.").action(this._action);
    logger.debug(`Registered ${CJS_CMD} build command.`);
  }

  _action = (command: commander.Command) => {
    const buildConfig = this.buildConfigReader.read();

    if (buildConfig?.target === "Alexa") {
      let builder = new AlexaProjectBuilder();
      builder.build(buildConfig);
    } else {
      logger.error("Dialogflow is not yet supported");
      process.exit(0);
    }
  };
}
