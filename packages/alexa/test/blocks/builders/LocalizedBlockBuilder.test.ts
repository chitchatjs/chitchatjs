import { LocalizedBlockBuilder } from "../../../src/blocks/builders/LocalizedBlockBuilder";
import * as _ from "lodash";
import { expect } from "chai";
import "mocha";
import { AlexaBlock, AlexaBuilderContext, AlexaDialogContext, AlexaEvent, Locale } from "../../../src/models";

let mockBlock: AlexaBlock = {
    build: () => {},
    execute: () => {},
};

describe("LocalizedBlockBuilder", () => {
    it("should throw validation error if block is missing", async () => {
        let err: Error = new Error();
        try {
            let ab = new LocalizedBlockBuilder([Locale.en_US]);
            await ab.build();
        } catch (e) {
            err = e;
        }
        expect(err.message).to.be.equal("LocalizedBlock must not have an undefined block in it.");
    });

    it("should successfully build localized block with one block", async () => {
        let l = await new LocalizedBlockBuilder([Locale.en_US]).block(mockBlock).build();

        expect(l).to.not.be.undefined;
        expect(l.block).to.not.be.undefined;
        expect(l.locales).to.not.be.undefined;
        expect(l.locales.length).to.be.equal(1);
        expect(l.locales[0]).equals(Locale.en_US);
    });

    it("should update the builder context and invoke the block.builder() when build() is invoked", async () => {
        let builderContext: AlexaBuilderContext = { resources: { resourceMap: {} } };
        let contextInsideBlock: AlexaBuilderContext = { resources: { resourceMap: {} } };
        let blockBuilderInvoked = false;
        let block: AlexaBlock = {
            build: (context: AlexaBuilderContext) => {
                contextInsideBlock = _.cloneDeep(context);
                blockBuilderInvoked = true;
            },
            execute: () => {},
        };

        let lb = new LocalizedBlockBuilder([Locale.en_US]);
        let l = await lb.block(block).build();

        l.build(builderContext);

        expect(builderContext).to.not.be.undefined;
        expect(builderContext.currentLocales).to.not.be.undefined;
        if (builderContext.currentLocales) {
            expect(builderContext.currentLocales.length).to.be.equal(0);
        }

        expect(blockBuilderInvoked).to.be.true;
        expect(contextInsideBlock).to.not.be.undefined;
        if (contextInsideBlock !== undefined) {
            expect(contextInsideBlock.currentLocales).to.not.be.undefined;
            if (contextInsideBlock.currentLocales) {
                expect(contextInsideBlock.currentLocales.length).to.be.equal(1);
                expect(contextInsideBlock.currentLocales[0]).to.be.equal(Locale.en_US);
            }
        }
    });

    it("should execute the block when execute() is invoked", async () => {
        let dialogContext: AlexaDialogContext = JSON.parse("{}");
        let event: AlexaEvent = JSON.parse("{}");

        let blockExecutorInvoked = false;
        let block: AlexaBlock = {
            build: () => {},
            execute: () => {
                blockExecutorInvoked = true;
            },
        };

        let lb = new LocalizedBlockBuilder([Locale.en_US]);
        let l = await lb.block(block).build();

        l.execute(dialogContext, event);

        expect(blockExecutorInvoked).to.be.true;
    });
});
