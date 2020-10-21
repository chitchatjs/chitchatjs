import { BaseCommand } from "./base";
import { AlexaProjectBuilder } from "../builder/AlexaProjectBuilder";
import { BuildConfigReader } from "../components/BuildConfigReader";
import commander from "commander";
import { logger } from "../components/Logger";
import { CJS_CMD } from "../util/util";

/**
 * Command to build the project.
 * $ cjs build
 */
export class BuildCommand implements BaseCommand {
  buildConfigReader: BuildConfigReader;

  constructor() {
    this.buildConfigReader = new BuildConfigReader();
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
