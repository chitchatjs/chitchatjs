import { BaseCommand } from './base';
import * as yargs from 'yargs';
export declare class NewCommand implements BaseCommand {
    constructor();
    setOptions(yargs: yargs.Argv): void;
    execute(argv: any): void;
}
