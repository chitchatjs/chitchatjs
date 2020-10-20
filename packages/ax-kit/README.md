# `@chitchatjs/ax-kit`

Alexa Kit is implemented using @chitchatjs/alexa. It contains several coversational building blocks which can be easily added to the Alexa Skills using @chitchatjs/alexa.

For full documentation, check the https://chitchat.js.org website.

## Usage

```ts
import { axkit } from "@chitchatjs/ax-kit";

// to render a standard about message
axkit.greet.about();

// to render a customized about message
axkit.greet.about("I'm a movie bot");

// other building blocks
axkit.greet.hello();
axkit.greet.bye();
```
