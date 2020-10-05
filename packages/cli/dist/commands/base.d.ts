import * as yargs from 'yargs';
export interface BaseCommand {
    setOptions(yargs: yargs.Argv): any;
    execute(argv: any): void;
}
