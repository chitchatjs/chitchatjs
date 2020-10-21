import chalk from "chalk";
import cliSpinners from "cli-spinners";
import ora from "ora";

class Logger {
  isDebug: boolean;

  constructor() {
    this.isDebug = process.env.DEBUG === "true";
  }

  silly(...message: string[]) {
    console.log(chalk.grey(`silly ${message.join(" ")}`));
  }

  info(...message: string[]) {
    console.log(chalk.green("info") + " " + message.join(" "));
  }

  success(...message: string[]) {
    console.log(chalk.bold.green("success") + " " + message.join(" "));
  }

  debug(...message: string[]) {
    if (this.isDebug) console.log(chalk.cyan("debug") + " " + message.join(" "));
  }

  error(...message: string[]) {
    console.log(chalk.bgRed("error") + " " + message.join(" "));
  }

  tip(...message: string[]) {
    console.log(chalk.yellow(`💡 tip`) + " " + chalk.grey(`${message.join(" ")}`));
  }
}

export const logger = new Logger();
