# `@chitchatjs/plugin-ax-session`

Chitchat.js display utilties for manage session easily. @chitchatjs/alexa.

<strong>🤖 Chitchat.js is a JavaScript framework for building voice user interfaces for Alexa Skills. </strong> | <a href="https://chitchat.js.org">📄 Read the documentation </a>

**Get in touch**

[![gitter](https://badges.gitter.im/chitchat-js/community.png)](https://gitter.im/chitchat-js/community)

## Usage

End session:

```ts
import {session} from "@chitchatjs/plugin-ax-session"

// ends the session
session.end(true)

// sets a session attribute
session.set("key": "value")
```

## Example:

```ts
ax.compound()
  .add(ax.say("Hello, this is a sample text. Good bye!"))
  .add(session.end(true))
  .build();
```
