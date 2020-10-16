#!/usr/bin/env node
import chalk = require("chalk");
import yargs = require("yargs");
import { BuildCommand } from "./commands/build";
import { buildBanner, logger } from "./util/util";
import { NewCommand } from "./commands/new";
import { DeployCommand } from "./commands/deploy";

let newCommand = new NewCommand();
let buildCommand = new BuildCommand();
let deployCommand = new DeployCommand();

// Yargs cheatsheet
// https://devhints.io/yargs

function setupCommands() {
  let args = yargs
    .scriptName(chalk.green("cjs"))
    .usage(`$0 ${chalk.blue("[cmd]")} ${chalk.magenta("[options]")}`)

    .command("new", "🚧 Create a new Chitchat project.", newCommand.initializer(), newCommand.executor())
    .command("build", "🔨 Build the project.", buildCommand.initializer(), buildCommand.executor())
    .command(
      "deploy",
      "🚀 Deploy the project (requires ask-cli).",
      deployCommand.initializer(),
      deployCommand.executor()
    )

    .alias("h", "help")
    .help("help")
    .describe("help", "See what's available!")
    .showHelpOnFail(true, "Specify --help or -h for available commands and options.")

    .alias("v", "version")
    .describe("version", "Show current version of CJS.").argv;

  if (args["_"] && args["_"].length == 0) {
    console.log(buildBanner("Chit chat JS"));

    yargs.showHelp();
    process.exit(0);
  }
}

try {
  setupCommands();
} catch (err) {
  logger.errorAndExit(err.stack);
}
