import ora = require('ora')
import cliSpinners = require('cli-spinners')

export let startSpinner = (text: string) => {
    return ora({ text: text, spinner: cliSpinners.random }).start()
}