import { execSync } from "child_process";
import * as fs from "fs";
import { join } from "path";

import { ConfigInitializer } from "../components/ConfigInitializer";
import { GitClient } from "../components/GitClient";
import { logger } from "../components/Logger";
import { initSpinner } from "../components/Spinner";
import { TemplatesManager } from "../components/TemplatesManager";
import { CliConfig, Template } from "../types";
import { CJS_CMD } from "../util/constants";
import { buildBanner } from "../util/util";

import commander = require("commander");
import inquirer = require("inquirer");

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
  config: CliConfig;
  gitClient: GitClient;

  constructor(config: CliConfig) {
    this.configReader = new ConfigInitializer();
    this.config = config;
    this.templatesManager = new TemplatesManager();
    this.gitClient = new GitClient();
  }

  register(program: commander.Command) {
    program.command("new").alias("n").description("🚧 Create a new project.").action(this._action);
    logger.debug(`Registered ${CJS_CMD} new command.`);
  }

  _action = (command: commander.Command) => {
    const options: Options = {
      outputDir: command.outputDir,
      sample: command.sample,
    };

    // tslint:disable-next-line:no-console
    console.log(buildBanner());

    const questions = this._prepareQuestions(options);
    logger.debug("New command questions: " + JSON.stringify(questions));

    this._launchInquirer(questions);
  };

  _launchInquirer(questions: inquirer.Question<inquirer.Answers>[]) {
    inquirer
      .prompt(questions)
      .then((answers) => {
        this._createProject(answers, this.config);
      })
      .catch((error) => {
        logger.error(error.stack);
        process.exit(1);
      });
  }

  private _prepareQuestions(options: Options): inquirer.Question[] {
    const templateNames = new TemplatesManager().getTemplateNames(this.config);
    const questions: inquirer.Question[] = [];

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
        if (!fs.existsSync(`${process.cwd()}/${input}`)) return true;
        return "Directory already exists.";
      },
    });

    return questions;
  }

  private _createProject(answers: inquirer.Answers, config: CliConfig) {
    const dir = answers.dir;
    const templateName = answers.template;

    const template: Template = this.templatesManager.getTemplateByName(config, templateName);

    const spinner = initSpinner("🚧 Creating your project..").start();
    const projectLocation = join(process.cwd(), dir);
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
