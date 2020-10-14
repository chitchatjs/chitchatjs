import * as fs from "fs";
import * as path from "path";
import { CLI_CONFIG_DIRECTORY as CONFIG_DIR } from "../util/util";
import { CLI_CONFIG_FILE_NAME as CONFIG_NAME } from "../util/util";

const DEFAULT_CONFIG: Config = {
  version: "1.0",
  templates: [
    {
      name: "hello-bot",
      url: {
        type: "GIT",
        value: "https://github.com/chitchatjs/hello-bot-template.git",
      },
    },
    {
      name: "pet-match",
      url: {
        type: "GIT",
        value: "https://github.com/chitchatjs/pet-match-template.git",
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
export class ConfigReader {
  read(configDir: string = CONFIG_DIR): Config {
    console.log(`Config directory: `, configDir);
    if (!this.exists(configDir)) {
      this.create(configDir);
    }

    let cfg = fs.readFileSync(path.join(configDir, CONFIG_NAME), "utf8");
    return JSON.parse(cfg) as Config;
  }

  exists(configDir: string) {
    return fs.existsSync(configDir);
  }

  create(configDir: string) {
    fs.mkdirSync(configDir);
    fs.writeFileSync(path.join(configDir, CONFIG_NAME), JSON.stringify(DEFAULT_CONFIG, null, 2), "utf8");
  }
}
