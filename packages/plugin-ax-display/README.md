# `@chitchatjs/plugin-ax-display`

A chitchat.js plugin to manage display (Alexa Presentation Language) easily using @chitchatjs/alexa.

<strong>🤖 Chitchat.js is a JavaScript framework for building voice user interfaces for Alexa Skills. </strong> | <a href="https://chitchat.js.org">📄 Read the documentation </a>

<br/>

**Get in touch**

[![gitter](https://badges.gitter.im/chitchat-js/community.png)](https://gitter.im/chitchat-js/community)

## Usage

```sh
npm i @chitchatjs/plugin-ax-display --save
```

Enable APL interface:

```ts
import { display } from "@chitchatjs/plugin-ax-display";

display.core.enableAPLInterface();
```

Check if device supports a display interface:

```ts
display.conditionals
  .whenScreenDisplay()
  .then(ax.say("this is a screen enabled device"))
  .build();
```

Some sample APL templates:

Shows an image in the center with title. Good for showing a welcome screen.

```ts
display.samples.image({
  backgroundImageUrl: display.samples.Image.CHEESE_DOG,
  title: "My Awesome Skill",
  ..
});
```

Shows a short text on the screen. Good for showing a quick text on the screen.

```ts
display.samples.shortText({
  primaryText: "Hello world!",
  ..
});
```

Shows an image on the left with text components and more on the right. Good for showing a product item or search result.

```ts
display.samples.imageLeftDetail({
  title: "Hello world",
  logoUrl: display.samples.Logo.CHEESE,
});
```
