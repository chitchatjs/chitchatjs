import { AlexaBuilderContext, Skill } from "@chitchatjs/alexa";

import { SkillBuilder } from "../alexa/SkillBuilder";
import { ProjectWriter } from "../components/ProjectWriter";
import { DEV_WORKING_DIRECTORY } from "../util/constants";
import { BuildConfig, ProjectBuilder } from "./ProjectBuilder";

/**
 * Alexa Project Builder.
 */
export class AlexaProjectBuilder implements ProjectBuilder {
  build(buildConfig: BuildConfig): void {
    let skill: Skill = this.loadProject(buildConfig);
    let builderContext: AlexaBuilderContext = new SkillBuilder().build(skill, buildConfig);

    let projectWriter: ProjectWriter = new ProjectWriter();
    projectWriter.writeProject(builderContext, buildConfig);
  }

  loadProject(buildConfig: BuildConfig) {
    return require(DEV_WORKING_DIRECTORY).default as Skill;
  }
}
