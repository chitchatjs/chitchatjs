import { alexa as ax } from "../src/blocks";
import { expect } from "chai";
import "mocha";
import { Locale } from "../src/models";

describe("blocks.index", () => {
    it("should return a valid localized builder", async () => {
        let lb = ax.localize([Locale.en_US]);
        expect(lb).to.not.be.null;
    });
});
