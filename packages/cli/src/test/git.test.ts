import { GitClient } from "../components/GitClient";

import { expect } from "chai";
import "mocha";
import * as fs from "fs";
import * as shell from "shelljs";

describe("GitClient", () => {
    it("should clone successfully", () => {
        let testDir = "/tmp/cjs-git-client-test";
        try {
            shell.rm("-rf", testDir);

            new GitClient().clone(
                "https://github.com/chitchatjs/hello-bot-template.git",
                testDir
            );

            let projectExists = fs.existsSync(testDir);
            let projectGitExists = fs.existsSync(testDir + "/.git");

            expect(projectExists).to.equal(true);
            expect(projectGitExists).to.equal(false);
        } finally {
            // Remove the directory after done
            shell.rm("-rf", testDir);
        }
    });
});
