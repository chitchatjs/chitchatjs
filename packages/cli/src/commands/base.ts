import * as yargs from 'yargs'

/**
 * Base Command interface
 */
export interface BaseCommand {
    setOptions(yargs: yargs.Argv): any
    execute(argv: any): void
}