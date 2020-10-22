import * as fs from "fs";
import * as path from "path";

import { CliConfig } from "../types";
import { CLI_CONFIG_FILE_NAME, DEFAULT_CLI_CONFIG } from "../util/constants";
import { logger } from "./Logger";

/**
 * Initializes configuration
 */
export class ConfigInitializer {
  init(configDir: string): CliConfig {
    logger.debug(`Config directory: `, configDir);
    if (!this.exists(configDir)) {
      this.create(configDir);
    }

    let cfg = fs.readFileSync(path.join(configDir, CLI_CONFIG_FILE_NAME), "utf8");

    // merge with default config to make sure we append new skills as we launch them
    return Object.assign(DEFAULT_CLI_CONFIG, JSON.parse(cfg));
  }

  exists(configDir: string) {
    return fs.existsSync(configDir);
  }

  create(configDir: string) {
    fs.mkdirSync(configDir);
    fs.writeFileSync(
      path.join(configDir, CLI_CONFIG_FILE_NAME),
      JSON.stringify(DEFAULT_CLI_CONFIG, null, 2),
      "utf8"
    );
  }
}
