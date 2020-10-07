import * as yargs from "yargs";

/**
 * Base Command interface
 */
export interface BaseCommand {
    /**
     * Defines the options of the command.
     *
     */
    initializer(): any;

    /**
     * Executes the arguments object parsed by the Yargs.
     *
     */
    executor(): any;
}
