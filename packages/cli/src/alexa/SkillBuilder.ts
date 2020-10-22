import { AlexaBuilderContext, Skill } from "@chitchatjs/alexa";
import { BuilderContext } from "@chitchatjs/core";

import { BuildConfig } from "../builder/ProjectBuilder";
import { logger } from "../components/Logger";
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
   * @param buildConfig BuildConfig
   */
  build(skill: Skill, buildConfig: BuildConfig): BuilderContext {
    if (!this.projectInitializer.isInitialized(buildConfig)) {
      this.projectInitializer.initialize(buildConfig);
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
