import { ui } from "inquirer";
import { ProjectBuilder, BuildConfig } from "./ProjectBuilder";
import { logger, startSpinner } from "../util/util";
import { DEV_WORKING_DIRECTORY } from "../util/util";
import path = require("path");
import { AlexaSkill } from "@chitchatjs/alexa";
import { SkillBuilder } from "../alexa/SkillBuilder";

/**
 * Alexa Project Builder
 */
export class AlexaProjectBuilder implements ProjectBuilder {
  build(buildConfig: BuildConfig): void {
    let spinner = startSpinner("🔨 Building project..");
    let skill: AlexaSkill = loadProject(buildConfig);

    let im = new SkillBuilder().build(skill, buildConfig);

    spinner.stop();
  }
}

function loadProject(buildConfig: BuildConfig) {
  logger.info("Loading your project from: " + DEV_WORKING_DIRECTORY);
  return require(DEV_WORKING_DIRECTORY).default as AlexaSkill;
}
