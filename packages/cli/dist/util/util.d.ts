import ora = require("ora");
export declare let DEV_WORKING_DIRECTORY: string;
export declare let startSpinner: (text: string) => ora.Ora;
export declare let buildBanner: (text: string) => string;
export interface Logger {
    info(text: string): void;
    warn(text: string): void;
    error(text: string, error?: Error): void;
    logObject(obj: any): void;
    errorAndExit(text: string): void;
    success(text: string): void;
}
export declare let logger: Logger;
export declare enum ErrorMessage {
    EMPTY_DIALOG_SET = "DialogSet seems to be empty."
}
