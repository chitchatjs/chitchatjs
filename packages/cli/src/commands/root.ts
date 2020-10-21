import * as commander from "commander";
import chalk from "chalk";
import { buildBanner } from "../util/util";

/**
 * Root command.
 * $ cjs
 */
export class RootCommand {
  register(program: commander.Command) {
    program
      .description(buildBanner())
      .version(require("../../package.json").version)
      .name(chalk.green("cjs"));
  }
}
