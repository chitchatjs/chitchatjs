import { Config, ConfigReader } from "../components/ConfigReader";

import { expect } from "chai";
import "mocha";
import * as fs from "fs";
import * as shell from "shelljs";
import * as path from "path";
import * as os from "os";

describe("ConfigReader#read", () => {
    it("should read successfully when config is not present on disk and configDir is set explicitly", () => {
        let testDir = path.join(os.homedir(), ".cjs/");

        console.log(testDir);
        console.log(process.cwd());
        try {
            shell.rm("-rf", testDir);

            let cfg: Config = new ConfigReader().read(testDir);

            console.log(cfg);
            let cfgExistsOnDisk = fs.existsSync(
                path.join(testDir, "config.json")
            );

            expect(cfg !== undefined).to.equal(true);
            expect(cfgExistsOnDisk).to.be.equal(true);
        } finally {
            // Remove the directory after done
            shell.rm("-rf", testDir);
        }
    });
});
