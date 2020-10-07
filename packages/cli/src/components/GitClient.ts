import * as shell from "shelljs";

export class GitClient {
    clone(url: string, dirName: string) {
        shell.exec(`git clone ${url} ${dirName}`);
        shell.rm("-rf", `${dirName}/.git`);
    }
}
