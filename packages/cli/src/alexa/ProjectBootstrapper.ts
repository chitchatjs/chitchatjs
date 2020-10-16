import { BuildConfig } from "../builder/ProjectBuilder";
import * as fs from "fs";
import * as path from "path";
import { v1 } from "ask-smapi-model";
import { logger } from "../util/util";

interface CjsMetadata {
  askStates: any;
  askResources: any;
  skillManifest: v1.skill.Manifest.SkillManifest;
}

const defaultCjsMetadata: CjsMetadata = {
  askResources: {
    askcliResourcesVersion: "2020-03-31",
    profiles: {
      default: {
        skillMetadata: {
          src: "./skill-package",
        },
        code: {
          default: {
            src: "./lambda",
          },
        },
        skillInfrastructure: {
          userConfig: {
            runtime: "nodejs10.x",
            handler: "dist/index.handler",
            awsRegion: "us-east-1",
          },
          type: "@ask-cli/lambda-deployer",
        },
      },
    },
  },
  askStates: {
    askcliStatesVersion: "2020-03-31",
    profiles: {
      default: {
        skillInfrastructure: {
          "@ask-cli/lambda-deployer": {
            deployState: {},
          },
        },
      },
    },
  },
  skillManifest: <v1.skill.Manifest.SkillManifest>{
    manifestVersion: "1.0",
    apis: {
      custom: {},
    },
  },
};

/**
 * Bootstrapper is a pre-build hook.
 * It runs everytime SkillBuilder is invoked.
 * It's job is to setup directories if not already present.
 */
export class ProjectBootstrapper {
  bootstrapProject(buildConfig: BuildConfig): void {
    let outDir = buildConfig.outDir;
    let currDir = process.cwd();

    this.bootstrapOutDir(outDir, currDir);
  }

  /**
   * Creates an empty output directory if not already present.
   *
   * @param outDir Output directory
   * @param currDir Current directory
   */
  private bootstrapOutDir(outDir: string, currDir: string) {
    let targetLocation = path.join(currDir, outDir);

    if (fs.existsSync(targetLocation)) {
      logger.info(`Output directory already exists. Skipping the bootstrapping.`);
      return;
    }

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

    this.bootstrapMetadata(outDir, currDir);
  }

  /**
   * If CJS metadata is present, it reads from there, otherwise creates it.
   */
  private bootstrapMetadata(outDir: string, currDir: string): CjsMetadata | void {
    // Save default ask-resources.json
    let askResourcesTargetLocation = path.join(currDir, outDir, "/ask-resources.json");

    logger.info(`Writing ${askResourcesTargetLocation}`);
    fs.writeFileSync(askResourcesTargetLocation, JSON.stringify(defaultCjsMetadata.askResources, null, 2), "utf8");

    // Save default ask-states.json
    let askStatesTargetLocation = path.join(currDir, outDir, "/.ask/ask-states.json");
    logger.info(`Writing ${askStatesTargetLocation}`);
    fs.writeFileSync(askStatesTargetLocation, JSON.stringify(defaultCjsMetadata.askStates, null, 2), "utf8");
  }
}
