import { CustomBlockBuilder } from "../../../src/blocks/builders/CustomBlockBuilder";
import * as _ from "lodash";
import { expect } from "chai";
import "mocha";
import { AlexaBuilderContext, AlexaDialogContext, AlexaEvent } from "../../../src/models";
import { Directive, ResponseEnvelope } from "ask-sdk-model";
import { launchRequest } from "../../data/launchRequest";
import { Resources } from "@chitchatjs/core";

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

describe("CustomBlockBuilderTest", () => {
  it("should execute executor", async () => {
    let b = new CustomBlockBuilder()
      .executor((c: AlexaDialogContext, e: AlexaEvent) => {
        c.currentResponse.response.shouldEndSession = true;
        return c.currentResponse.response;
      })
      .build();

    b.execute(context, event);

    expect(context.currentResponse.response.shouldEndSession).to.be.true;
  });

  it("should execute builder", async () => {
    let b = new CustomBlockBuilder()
      .builder(
        (context: AlexaBuilderContext): Resources => {
          return <Resources>{
            resourceMap: {
              "/skill.json": "dummy-skill-manifest",
            },
          };
        }
      )
      .build();
    b.build(builderContext);

    expect(builderContext.resources.resourceMap["/skill.json"]).equals("dummy-skill-manifest");
  });

  it("should execute blank builder and executor if not specified", () => {
    let b = new CustomBlockBuilder().build();
    b.build(builderContext);
    b.execute(context, event);
  });
});
