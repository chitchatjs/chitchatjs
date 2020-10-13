import { StateBuilder } from "../../src/builders/StateBuilder";
import { Block, BuilderContext, DialogContext, Event, State } from "../../src/models";
import { expect } from "chai";
import "mocha";
import { exec } from "child_process";

const stateName = "foo-state";
const block: Block<BuilderContext, DialogContext, Event> = {
    build: () => {},
    execute: () => {},
};
describe("StateBuilder", () => {
    it("should succeed if state name and block is provided", async () => {
        let sb = new StateBuilder(stateName);
        let state = await sb.block(block).build();

        expect(state).is.not.null;
        expect(state.name).is.equal(stateName);
        expect(state.block).is.equal(block);
    });

    describe(".block", () => {
        it("should throw validation error if block is missing", async () => {
            let err: Error = new Error();
            try {
                let sb = new StateBuilder(stateName);
                await sb.build();
            } catch (e) {
                err = e;
            }
            expect(err.message).to.be.equal("block is a required field in the state");
        });
    });

    describe(".name", () => {
        it("should throw validation error if state name is empty", async () => {
            let err: Error = new Error();
            try {
                let sb = new StateBuilder("");
                await sb.block({ build: () => {}, execute: () => {} }).build();
            } catch (e) {
                err = e;
            }

            expect(err.message).to.be.equal("name is a required field");
        });
    });
});
