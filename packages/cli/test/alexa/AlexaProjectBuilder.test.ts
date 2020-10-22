import "mocha";

import { expect } from "chai";
import * as sinon from "sinon";

import { AlexaProjectBuilder } from "../../src/alexa/AlexaProjectBuilder";
import { SkillBuilder } from "../../src/alexa/SkillBuilder";
import { ProjectWriter } from "../../src/components/ProjectWriter";
import { ProjectConfig } from "../../src/types";

const projectConfig: ProjectConfig = {
  outDir: "/fake",
  target: "Alexa",
};

describe("AlexaProjectBuilder", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should build successfully", () => {
    let pb = new AlexaProjectBuilder();
    let sb = new SkillBuilder();
    let pw = new ProjectWriter();

    let loadProject = sinon.stub(pb, "loadProject").callsFake(() => {
      return JSON.parse("{}");
    });
    let build = sinon.stub(sb, "build").callsFake(() => {
      return JSON.parse("{}");
    });
    let writeProject = sinon.stub(pw, "writeProject").callsFake(() => {});

    pb.skillBuilder = sb;
    pb.projectWriter = pw;

    pb.build(projectConfig);

    expect(loadProject.callCount).equals(1);
    expect(JSON.stringify(loadProject.args[0][0])).equals(JSON.stringify(projectConfig));
    expect(build.callCount).equals(1);
    expect(writeProject.callCount).equals(1);
  });
});
