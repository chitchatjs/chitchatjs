import { AlexaBuilderContext, Skill } from "@chitchatjs/alexa";

import { SkillBuilder } from "./SkillBuilder";
import { ProjectWriter } from "../components/ProjectWriter";
import { ProjectConfig } from "../types";
import { DEV_WORKING_DIRECTORY } from "../util/constants";

/**
 * Root component for building Alexa Skill Project.
 */
export class AlexaProjectBuilder {
  skillBuilder: SkillBuilder;
  projectWriter: ProjectWriter;

  constructor() {
    this.skillBuilder = new SkillBuilder();
    this.projectWriter = new ProjectWriter();
  }

  build(projectConfig: ProjectConfig): void {
    let skill: Skill = this.loadProject(projectConfig);
    let builderContext: AlexaBuilderContext = this.skillBuilder.build(skill, projectConfig);

    this.projectWriter.writeProject(builderContext, projectConfig);
  }

  loadProject(projectConfig: ProjectConfig) {
    return require(DEV_WORKING_DIRECTORY).default as Skill;
  }
}
