import { DirectiveBlockBuilder } from "../../../src/blocks/builders/DirectiveBlockBuilder";
import * as _ from "lodash";
import { expect } from "chai";
import "mocha";
import { AlexaBuilderContext, AlexaDialogContext, AlexaEvent } from "../../../src/models";
import { Directive, ResponseEnvelope } from "ask-sdk-model";
import { launchRequest } from "../../data/launchRequest";

const context: AlexaDialogContext = {
  currentResponse: {
    version: "1.0",
    response: {},
  },
  platformState: {
    currentStateName: "",
    globalState: {},
  },
};
const builderContext: AlexaBuilderContext = {
  resources: { resourceMap: {} },
};
const event: AlexaEvent = {
  currentRequest: launchRequest,
};
const audioPlayerPlayDirective: Directive = {
  type: "AudioPlayer.Play",
  audioItem: {
    stream: {
      url: "https://example.com/audiostream",
      token: "token",
      offsetInMilliseconds: 0,
    },
  },
};

const audioPlayerStopDirective: Directive = {
  type: "AudioPlayer.Stop",
};

describe("DirectiveBlockBuilder", () => {
  it("should add directive when no directives are present in the response", async () => {
    let b = new DirectiveBlockBuilder(audioPlayerPlayDirective).build();
    b.execute(context, event);
    containsDirective(context.currentResponse, audioPlayerPlayDirective);
  });

  it("should add directive when directives are present in the response", async () => {
    let c = _.cloneDeep(context);
    c.currentResponse.response.directives = [];
    c.currentResponse.response.directives.push(audioPlayerStopDirective);

    let b = new DirectiveBlockBuilder(audioPlayerPlayDirective).build();
    b.execute(c, event);
    containsDirective(c.currentResponse, audioPlayerPlayDirective);
    containsDirective(c.currentResponse, audioPlayerStopDirective);
  });

  it("should execute builder()", async () => {
    let b = new DirectiveBlockBuilder(audioPlayerStopDirective).build();
    let bc = _.cloneDeep(builderContext);
    b.build(bc);

    expect(_.isEqual(builderContext, bc)).to.be.true;
  });
});

function containsDirective(response: ResponseEnvelope, directive: Directive) {
  let dirs = response.response.directives || [];

  for (let d in dirs) {
    if (_.isEqual(dirs[d], directive)) {
      return true;
    }
  }
  return false;
}
