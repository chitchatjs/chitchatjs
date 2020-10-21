import * as fs from "fs";
import { Config, ConfigInitializer, Template } from "../components/ConfigInitializer";
import commander = require("commander");
import inquirer = require("inquirer");
import { TemplatesManager } from "../components/TemplatesManager";
import { buildBanner, CJS_CMD } from "../util/util";
import { logger } from "../components/Logger";
import { initSpinner } from "../components/Spinner";
import { GitClient } from "../components/GitClient";
import { join } from "path";
import { execSync } from "child_process";

const CURR_DIR: string = process.cwd();

interface Options {
  outputDir?: string;
  sample?: string;
}

/**
 * Command to create new projects.
 * $ cjs new
 */
export class NewCommand {
  configReader: ConfigInitializer;
  templatesManager: TemplatesManager;
  config: Config;
  gitClient: GitClient;

  constructor() {
    this.configReader = new ConfigInitializer();
    this.config = this.configReader.init();
    this.templatesManager = new TemplatesManager();
    this.gitClient = new GitClient();
  }

  register(program: commander.Command) {
    program.command("new").alias("n").description("🚧 Create a new project.").action(this._action);
    logger.debug(`Registered ${CJS_CMD} new command.`);
  }

  private _action = (command: commander.Command) => {
    let options: Options = {
      outputDir: command.outputDir,
      sample: command.sample,
    };

    console.log(buildBanner());

    let questions = this._prepareQuestions(options);
    logger.debug("New command questions: " + JSON.stringify(questions));

    inquirer
      .prompt(questions)
      .then((answers) => {
        this._createProject(answers, this.config);
      })
      .catch((error) => {
        logger.error(error.stack);
        process.exit(1);
      });
  };

  private _prepareQuestions(options: Options): inquirer.Question[] {
    let templateNames = new TemplatesManager().getTemplateNames(this.config);
    let questions: inquirer.Question[] = [];

    questions.push({
      type: "list",
      name: "template",
      message: "Pick a starting sample: ",
      choices: templateNames,
    } as inquirer.ListQuestion);

    questions.push({
      type: "chalk-pipe",
      name: "dir",
      message: "Directory name: ",
      default: "my-bot",
      validate: (input: string) => {
        if (!fs.existsSync(`${CURR_DIR}/${input}`)) return true;
        return "Directory already exists.";
      },
    });

    return questions;
  }

  private _createProject(answers: inquirer.Answers, config: Config) {
    let dir = answers.dir;
    let templateName = answers.template;

    let template: Template = this.templatesManager.getTemplateByName(config, templateName);

    let spinner = initSpinner("🚧 Creating your project..").start();
    let projectLocation = join(process.cwd(), dir);
    setTimeout(() => {
      spinner.color = "yellow";
      spinner.text = "🚧 Cloning the sample..";
      setTimeout(() => {
        this.gitClient.clone(template.url.value, projectLocation);

        // install and compile
        execSync(`cd ${projectLocation} && npm i && tsc`, {
          windowsHide: true,
          stdio: "inherit",
          cwd: process.cwd(),
        });

        spinner.stop();

        logger.success(`Project created successfully at ${projectLocation}.`);
        logger.tip(
          `Project setup includes dependencies installation and compilation. Next, try running "cjs build".`
        );
      }, 500);
    }, 500);
  }
}
