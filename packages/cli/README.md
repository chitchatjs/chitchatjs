# `chitchat.js command line interface (cli)`

![](./images/logo/logo-128x128.png)

<strong>🤖 JavaScript framework for building voice user interfaces. </strong> | <a href="https://chitchat.js.org">📄 Read the documentation </a>

| Package                                                              | NPM                                                                                                                  | Build                                                                                                                                                                                                                                                                                                                 |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@chitchatjs/cli](https://www.npmjs.com/package/@chitchatjs/cli)     | [![npm version](https://badge.fury.io/js/%40chitchatjs%2Fcli.svg)](https://badge.fury.io/js/%40chitchatjs%2Fcli)     | ![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoicSt5K3NIM0xCa0pkVXNnb2p5TzJqODFzbFA0djNhNTY2eWFRVkhMSkNYVEhjSW9ETGZONldNdlNsWjA5WkRoS1VlZ1ZyeDArN1F0bStDWnZweEtEQTdvPSIsIml2UGFyYW1ldGVyU3BlYyI6IldhZlNpZUttSUlYSlBVY3ciLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=main) |
| [@chitchatjs/alexa](https://www.npmjs.com/package/@chitchatjs/alexa) | [![npm version](https://badge.fury.io/js/%40chitchatjs%2Falexa.svg)](https://badge.fury.io/js/%40chitchatjs%2Falexa) | ![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoicSt5K3NIM0xCa0pkVXNnb2p5TzJqODFzbFA0djNhNTY2eWFRVkhMSkNYVEhjSW9ETGZONldNdlNsWjA5WkRoS1VlZ1ZyeDArN1F0bStDWnZweEtEQTdvPSIsIml2UGFyYW1ldGVyU3BlYyI6IldhZlNpZUttSUlYSlBVY3ciLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=main) |
| [@chitchatjs/core](https://www.npmjs.com/package/@chitchatjs/core)   | [![npm version](https://badge.fury.io/js/%40chitchatjs%2Fcore.svg)](https://badge.fury.io/js/%40chitchatjs%2Fcore)   | ![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoicSt5K3NIM0xCa0pkVXNnb2p5TzJqODFzbFA0djNhNTY2eWFRVkhMSkNYVEhjSW9ETGZONldNdlNsWjA5WkRoS1VlZ1ZyeDArN1F0bStDWnZweEtEQTdvPSIsIml2UGFyYW1ldGVyU3BlYyI6IldhZlNpZUttSUlYSlBVY3ciLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=main) |

<br/>

**Get in touch**

[![gitter](https://badges.gitter.im/chitchat-js/community.png)](https://gitter.im/chitchat-js/community)

## What is chitchat.js? <Badge text="beta" />

Chitchat (or CJS) is a framework for building voice driven multi-modal user interfaces (a.k.a. VUI). Chitchat is designed to be incrementally adaptable. You can write a simple rule based voice user interface or as complex as a machine learnt model based VUI. Chitchat comes with three primary components - core library (`@chichatjs/core`), a CLI (`@chitchatjs/cli`) and the implementation strategies (dialog management) which may or may not be platform dependent. We offer `@chitchatjs/alexa` to seamlessly integrate your voice user interface with Alexa.

`@chichatjs/core` is a primitive base that defines core framework premitives that are voice-platform and dialog management strategy agnostic. `@chitchatjs/cli` provides an easy command access to create a project, build and deploy it (only supported for Alexa platform right now). `@chitchatjs/alexa` is a collection of VUI components designed on top of the core library specifically for Alexa Skill development.

## Prerequisites

Chitchat requires the following dependencies:

- Node.js
- [ASK CLI (configured)](https://www.npmjs.com/package/ask-cli)

## Quick Start

**1. Installation**

```sh
npm i -g @chitchatjs/cli
```

**2. Creating a new project**

```sh
cjs new # then choose a starting template
```

**3. Build the project**

```sh
tsc && cjs build # tsc only if it is a typescript project
```

**4. Deploy**

```sh
cjs deploy
```

**5. And test..**

You can either go to [Alexa Developer Console](https://developer.amazon.com) and open your skill and then go to the test tab.
Or you can use [ask dialog command](https://developer.amazon.com/en-US/docs/alexa/smapi/ask-cli-command-reference.html#dialog-command) to test your dialog in CLI itself.

```sh
ask dialog --skill-id <skill-id> --locale en-US --stage development

U> open my skill
A> hello world!
```

## Writing a basic skill

To get started, simply write this in your index.ts

```ts
import { alexa as ax } from "@chitchatjs/alexa";

let skill = ax.start().block(ax.say("Hello world")).build();
exports = ax.dialogManager(skill).exports();
```

Or may be ask user their name and greet them:

```ts
import { alexa as ax } from "@chitchatjs/alexa";

let skill = ax
  .start()
  .block(
    ax
      .compound()
      .add(ax.ask("Hello, what is your name?").build()) // welcome message
      .add(ax.goto("AskName")) // move to the AskName state
      .build()
  )
  .build();

let askName = ax
  .state("AskName")
  .block(
    ax
      .whenUserSays(["my name is {name}", "{name}", "name is {name}"])
      .withSlotType("name", "AMAZON.FirstName")
      .then(ax.say("Welcome, {name}! It's nice to talk to you."))
      .build()
  )
  .build();

exports = ax.dialogManager(skill).exports();
```

## Writing a reusable Block

A block for greeting with name, that we implemented above in our skill.

```ts
import { alexa as ax } from "@chitchatjs/alexa";

export namespace greetings {
  export let greetWithName = () => {
    return ax
      .whenUserSays(["my name is {name}", "{name}", "name is {name}"])
      .withSlotType("name", "AMAZON.FirstName")
      .then(ax.say("Welcome, {name}! It's nice to talk to you."))
      .build();
  };
}
```

Now, we can download and use this block in our skill:

```sh
npm i cjs-greetings --save # assuming we name package as "cjs-greetings"
```

```ts
import { alexa as ax } from "@chitchatjs/alexa";
import { greetings as g } from "cjs-greetings";

let skill = ax
  .start()
  .block(
    ax
      .compound()
      .add(ax.ask("Hello, what is your name?").build()) // welcome message
      .add(ax.goto("AskName")) // move to the AskName state
      .build()
  )
  .build();

let askName = ax
  .state("AskName")
  .block(g.greetWithName()) // use the block from "cjs-greetings" package.
  .build();

exports = ax.dialogManager(skill).exports();
```

## Packages

1. [chitchat.js core library](https://www.npmjs.com/package/@chitchatjs/core)
2. [chitchat.js alexa library](https://www.npmjs.com/package/@chitchatjs/alexa)
3. [chitchat.js cli](https://www.npmjs.com/package/@chitchatjs/cli)

**Sample Skills**

1. [Hello bot](https://github.com/chitchatjs/hello-bot-template)
2. [Dog Matcher](https://github.com/chitchatjs/pet-match-template)
3. [High log game](https://github.com/chitchatjs/high-low-game)
4. [Coffee shop](https://github.com/chitchatjs/coffee-shop)

Check the official documentation of available Blocks and much more here - https://chitchat.js.org/
