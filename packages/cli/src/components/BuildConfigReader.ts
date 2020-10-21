import * as fs from "fs";
import * as path from "path";
import { CLI_CONFIG_DIRECTORY as CONFIG_DIR } from "../util/util";
import { CLI_CONFIG_FILE_NAME as CONFIG_NAME } from "../util/util";
import { BuildConfig } from "../builder/ProjectBuilder";
import { BUILD_CONFIG_FILE_NAME } from "../util/util";
import { logger } from "./Logger";

/**
 * Reads the user defined compiler config
 */
export class BuildConfigReader {
  read(configDir: string = CONFIG_DIR): BuildConfig | undefined {
    try {
      let cfgPath = path.join(process.cwd(), BUILD_CONFIG_FILE_NAME);
      let cfg = fs.readFileSync(cfgPath, "utf8");
      return JSON.parse(cfg) as BuildConfig;
    } catch (err) {
      logger.error("Can't find cjs.json. Are you in the root of the project?");
      process.exit(1);
    }
  }
}
