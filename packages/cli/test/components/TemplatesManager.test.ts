import "mocha";

import { expect } from "chai";
import * as sinon from "sinon";

import { TemplatesManager } from "../../src/components/TemplatesManager";
import { CliConfig } from "../../src/types";

const configWithTwoTemplates: CliConfig = {
  version: "1.0",
  templates: [
    {
      name: "test-name-1",
      url: {
        type: "GIT",
        value: "http://test-name-1",
      },
    },
    {
      name: "test-name-2",
      url: {
        type: "GIT",
        value: "http://test-name-2",
      },
    },
  ],
};

const configWithDuplicateTemplates: CliConfig = {
  version: "1.0",
  templates: [
    {
      name: "test-name-1",
      url: {
        type: "GIT",
        value: "http://test-name-1",
      },
    },
    {
      name: "test-name-1",
      url: {
        type: "GIT",
        value: "http://test-name-1",
      },
    },
  ],
};

describe("TemplatesManager", () => {
  describe("getTemplateNames()", () => {
    it("should return valid names", () => {
      let tm = new TemplatesManager();

      let names = tm.getTemplateNames(configWithTwoTemplates);

      expect(names.length).equals(2);
      expect(names[0]).equals("test-name-1");
      expect(names[1]).equals("test-name-2");
    });
  });

  describe("getTemplateByName()", () => {
    it("should return valid template by name", () => {
      let tm = new TemplatesManager();

      let t = tm.getTemplateByName(configWithTwoTemplates, "test-name-1");

      expect(t).is.not.undefined;
      expect(t.name).equals("test-name-1");
      expect(t.url.value).equals("http://test-name-1");
    });

    it("should throw error for invalid name", () => {
      let tm = new TemplatesManager();

      let error: Error | undefined = undefined;
      try {
        let t = tm.getTemplateByName(configWithTwoTemplates, "invalid-name");
        console.log(t);
      } catch (err) {
        error = err;
      }
      expect(error).is.not.undefined;
      expect(error?.message).eq(
        "No templates defined in the cli configuration. Update the configuration and add the template."
      );
    });

    it("should throw error for more than one name matches", () => {
      let tm = new TemplatesManager();

      let error: Error | undefined = undefined;
      try {
        let t = tm.getTemplateByName(configWithDuplicateTemplates, "test-name-1");
        console.log(t);
      } catch (err) {
        error = err;
      }
      expect(error).is.not.undefined;
      expect(error?.message).eq(
        "Templates can not have same name in the cli configurations. Fix the configuration by updating template names accordingly."
      );
    });
  });
});
