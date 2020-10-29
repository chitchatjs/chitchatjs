# `@chitchatjs/plugin-ax-session`

Chitchat.js plugin for managing Alexa Skill session using @chitchatjs/alexa.

<strong>🤖 Chitchat.js is a JavaScript framework for building voice user interfaces for Alexa Skills. </strong> | <a href="https://chitchat.js.org">📄 Read the documentation </a>

<br/>

**Get in touch**

[![gitter](https://badges.gitter.im/chitchat-js/community.png)](https://gitter.im/chitchat-js/community)

## Usage

```ts
import { session } from "@chitchatjs/plugin-ax-session";

// say hello and end the session
ax.compound()
  .add(ax.say("Hello this is a sample message, good bye!"))
  .add(session.end(true))
  .build();
```
