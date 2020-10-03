#!/usr/bin/env node
import yargs = require('yargs')

yargs
    .scriptName('💬 cjs')
    .usage('$0 <cmd> [options]')
    .command('new', '🚧 Create a new ChitchatJS project.', (yargs) => {}, (argv) => {
        console.log('Command executed.')
    })
    .command('add', '➕ Create a new talk.', (yargs) => {}, (argv) => {
        console.log('Command executed.')
    })
    .command('build', '🔨 Build the project.', (yargs) => {}, (argv) => {
        console.log('Command executed.')
    })
    .command('build', '🚀 Deploy the project (requires ask-cli).', (yargs) => {}, (argv) => {
        console.log('Command executed.')
    })
    .help()
    .argv

