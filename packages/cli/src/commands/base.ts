import * as yargs from 'yargs'

/**
 * Base Command interface
 */
export interface BaseCommand {
    /**
     * Defines the options of the command.
     * 
     * @param yargs yargs
     */
    setOptions(yargs: yargs.Argv): any

    /**
     * Executes the arguments object parsed by the Yargs.
     * 
     * @param argv arguments
     */
    execute(argv: any): void
}