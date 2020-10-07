import { BaseCommand } from "./base";
import * as yargs from "yargs";
import * as inquirer from "inquirer";
import * as fs from "fs";
import * as path from "path";
import Choice = require("inquirer/lib/objects/choice");
import BottomBar = require("inquirer/lib/ui/bottom-bar");
import { buildBanner, startSpinner } from "../util/util";
import { GitClient } from "../components/GitClient";
import { Config, ConfigReader, Template } from "../components/ConfigReader";
import { TemplatesManager } from "../components/TemplatesManager";

/**
 * Constants
 */
const CURR_DIR: string = process.cwd();
const TEMPLATES_ROOT: string = path.join(__dirname, `../../templates/`);
const TEMPLATE_CHOICES: Array<string> = fs.readdirSync(TEMPLATES_ROOT);

// const DEFAULT_TEMPLATES: { [name: string]: string } = {
//     "hello-bot": "https://github.com/chitchatjs/hello-bot-template.git",
//     "empty-bot": "https://github.com/chitchatjs/hello-bot-template.git",
// };

/**
 * Global variables
 */
let ui: BottomBar = new inquirer.ui.BottomBar();

/**
 * Register Inquirer Plugins
 */
inquirer.registerPrompt("chalk-pipe", require("inquirer-chalk-pipe"));

/**
 * cjs new command executor.
 *  - to create a new project
 */
export class NewCommand implements BaseCommand {
    configReader: ConfigReader;
    templatesManager: TemplatesManager;
    gitClient: GitClient;

    constructor() {
        this.configReader = new ConfigReader();
        this.templatesManager = new TemplatesManager();
        this.gitClient = new GitClient();
    }
    initializer() {
        return (yargs: yargs.Argv) => {
            // No options for now. Interactive command.
        };
    }
    executor() {
        return (argv: any) => {
            console.log(buildBanner("Chit chat JS"));
            // load the config
            let config = this.configReader.read();
            inquirer
                .prompt(prepareQuestions(config))
                .then((answers) => {
                    this.createProject(answers, config);
                })
                .catch((error) => {
                    ui.updateBottomBar(`❌  An error occurred "${error}}".`);
                });
        };
    }

    createProject(answers: inquirer.Answers, config: Config) {
        let name = answers.name;
        let dir = answers.dir;
        let templateName = answers.template;

        let template: Template = this.templatesManager.getTemplateByName(
            config,
            templateName
        );

        const spinner = startSpinner("🚧 Creating your project..");
        this.gitClient.clone(template.url.value, path.join(process.cwd(), dir));
        setTimeout(() => {
            spinner.stop();
            ui.updateBottomBar(
                `✔️  Project created successfully at location ./"${dir}".`
            );
        }, 2000);
    }
}

function prepareQuestions(config: Config): inquirer.Question[] {
    let templateNames = new TemplatesManager().getTemplateNames(config);

    return [
        {
            type: "list",
            name: "template",
            message: "Pick a starting template: ",
            choices: templateNames,
        } as inquirer.ListQuestion,
        {
            type: "chalk-pipe",
            name: "dir",
            message: "Directory name: ",
            default: "my-bot",
            validate: (input: string) => {
                if (!fs.existsSync(`${CURR_DIR}/${input}`)) return true;
                return "Directory already exists.";
            },
        },
    ];
}
