import "mocha";

import { logger } from "../../src/components/Logger";

describe("Logger", () => {
  it("all methods", () => {
    logger.silly("");
    logger.info("");
    logger.success("");
    logger.debug("");
    logger.error("");
    logger.tip("");
  });
});
