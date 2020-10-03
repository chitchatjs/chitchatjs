#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const new_1 = require("./commands/new");
let newCommand = new new_1.NewCommand();
yargs
    .scriptName('💬 cjs')
    .usage('$0|chitchat <cmd> [options]')
    .command('new', '🚧 Create a new ChitchatJS project.', newCommand.setOptions, newCommand.execute)
    .command('add', '➕ Create a new talk.', (yargs) => { }, (argv) => {
    console.log('Command executed.');
})
    .command('build', '🔨 Build the project.', (yargs) => { }, (argv) => {
    console.log('Not implemented yet.');
})
    .command('build', '🚀 Deploy the project (requires ask-cli).', (yargs) => { }, (argv) => {
    console.log('Not implemented yet.');
})
    .command('build', '⛔ Cleanup.', (yargs) => { }, (argv) => {
    console.log('Not implemented yet.');
})
    .help()
    .argv;
//# sourceMappingURL=index.js.map