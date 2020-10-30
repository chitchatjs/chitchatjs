# `@chitchatjs/plugin-ax-session`

Chitchat.js display utilties for managing APL documents and more easily. @chitchatjs/alexa.

<strong>🤖 Chitchat.js is a JavaScript framework for building voice user interfaces for Alexa Skills. </strong> | <a href="https://chitchat.js.org">📄 Read the documentation </a>

<br/>

**Get in touch**

[![gitter](https://badges.gitter.im/chitchat-js/community.png)](https://gitter.im/chitchat-js/community)

## Usage

1. Do something when device is screen enabled

```ts
import { display } from "@chitchatjs/plugin-ax-display";

display.conditionals
  .whenScreenDisplay()
  .then(ax.say("This is a screen enabled device!"))
  .build();
```

2. Enable APL interface in the skill manifest

```ts
display.core.enableAPLInterface();
```

3. Some sample layouts:

Image with title:

```ts
display.samples.image({
  title: "Awesome Skill",
  backgroundImageUrl: display.samples.Image.CHEESE_DOG,
  logoUrl: display.samples.Logo.CHEESE,
});
```

Quick short text:

```ts
display.samples.shortText({
  primaryText: "Hello world!",
  ..
})
```

Image on left, rich container on the right. Good for showing a search result or a product.

```ts
display.samples.imageLeftDetail({
  title: "Awesome skill",
  ..
})
```
