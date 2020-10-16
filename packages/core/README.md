# `chitchat.js core library`

![](./images/logo/logo-128x128.png)

Chitchat (or CJS) is a framework for building voice driven multi-modal user interfaces (a.k.a. VUI). Chitchat is designed to be incrementally adaptable. You can write a simple rule based voice user interface or as complex as a machine learnt model based VUI. Chitchat comes with three primary components - core library (`@chichatjs/core`), a CLI (`@chitchatjs/cli`) and the implementation strategies (dialog management) which may or may not be platform dependent. We offer `@chitchatjs/alexa` to seamlessly integrate your voice user interface with Alexa.

`@chichatjs/core` is a primitive base that defines core framework premitives that are voice-platform and dialog management strategy agnostic. `@chitchatjs/cli` provides an easy command access to create a project, build and deploy it (only supported for Alexa platform right now). `@chitchatjs/alexa` is a collection of VUI components designed on top of the core library specifically for Alexa Skill development.

## Installation

```sh
npm i -g @chitchatjs/cli
```

## Creating a new project

```sh
cjs new # then choose a starting template
```

## Build the project

```sh
tsc && cjs build # tsc only if it is a typescript project
```

## Deploy

```sh
cjs deploy
```

## And test..

You can either go to [Alexa Developer Console](https://developer.amazon.com) and open your skill and then go to the test tab.
Or you can use [ask dialog command](https://developer.amazon.com/en-US/docs/alexa/smapi/ask-cli-command-reference.html#dialog-command) to test your dialog in CLI itself.

```sh
ask dialog --skill-id <skill-id> --locale en-US --state development

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

## Or build and share a new Block and publish it on NPM

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

## Now code for our skill will look like

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

## Other Packages

1. [chitchat.js alexa library](https://www.npmjs.com/package/@chitchatjs/alexa)
2. [chitchat.js cli](https://www.npmjs.com/package/@chitchatjs/cli)

**Sample Skills**

1. [Hello bot](https://github.com/chitchatjs/hello-bot-template)
2. [Dog Matcher](https://github.com/chitchatjs/pet-match-template)
3. [High log game](https://github.com/chitchatjs/high-low-game)
4. [Coffee shop](https://github.com/chitchatjs/coffee-shop)

Check the official documentation of available Blocks and much more here - https://chitchat.js.org/
