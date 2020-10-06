#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const yargs = require("yargs");
const build_1 = require("./commands/build");
const util_1 = require("./util/util");
const new_1 = require("./commands/new");
let newCommand = new new_1.NewCommand();
let buildCommand = new build_1.BuildCommand();
function setupCommands() {
    let args = yargs
        .scriptName(chalk.green('cjs'))
        .usage(`$0 ${chalk.blue("[cmd]")} ${chalk.magenta("[options]")}`)
        .command('new', '🚧 Create a new ChitchatJS project.', newCommand.setOptions, newCommand.execute)
        .command('add', '➕ Create a new talk.', (yargs) => { }, (argv) => {
        console.log('Command executed.');
    })
        .command('build', '🔨 Build the project.', buildCommand.setOptions, buildCommand.execute)
        .command('deploy', '🚀 Deploy the project (requires ask-cli).', (yargs) => { }, (argv) => {
        console.log('Not implemented yet.');
    })
        .command('clean', '⛔ Clean up.', (yargs) => { }, (argv) => {
        console.log('Not implemented yet.');
    })
        .alias('h', 'help')
        .help('help')
        .describe('help', "See what's available!")
        .showHelpOnFail(true, "Specify --help or -h for available commands and options.")
        .alias('v', 'version')
        .describe('version', 'Show current version of CJS.')
        .argv;
    if (args['_'] && args['_'].length == 0) {
        console.log(util_1.buildBanner("Chit chat JS"));
        yargs.showHelp();
        process.exit(0);
    }
}
setupCommands();
//# sourceMappingURL=index.js.map