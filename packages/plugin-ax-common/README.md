# `@chitchatjs/plugin-ax-common`

Chitchat.js platform developed plugin package for common builing blocks to build alexa skills.

![](./images/logo/logo-128x128.png)

<strong>🤖 Chitchat.js is a JavaScript framework for building voice user interfaces for Alexa Skills. </strong> | <a href="https://chitchat.js.org">📄 Read the documentation </a>

**Get in touch**

[![gitter](https://badges.gitter.im/chitchat-js/community.png)](https://gitter.im/chitchat-js/community)

## Usage

```ts
import { ax } from "@chitchatjs/alexa";
import { common } from "@chitchatjs/plugin-ax-common";

ax.compound()
  .add(ax.whenLaunch().then(ax.say("Hello world!")).build())
  .add(common.defaultHandlers()) // automatically add help, stop, fallback handlers
  .build();
```

or customize

```ts
common.defaultHandlers({
  help: ax
    .ask("You can ask me a number, I will say that number back.")
    .reprompt("What is your number?")
    .build(),
});
```
