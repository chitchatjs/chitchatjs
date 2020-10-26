import chalk from "chalk";

import { SkillManifestEnvelope } from "@chitchatjs/alexa";

/**
 * Builds a Figlet banner using ASCII letters.
 *
 * @param text Banner Text
 */
export let buildBanner = () => {
  const banner =
    chalk.red("===========\n") +
    chalk.bold(chalk.white("Chit") + chalk.green("chat") + chalk.white(".js\n")) +
    chalk.red("===========\n") +
    "A command line interface to build voice interfaces for Alexa Skills." +
    "\n";
  return banner;
};

export const INITIAL_ASK_RESOURCE = {
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
};

export const INITIAL_ASK_STATES = {
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
};

export const INITIAL_SKILL_MANIFEST: SkillManifestEnvelope = {
  manifest: {
    manifestVersion: "1.0",
    apis: {
      custom: {},
    },
  },
};

export let prettyJson = (s: string) => {
  return JSON.stringify(JSON.parse(s), null, 2);
};
