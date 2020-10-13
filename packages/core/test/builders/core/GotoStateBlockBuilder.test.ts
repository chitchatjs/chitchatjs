import { GotoStateBlockBuilder } from "../../../src/builders/core/GotoStateBlockBuilder";
import { Block, BuilderContext, DialogContext, Event } from "../../../src/models";
import { expect } from "chai";

const mockBlock: Block<BuilderContext, DialogContext, Event> = {
    build: () => {},
    execute: () => {},
};

describe("GotoStateBlockBuilder", () => {
    it("should throw an error if state name is not provided", async () => {
        let err: Error = new Error();
        try {
            let b = new GotoStateBlockBuilder();
            await b.build();
        } catch (e) {
            err = e;
        }

        expect(err.message).to.be.equal("name is a required field");
    });
});
