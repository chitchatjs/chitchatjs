import { AlexaBuilderContext, Skill } from "@chitchatjs/alexa";
import { BuilderContext } from "@chitchatjs/core";

import { logger } from "../components/Logger";
import { ProjectConfig } from "../types";
import { ProjectInitializer } from "./ProjectInitializer";

/**
 * Builds the skill using root block's build method.
 */
export class SkillBuilder {
  projectInitializer: ProjectInitializer;

  constructor() {
    this.projectInitializer = new ProjectInitializer();
  }

  /**
   * Builds the skill into its original artifacts
   * @param skill AlexaSkill
   * @param projectConfig ProjectConfig
   */
  build(skill: Skill, projectConfig: ProjectConfig): BuilderContext {
    if (!this.projectInitializer.isInitialized(projectConfig)) {
      this.projectInitializer.initialize(projectConfig);
    }

    let builderContext: AlexaBuilderContext = this.initBuilderContext();
    logger.debug(`Initialized builder context: ${JSON.stringify(builderContext)}`);

    let states = skill.states;
    Object.keys(states).forEach((stateName: string) => {
      logger.debug(`Compiling state ${stateName}`);
      states[stateName].block.build(builderContext);
    });

    logger.debug(`Final builder context: ${JSON.stringify(builderContext)}`);
    return builderContext;
  }

  initBuilderContext(): AlexaBuilderContext {
    let builderContext: AlexaBuilderContext = {
      resources: {
        resourceMap: {},
      },
    };

    return builderContext;
  }
}
