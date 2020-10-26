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
  async build(skill: Skill, projectConfig: ProjectConfig): Promise<BuilderContext> {
    if (!this.projectInitializer.isInitialized(projectConfig)) {
      this.projectInitializer.initialize(projectConfig);
    }

    const builderContext: AlexaBuilderContext = this.initBuilderContext();
    logger.debug(`Initialized builder context: ${JSON.stringify(builderContext)}`);

    const states = skill.states;
    for (const stateName in states) {
      if (states.hasOwnProperty(stateName)) {
        logger.debug(`Compiling state ${stateName}`);
        await states[stateName].block.build(builderContext);
      }
    }

    logger.debug(`Final builder context: ${JSON.stringify(builderContext)}`);
    return builderContext;
  }

  initBuilderContext(): AlexaBuilderContext {
    const builderContext: AlexaBuilderContext = {
      resources: {
        resourceMap: {},
      },
    };

    return builderContext;
  }
}
