import { ProjectBuilder, BuildConfig } from "./ProjectBuilder";
import { DEV_WORKING_DIRECTORY } from "../util/util";
import path = require("path");
import { Skill } from "@chitchatjs/alexa";
import { SkillBuilder } from "../alexa/SkillBuilder";

/**
 * Alexa Project Builder.
 */
export class AlexaProjectBuilder implements ProjectBuilder {
  build(buildConfig: BuildConfig): void {
    let skill: Skill = loadProject(buildConfig);
    new SkillBuilder().build(skill, buildConfig);
  }
}

function loadProject(buildConfig: BuildConfig) {
  return require(DEV_WORKING_DIRECTORY).default as Skill;
}
