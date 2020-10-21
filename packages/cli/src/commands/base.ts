import commander from "commander";

/**
 * Base Command interface
 */
export interface BaseCommand {
  /**
   * Register the command into the commander
   *
   * @param program Command
   */
  register(program: commander.Command): any;
}
