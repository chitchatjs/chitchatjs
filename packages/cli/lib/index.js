#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
yargs
    .scriptName('💬 cjs')
    .usage('$0 <cmd> [options]')
    .command('new', '🚧 XXCreate a new ChitchatJS project.', (yargs) => { }, (argv) => {
    console.log('Command executed.');
})
    .command('add', '➕ Create a new talk.', (yargs) => { }, (argv) => {
    console.log('Command executed.');
})
    .command('build', '🔨 Build the project.', (yargs) => { }, (argv) => {
    console.log('Command executed.');
})
    .command('build', '🚀 Deploy the project (requires ask-cli).', (yargs) => { }, (argv) => {
    console.log('Command executed.');
})
    .help()
    .argv;
//# sourceMappingURL=index.js.map