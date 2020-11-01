import os from "os";
import path from "path";

import { CliConfig } from "../types";

export const CJS_CMD = "cjs";
export const DEV_WORKING_DIRECTORY: string = process.cwd();

/**
 * CLI Configuration
 */
export const CLI_CONFIG_DIRECTORY: string = path.join(os.homedir(), ".cjs/");
export const CLI_CONFIG_FILE_NAME: string = "config.json";

/**
 * Project Configuration
 */
export const PROJECT_CONFIG_FILE_NAME: string = "cjs.json";
export const PROJECT_CONFIG_FILE_PATH = path.join(
  DEV_WORKING_DIRECTORY,
  PROJECT_CONFIG_FILE_NAME
);

export const DEFAULT_CLI_CONFIG: CliConfig = {
  version: "1.0",
  templates: [
    {
      name: "Hello Bot",
      url: {
        type: "GIT",
        value: "https://github.com/chitchatjs/hello-bot-template.git",
      },
    },
    {
      name: "Dog Match",
      url: {
        type: "GIT",
        value: "https://github.com/chitchatjs/pet-match-template.git",
      },
    },
    {
      name: "High Low Game",
      url: {
        type: "GIT",
        value: "https://github.com/chitchatjs/high-low-game.git",
      },
    },
    {
      name: "Coffee Shop",
      url: {
        type: "GIT",
        value: "https://github.com/chitchatjs/coffee-shop.git",
      },
    },
    {
      name: "Workout Buddy",
      url: {
        type: "GIT",
        value: "https://github.com/chitchatjs/workout-buddy.git",
      },
    },
  ],
};
