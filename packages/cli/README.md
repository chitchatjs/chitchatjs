# `@chitchatjs/cli`

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

## Demo

![](./images/gifs/create-project.gif)

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
# then choose a starting template
cjs new
```

**3. Build the project**

```sh
# tsc only if it is a typescript project
tsc && cjs build
```

**4. Deploy**

```sh
cjs deploy
```

**5. And test..**

You can either go to [Alexa Developer Console](https://developer.amazon.com) and open your skill and then go to the test tab.
Or you can use [ask dialog command](https://developer.amazon.com/en-US/docs/alexa/smapi/ask-cli-command-reference.html#dialog-command) to test your dialog in CLI itself.

```sh
cd pkg
ask dialog --l en-US

U> open my skill
A> hello world!
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
