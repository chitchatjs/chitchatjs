import { execSync, ExecSyncOptions } from "child_process";
import { logger } from "./Logger";

export class GitClient {
  clone(url: string, dirName: string) {
    let cmd = `git clone ${url} ${dirName}`;
    logger.debug(cmd);
    this._exec(cmd, {
      windowsHide: true,
      stdio: "inherit",
      cwd: process.cwd(),
    });
  }

  _exec(cmd: string, options: ExecSyncOptions) {
    execSync(cmd, options);
  }
}
