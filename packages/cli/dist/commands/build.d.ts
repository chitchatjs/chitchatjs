import { BaseCommand } from './base';
import * as yargs from 'yargs';
export declare class BuildCommand implements BaseCommand {
    setOptions(yargs: yargs.Argv): void;
    execute(argv: any): void;
}
