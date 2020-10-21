import { BuildConfig } from "../builder/ProjectBuilder";
import * as fs from "fs";
import * as path from "path";
import { v1 } from "ask-smapi-model";
import { logger } from "../components/Logger";
import { INITIAL_ASK_RESOURCE, INITIAL_ASK_STATES, INITIAL_SKILL_MANIFEST } from "../util/util";

interface CjsMetadata {
  askStates: any;
  askResources: any;
  skillManifest: v1.skill.Manifest.SkillManifest;
}

const DEFAULT_CJS_METADATA: CjsMetadata = {
  askResources: INITIAL_ASK_RESOURCE,
  askStates: INITIAL_ASK_STATES,
  skillManifest: INITIAL_SKILL_MANIFEST,
};

/**
 * Bootstrapper is a pre-build hook.
 * It runs everytime SkillBuilder is invoked.
 * It's job is to setup directories if not already present.
 */
export class ProjectInitializer {
  /**
   * Checks if project is initialized already.
   * @param buildConfig BuildConfig
   */
  isInitialized(buildConfig: BuildConfig): boolean {
    let outDir = buildConfig.outDir;
    let currDir = process.cwd();
    let targetLocation = path.join(currDir, outDir);

    logger.info(`Output directory already exists. Skipping the bootstrapping.`);
    return fs.existsSync(targetLocation);
  }

  /**
   * Initializes the project for the first time
   * @param buildConfig BuildConfig
   */
  initialize(buildConfig: BuildConfig): void {
    let outDir = buildConfig.outDir;
    let currDir = process.cwd();

    this.initializeOutDir(outDir, currDir);
  }

  /**
   * Creates an empty output directory if not already present.
   *
   * @param outDir Output directory
   * @param currDir Current directory
   */
  private initializeOutDir(outDir: string, currDir: string) {
    let targetLocation = path.join(currDir, outDir);

    fs.mkdirSync(targetLocation, { recursive: true });

    logger.info(`Created ${targetLocation}`);
    let skillPackageTargetLocation = path.join(currDir, outDir, "/skill-package");

    if (!fs.existsSync(skillPackageTargetLocation)) {
      fs.mkdirSync(skillPackageTargetLocation, { recursive: true });
      logger.info(`Created ${skillPackageTargetLocation}`);
    }

    let deployerTargetLocation = path.join(currDir, outDir, "/infrastructure/lambda-deployer");
    if (!fs.existsSync(deployerTargetLocation)) {
      fs.mkdirSync(deployerTargetLocation, { recursive: true });
      logger.info(`Created ${deployerTargetLocation}`);
    }

    let lambdaTargetLocation = path.join(currDir, outDir, "/lambda");
    if (!fs.existsSync(lambdaTargetLocation)) {
      fs.mkdirSync(lambdaTargetLocation, { recursive: true });
      logger.info(`Created ${lambdaTargetLocation}`);
    }

    let askDirTargetLocation = path.join(currDir, outDir, "/.ask");
    if (!fs.existsSync(askDirTargetLocation)) {
      fs.mkdirSync(askDirTargetLocation, { recursive: true });
      logger.info(`Created ${askDirTargetLocation}`);
    }

    this.initializeData(outDir, currDir);
  }

  /**
   * If CJS metadata is present, it reads from there, otherwise creates it.
   */
  private initializeData(outDir: string, currDir: string): CjsMetadata | void {
    // Save default ask-resources.json
    let askResourcesTargetLocation = path.join(currDir, outDir, "/ask-resources.json");

    logger.info(`Writing ${askResourcesTargetLocation}`);
    fs.writeFileSync(
      askResourcesTargetLocation,
      JSON.stringify(DEFAULT_CJS_METADATA.askResources, null, 2),
      "utf8"
    );

    // Save default ask-states.json
    let askStatesTargetLocation = path.join(currDir, outDir, "/.ask/ask-states.json");
    logger.info(`Writing ${askStatesTargetLocation}`);
    fs.writeFileSync(
      askStatesTargetLocation,
      JSON.stringify(DEFAULT_CJS_METADATA.askStates, null, 2),
      "utf8"
    );
  }
}
