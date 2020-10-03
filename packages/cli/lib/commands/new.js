"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewCommand = void 0;
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const CURR_DIR = process.cwd();
const TEMPLATES_ROOT = path.join(__dirname, `../../templates/`);
const TEMPLATE_CHOICES = fs.readdirSync(TEMPLATES_ROOT);
let ui = new inquirer.ui.BottomBar();
inquirer.registerPrompt('chalk-pipe', require('inquirer-chalk-pipe'));
class NewCommand {
    constructor() { }
    setOptions(yargs) {
    }
    execute(argv) {
        inquirer
            .prompt(questions)
            .then(answers => {
            let name = answers.name;
            let dir = answers.dir;
            let template = answers.template;
            let templatePath = `${TEMPLATES_ROOT}${template}`;
            let newProjectPath = `${CURR_DIR}/${dir}`;
            fs.mkdirSync(newProjectPath);
            ui.log.write('🚧 Creating your project ..');
            createDirectoryContents(templatePath, newProjectPath);
            ui.updateBottomBar(`✔️  Project created successfully at location "${dir}".`);
        })
            .catch(error => {
            ui.updateBottomBar(`❌  An error occurred "${error}}".`);
        });
    }
}
exports.NewCommand = NewCommand;
let questions = [
    {
        type: 'list',
        name: 'template',
        message: 'Pick a starting template: ',
        choices: TEMPLATE_CHOICES
    },
    {
        type: 'chalk-pipe',
        name: 'dir',
        message: 'Directory name: ',
        default: 'my-bot',
        validate: (input) => {
            if (!fs.existsSync(`${CURR_DIR}/${input}`))
                return true;
            return "Directory already exists.";
        }
    }
];
function createDirectoryContents(templatePath, newProjectPath) {
    let filesToCreate = fs.readdirSync(templatePath);
    filesToCreate.forEach(file => {
        let origFilePath = `${templatePath}/${file}`;
        let stats = fs.statSync(origFilePath);
        if (stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, 'utf8');
            const writePath = `${newProjectPath}/${file}`;
            fs.writeFileSync(writePath, contents, 'utf8');
            ui.updateBottomBar(`Created file at ${writePath}`);
        }
        else if (stats.isDirectory()) {
            fs.mkdirSync(`${newProjectPath}/${file}`);
            createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
        }
    });
}
//# sourceMappingURL=new.js.map