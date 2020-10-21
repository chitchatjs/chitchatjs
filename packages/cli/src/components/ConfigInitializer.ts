import * as fs from "fs";
import * as path from "path";
import { CLI_CONFIG_DIRECTORY as CONFIG_DIR } from "../util/util";
import { CLI_CONFIG_FILE_NAME as CONFIG_NAME } from "../util/util";
import { logger } from "./Logger";

const DEFAULT_CONFIG: Config = {
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
  ],
};

export interface Template {
  name: string;
  url: Url;
}

export interface Config {
  version: string;
  templates: Template[];
}
export interface Url {
  type: string;
  value: string;
}

/**
 * Reads the user defined compiler config
 */
export class ConfigInitializer {
  init(configDir: string = CONFIG_DIR): Config {
    logger.debug(`Config directory: `, configDir);
    if (!this.exists(configDir)) {
      this.create(configDir);
    }

    let cfg = fs.readFileSync(path.join(configDir, CONFIG_NAME), "utf8");

    // merge with default config to make sure we append new skills as we launch them
    return Object.assign(DEFAULT_CONFIG, JSON.parse(cfg));
  }

  exists(configDir: string) {
    return fs.existsSync(configDir);
  }

  create(configDir: string) {
    fs.mkdirSync(configDir);
    fs.writeFileSync(
      path.join(configDir, CONFIG_NAME),
      JSON.stringify(DEFAULT_CONFIG, null, 2),
      "utf8"
    );
  }
}
