import { execSync } from "child_process";
import { logger } from "./Logger";

export class GitClient {
  clone(url: string, dirName: string) {
    let cmd = `git clone ${url} ${dirName}`;
    logger.debug(cmd);
    execSync(cmd, {
      windowsHide: true,
      stdio: "inherit",
      cwd: process.cwd(),
    });
  }
}
