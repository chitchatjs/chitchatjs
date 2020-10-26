import * as fs from "fs";
import * as path from "path";

import { ProjectConfig } from "../types";
import { PROJECT_CONFIG_FILE_NAME } from "../util/constants";
import { logger } from "./Logger";

/**
 * Reads the user defined project config
 */
export class ProjectConfigReader {
  read(): ProjectConfig {
    try {
      const cfgPath = path.join(process.cwd(), PROJECT_CONFIG_FILE_NAME);
      const cfg = fs.readFileSync(cfgPath, "utf8");
      return JSON.parse(cfg) as ProjectConfig;
    } catch (err) {
      logger.error("Can't find cjs.json. Are you in the root of the project?");
      process.exit(1);
    }
  }
}
