import commander from "commander";

import { AlexaProjectBuilder } from "../alexa/AlexaProjectBuilder";
import { logger } from "../components/Logger";
import { ProjectConfigReader } from "../components/ProjectConfigReader";
import { CJS_CMD } from "../util/constants";
import { BaseCommand } from "./base";

/**
 * Command to build the project.
 * $ cjs build
 */
export class BuildCommand implements BaseCommand {
  projectConfigReader: ProjectConfigReader;
  projectBuilder: AlexaProjectBuilder;

  constructor() {
    this.projectConfigReader = new ProjectConfigReader();
    this.projectBuilder = new AlexaProjectBuilder();
  }

  register(program: commander.Command) {
    program.command("build").alias("b").description("🔨 Build the project.").action(this._action);
    logger.debug(`Registered ${CJS_CMD} build command.`);
  }

  _action = async (command: commander.Command) => {
    const projectConfig = this.projectConfigReader.read();
    await this.projectBuilder.build(projectConfig);
  };
}
