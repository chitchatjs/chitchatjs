# `@chitchatjs/alexa`

![](./images/logo/logo-128x128.png)

<strong>🤖 JavaScript framework for building voice user interfaces for Alexa Skills. </strong> | <a href="https://chitchat.js.org">📄 Read the documentation </a>

| Package                                                              | NPM                                                                                                                  | Build                                                                                                                                            |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [@chitchatjs/cli](https://www.npmjs.com/package/@chitchatjs/cli)     | [![npm version](https://badge.fury.io/js/%40chitchatjs%2Fcli.svg)](https://badge.fury.io/js/%40chitchatjs%2Fcli)     | [![Build Status](https://github.com/chitchatjs/chitchatjs/workflows/build-workflow/badge.svg)](https://github.com/chitchatjs/chitchatjs/actions) |
| [@chitchatjs/alexa](https://www.npmjs.com/package/@chitchatjs/alexa) | [![npm version](https://badge.fury.io/js/%40chitchatjs%2Falexa.svg)](https://badge.fury.io/js/%40chitchatjs%2Falexa) | [![Build Status](https://github.com/chitchatjs/chitchatjs/workflows/build-workflow/badge.svg)](https://github.com/chitchatjs/chitchatjs/actions) |
| [@chitchatjs/core](https://www.npmjs.com/package/@chitchatjs/core)   | [![npm version](https://badge.fury.io/js/%40chitchatjs%2Fcore.svg)](https://badge.fury.io/js/%40chitchatjs%2Fcore)   | [![Build Status](https://github.com/chitchatjs/chitchatjs/workflows/build-workflow/badge.svg)](https://github.com/chitchatjs/chitchatjs/actions) |

<br/>

**Get in touch**

[![gitter](https://badges.gitter.im/chitchat-js/community.png)](https://gitter.im/chitchat-js/community)

## Prerequisites

Chitchat requires the following dependencies:

- Node.js
- [ASK CLI (configured)](https://www.npmjs.com/package/ask-cli)
- [Chitchatjs CLI](https://www.npmjs.com/package/@chitchatjs/cli)

## Installation

```sh
npm i @chitchatjs/alexa --save
```

## Writing a simple skill

To get started, simply write this in your index.ts

```ts
import { ax } from "@chitchatjs/alexa";

let state = ax.start().block(ax.say("Hello world")).build();

// create our skill using the state above
let skill = ax.skill().addState(state).build();
exports = ax.dialogManager(skill).exports();
```

Output:

```
U: open <skill-name>
A: Hello world
```

Let's add a dialog turn to ask user their name:

```ts
let state = ax
  .start()
  .block(
    ax
      .compound()
      .add(ax.whenLaunch().then(ax.ask("Hello, what is your name?").build()).build())
      .add(
        ax
          .whenUserSays(["my name is {name}"])
          .withSlotType("name", builtins.SlotType.FirstName)
          .then(ax.say("Welcome, {name}! It's nice to talk to you."))
          .build()
      )
      .build()
  )
  .build();
```

Output:

```
U: open <skill name>
A: Hello, what is your name?
U: my name is kevindra
A: Welcome, kevindra! It's nice to talk to you.
```

Build and deploy using ChitchatJS CLI:

```sh
> tsc
> cjs build
> cjs deploy
```

That's it!

## Deploy to your stack using code

Wrap this in your stack module and deploy as code:

```ts
const handler = ax.dialogManager(skill).handler();
```

### AWS Lambda

```ts
import { Function, Runtime, AssetCode, Code } from "@aws-cdk/aws-lambda";

// ...
this.lambdaFunction = new Function(this, props.functionName, {
  functionName: props.functionName,
  handler: "handler.handler",
  runtime: Runtime.NODEJS_10_X,
  code: new AssetCode(`./src`), // points to your skill module
  memorySize: 512,
  timeout: Duration.seconds(10),
});
```

### Express JS

```ts
import * as express from "express";
import skill from "./src/skill";

const app = express();
const port = 3000;

app.get("/", skill.express());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
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
5. [Workout Buddy](https://github.com/chitchatjs/workout-buddy)

**Plugins**

1. [@chitchatjs/plugin-ax-common](https://www.npmjs.com/package/@chitchatjs/plugin-ax-common)
2. [@chitchatjs/plugin-ax-session](https://www.npmjs.com/package/@chitchatjs/plugin-ax-session)
3. [@chitchatjs/plugin-ax-display](https://www.npmjs.com/package/@chitchatjs/plugin-ax-display)
4. [@chitchatjs/plugin-ax-card](https://www.npmjs.com/package/@chitchatjs/plugin-ax-display)

Check the official documentation of available building blocks and much more here - https://chitchat.js.org/
