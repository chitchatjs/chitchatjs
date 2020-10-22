import "mocha";

import { expect } from "chai";
import { program } from "commander";

import { RootCommand } from "../../src/commands/root";

describe("RootCommand", () => {
  it("should return correct program", () => {
    let rc = new RootCommand();
    rc.register(program);

    expect(program).not.be.undefined;
  });
});
