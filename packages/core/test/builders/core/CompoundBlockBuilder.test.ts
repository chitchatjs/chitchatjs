import { CompoundBlockBuilder } from "../../../src/builders/core/CompoundBlockBuilder";
import { Block, BuilderContext, DialogContext, Event } from "../../../src/models";
import { expect } from "chai";

const mockBlock: Block<BuilderContext, DialogContext, Event> = {
    build: () => {},
    execute: () => {},
};

describe("CompoundBlockBuilder", () => {
    it("should return empty block if not passed", async () => {
        let cb = new CompoundBlockBuilder();
        let c = await cb.build();

        expect(c).is.not.null;
        expect(c.blocks).is.not.null;
        expect(c.blocks.length).is.equal(0);
    });

    it("should add block if passed", async () => {
        let cb = new CompoundBlockBuilder();
        cb.add(mockBlock);
        let c = await cb.build();

        expect(c).is.not.null;
        expect(c.blocks).is.not.null;
        expect(c.blocks.length).is.equal(1);
    });

    describe(".execute() and .build()", () => {
        it("should execute and build the block correctly", async () => {
            let cb = new CompoundBlockBuilder();
            let executeInvoked: boolean = false;
            let buildInvoked: boolean = false;
            let sampleBlock = {
                build: () => {
                    buildInvoked = true;
                },
                execute: () => {
                    executeInvoked = true;
                },
            };

            cb.add(sampleBlock);
            let c = await cb.build();

            await c.execute({ platformState: { currentStateName: "", globalState: {} } }, {});
            await c.build({ resources: { resourceMap: {} } });

            expect(c).is.not.null;
            expect(c.blocks).is.not.null;
            expect(c.blocks.length).is.equal(1);
            expect(executeInvoked).is.true;
            expect(buildInvoked).is.true;
        });
    });
});
