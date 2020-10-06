#!/usr/bin/env node
import { NewCommand } from './commands/new';

import chalk = require('chalk')
import figlet = require('figlet')
import yargs = require('yargs');

let newCommand = new NewCommand()

/**
 * Figlets are fun,
 * and so is Chalk!
 */
console.log(chalk.yellowBright(figlet.textSync("Chit chat JS")))

// Yargs cheatsheet
// https://devhints.io/yargs

function setupCommands() {
    let args = yargs
        .scriptName(chalk.green('cjs'))
        .usage(`$0 ${chalk.blue("[cmd]")} ${chalk.magenta("[options]")}`)

        .command('new', '🚧 Create a new ChitchatJS project.', newCommand.setOptions, newCommand.execute)
        .command('add', '➕ Create a new talk.', (yargs) => { }, (argv) => {
            console.log('Command executed.')
        })
        .command('build', '🔨 Build the project.', (yargs) => { }, (argv) => {
            console.log('Not implemented yet.')
        })
        .command('deploy', '🚀 Deploy the project (requires ask-cli).', (yargs) => { }, (argv) => {
            console.log('Not implemented yet.')
        })
        .command('clean', '⛔ Clean up.', (yargs) => { }, (argv) => {
            console.log('Not implemented yet.')
        })

        .alias('h', 'help')
        .help('help')
        .describe('help', "See what's available!")
        .showHelpOnFail(true, "Specify --help or -h for available commands and options.")

        .alias('v', 'version')
        .describe('version', 'Show current version of CJS.')

        // .strict()
        .argv

        if(args['_'] && args['_'].length == 0) {
            yargs.showHelp()
            process.exit(0)
        }
}

setupCommands()