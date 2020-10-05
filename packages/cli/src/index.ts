#!/usr/bin/env node
// import yargs = require('yargs')

// import * as yargs from 'yargs'
import { NewCommand } from './commands/new'
// import * as chalk from 'chalk'
import chalk = require('chalk')
import figlet = require('figlet')

let newCommand = new NewCommand()

import yargs = require('yargs');
console.log(chalk.yellowBright(figlet.textSync("Chit chat JS")))

// Yargs cheatsheet
// https://devhints.io/yargs

function setupCommands() {
    let args = yargs
        .scriptName(chalk.green('cjs'))
        .usage(`$0 ${chalk.blue("[cmd]")} ${chalk.magenta("[options]")}`)
        // .command("", "Hello Command", (yargs) => { console.log('welcome!!')}, (argv) => { console.log('welcome' + argv) })
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
        .usage('Usage: $0 -x [num]')
        .describe('help', "See what's available!")
        .showHelpOnFail(true, "Specify --help for available options")

        .alias('v', 'version')
        .describe('version', 'Show current version of CJS.')

        .strict()
        .argv

    yargs.showHelp()
    process.exit(0)
}

setupCommands()