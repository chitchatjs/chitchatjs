#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = __importStar(require("yargs"));
const new_1 = require("./commands/new");
let newCommand = new new_1.NewCommand();
yargs
    .scriptName('💬  cjs')
    .usage('$0|chitchat <cmd> [options]')
    .command('new', '🚧  Create a new ChitchatJS project.', newCommand.setOptions, newCommand.execute)
    .command('add', '➕  Create a new talk.', (yargs) => { }, (argv) => {
    console.log('Command executed.');
})
    .command('build', '🔨  Build the project.', (yargs) => { }, (argv) => {
    console.log('Not implemented yet.');
})
    .command('build', '🚀  Deploy the project (requires ask-cli).', (yargs) => { }, (argv) => {
    console.log('Not implemented yet.');
})
    .command('build', '⛔  Cleanup.', (yargs) => { }, (argv) => {
    console.log('Not implemented yet.');
})
    .help()
    .argv;
//# sourceMappingURL=index.js.map