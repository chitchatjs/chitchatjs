# `@chitchatjs/plugin-ax-kit`

Chitchat.js platform developed plugin package. It contains several coversational building blocks which can be easily added to the Alexa Skills using @chitchatjs/alexa.

![](./images/logo/logo-128x128.png)

<strong>🤖 JavaScript framework for building voice user interfaces for Alexa Skills. </strong> | <a href="https://chitchat.js.org">📄 Read the documentation </a>

| Package                                                              | NPM                                                                                                                  | Build                                                                                                                                                                                                                                                                                                                 |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@chitchatjs/cli](https://www.npmjs.com/package/@chitchatjs/cli)     | [![npm version](https://badge.fury.io/js/%40chitchatjs%2Fcli.svg)](https://badge.fury.io/js/%40chitchatjs%2Fcli)     | ![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoicSt5K3NIM0xCa0pkVXNnb2p5TzJqODFzbFA0djNhNTY2eWFRVkhMSkNYVEhjSW9ETGZONldNdlNsWjA5WkRoS1VlZ1ZyeDArN1F0bStDWnZweEtEQTdvPSIsIml2UGFyYW1ldGVyU3BlYyI6IldhZlNpZUttSUlYSlBVY3ciLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=main) |
| [@chitchatjs/alexa](https://www.npmjs.com/package/@chitchatjs/alexa) | [![npm version](https://badge.fury.io/js/%40chitchatjs%2Falexa.svg)](https://badge.fury.io/js/%40chitchatjs%2Falexa) | ![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoicSt5K3NIM0xCa0pkVXNnb2p5TzJqODFzbFA0djNhNTY2eWFRVkhMSkNYVEhjSW9ETGZONldNdlNsWjA5WkRoS1VlZ1ZyeDArN1F0bStDWnZweEtEQTdvPSIsIml2UGFyYW1ldGVyU3BlYyI6IldhZlNpZUttSUlYSlBVY3ciLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=main) |
| [@chitchatjs/core](https://www.npmjs.com/package/@chitchatjs/core)   | [![npm version](https://badge.fury.io/js/%40chitchatjs%2Fcore.svg)](https://badge.fury.io/js/%40chitchatjs%2Fcore)   | ![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoicSt5K3NIM0xCa0pkVXNnb2p5TzJqODFzbFA0djNhNTY2eWFRVkhMSkNYVEhjSW9ETGZONldNdlNsWjA5WkRoS1VlZ1ZyeDArN1F0bStDWnZweEtEQTdvPSIsIml2UGFyYW1ldGVyU3BlYyI6IldhZlNpZUttSUlYSlBVY3ciLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=main) |

<br/>

**Get in touch**

[![gitter](https://badges.gitter.im/chitchat-js/community.png)](https://gitter.im/chitchat-js/community)

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
axkit.builtin.help();
axkit.builtin.stop();
axkit.builtin.fallback();
axkit.builtin.all();
```
