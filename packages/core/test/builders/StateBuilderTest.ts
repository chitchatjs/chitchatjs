import { StateBuilder } from "../../src/builders/StateBuilder";
import { BuilderContext, DialogContext, Event, State } from "../../src/models";
import { expect } from "chai";
import "mocha";

const mockState: State<BuilderContext, DialogContext, Event> = {
    type: "State",
    name: "mock-state",
    block: {
        build: () => {},
        execute: () => {},
    },
};

describe("StateBuilder", () => {
    describe(".block", () => {
        it("should throw validation error if block is missing", async () => {
            let err: Error = new Error();
            try {
                let sb = new StateBuilder("foo-state");
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
