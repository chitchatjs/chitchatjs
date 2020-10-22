import { AgentBuilder } from "../../src/builders/AgentBuilder";
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
const mockState2: State<BuilderContext, DialogContext, Event> = {
  type: "State",
  name: "mock-state2",
  block: {
    build: () => {},
    execute: () => {},
  },
};

describe("AgentBuilder", () => {
  it("should throw validation error if missing states", async () => {
    let err: Error = new Error();
    try {
      let ab = new AgentBuilder();
      await ab.build();
    } catch (e) {
      err = e;
    }
    expect(err.message).to.be.equal("states is a required field");
  });

  it("should successfully build agent with one state", async () => {
    let agent = await new AgentBuilder().addState(mockState).build();

    expect(agent, "agent is null").to.not.be.null;
    expect(agent.states, "states is null").to.not.be.null;
    expect(Object.keys(agent.states).length, "states length is not 1").to.be.equal(1);
  });

  it("should successfully build agent with multiple states", async () => {
    let agent = await new AgentBuilder().addAllStates([mockState, mockState2]).build();

    expect(agent, "agent is null").to.not.be.null;
    expect(agent.states, "states is null").to.not.be.null;
    expect(Object.keys(agent.states).length, "states length is not 2").to.be.equal(2);
  });
});
