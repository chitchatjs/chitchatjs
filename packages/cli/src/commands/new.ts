import { BaseCommand } from './base'
import * as yargs from 'yargs'
import * as inquirer from 'inquirer'
import * as fs from 'fs'
import * as path from 'path'
import Choice = require('inquirer/lib/objects/choice')
import BottomBar = require('inquirer/lib/ui/bottom-bar')

/**
 * Constants
 */
const CURR_DIR: string = process.cwd()
const TEMPLATES_ROOT: string = path.join(__dirname, `../../templates/`)
const TEMPLATE_CHOICES: Array<string> = fs.readdirSync(TEMPLATES_ROOT);

/**
 * Global variables
 */
let ui: BottomBar = new inquirer.ui.BottomBar();

/**
 * Register Inquirer Plugins
 */
inquirer.registerPrompt('chalk-pipe', require('inquirer-chalk-pipe'))

/**
 * cjs new command executor.
 *  - to create a new project
 */
export class NewCommand implements BaseCommand {
    constructor() { }
    setOptions(yargs: yargs.Argv) {
        // No options for now. Interactive command.
    }
    execute(argv: any) {
        inquirer
            .prompt(questions)
            .then(answers => {

                let name = answers.name
                let dir = answers.dir
                let template = answers.template

                let templatePath = `${TEMPLATES_ROOT}${template}`
                let newProjectPath = `${CURR_DIR}/${dir}`
                fs.mkdirSync(newProjectPath)

                ui.log.write('🚧 Creating your project ..')
                createDirectoryContents(templatePath, newProjectPath)
                ui.updateBottomBar(`✔️  Project created successfully at location "${dir}".`)
            })
            .catch(error => {
                ui.updateBottomBar(`❌  An error occurred "${error}}".`)
            })
    }
}

let questions: inquirer.Question[] = [
    {
        type: 'list',
        name: 'template',
        message: 'Pick a starting template: ',
        choices: TEMPLATE_CHOICES
    } as inquirer.ListQuestion,
    {
        type: 'chalk-pipe',
        name: 'dir',
        message: 'Directory name: ',
        default: 'my-bot',
        validate: (input: string) => {
            if (!fs.existsSync(`${CURR_DIR}/${input}`)) return true
            return "Directory already exists."
        }
    }
]

/**
 * https://medium.com/northcoders/creating-a-project-generator-with-node-29e13b3cd309
 * 
 * @param templatePath 
 * @param newProjectPath 
 */
function createDirectoryContents(templatePath: string, newProjectPath: string) {
    let filesToCreate = fs.readdirSync(templatePath)

    filesToCreate.forEach(file => {
        let origFilePath = `${templatePath}/${file}`

        // get stats about the current file
        let stats = fs.statSync(origFilePath)

        if (stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, 'utf8')
            const writePath = `${newProjectPath}/${file}`
            fs.writeFileSync(writePath, contents, 'utf8')

            ui.updateBottomBar(`Created file at ${writePath}`)
        } else if (stats.isDirectory()) {
            fs.mkdirSync(`${newProjectPath}/${file}`);

            // recursive call
            createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
        }
    })
}