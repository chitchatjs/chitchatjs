# `@chitchatjs/plugin-ax-card`

Chitchat.js platform developed plugin package for displaying Card in alexa skills.

For information about how cards work in Alexa Skills, go to : https://developer.amazon.com/en-US/docs/alexa/custom-skills/request-and-response-json-reference.html#card-object

<strong>🤖 Chitchat.js is a JavaScript framework for building voice user interfaces for Alexa Skills. </strong> | <a href="https://chitchat.js.org">📄 Read the documentation </a>

**Platform Packages**
| Package | NPM | Build |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [@chitchatjs/cli](https://www.npmjs.com/package/@chitchatjs/cli) | [![npm version](https://badge.fury.io/js/%40chitchatjs%2Fcli.svg)](https://badge.fury.io/js/%40chitchatjs%2Fcli) | [![Build Status](https://github.com/chitchatjs/chitchatjs/workflows/build-workflow/badge.svg)](https://github.com/chitchatjs/chitchatjs/actions) |
| [@chitchatjs/alexa](https://www.npmjs.com/package/@chitchatjs/alexa) | [![npm version](https://badge.fury.io/js/%40chitchatjs%2Falexa.svg)](https://badge.fury.io/js/%40chitchatjs%2Falexa) | [![Build Status](https://github.com/chitchatjs/chitchatjs/workflows/build-workflow/badge.svg)](https://github.com/chitchatjs/chitchatjs/actions) |
| [@chitchatjs/core](https://www.npmjs.com/package/@chitchatjs/core) | [![npm version](https://badge.fury.io/js/%40chitchatjs%2Fcore.svg)](https://badge.fury.io/js/%40chitchatjs%2Fcore) | [![Build Status](https://github.com/chitchatjs/chitchatjs/workflows/build-workflow/badge.svg)](https://github.com/chitchatjs/chitchatjs/actions) |

<br/>

**Get in touch**

[![gitter](https://badges.gitter.im/chitchat-js/community.png)](https://gitter.im/chitchat-js/community)

## Installation

```sh
npm i @chitchatjs/plugin-ax-card
```

## Usage

```ts
import { ax } from "@chitchatjs/alexa";
import { card } from "@chitchatjs/plugin-ax-card";

// a simple card
card.simple("Hello world", "Hi there!");

// a standard card
card.standard(
  "Hello world",
  "Hi there!",
  "https://foo.bar/smallImage.png",
  "https://foo.bar/largeImage.png"
);

// Link account card
card.linkAccount();

// Permission card
card.askPermissions([card.Permission.ListRead, card.Permission.ListWrite]);
```

Simply plugin the card building block into your skill anywhere:

```ts
ax.whenLaunch()
  .then(
    ax
      .compound()
      .add(ax.ask("Welcome, please provide permissions to read your lists.").build())
      .add(card.askPermissions([card.Permission.ListRead]))
      .build()
  )
  .build();
```
