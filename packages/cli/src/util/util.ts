import ora = require('ora')
import cliSpinners = require('cli-spinners')
import figlet = require('figlet')
import chalk = require('chalk')

export let startSpinner = (text: string) => {
    return ora({ text: text, spinner: cliSpinners.random }).start()
}

export let buildBanner = (text: string) => {
    return chalk.yellowBright(figlet.textSync(text))
}