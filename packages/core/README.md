# `ChitchatJS`

![](./images/logo/logo-128x128.png)

Chitchat (or CJS) is a framework for building voice driven multi-modal user interfaces (a.k.a. VUI). Chitchat is designed to be incrementally adaptable. You can write a simple rule based voice user interface or as complex as a machine learnt model based VUI. Chitchat comes with three primary components - core library (`@chichatjs/core`), a CLI (`@chitchatjs/cli`) and the implementation strategies (dialog management) which may or may not be platform dependents. We offer `@chitchatjs/alexa` to seamlessly integrate your voice user interface with Alexa.

`@chichatjs/core` is a primitive base that defines core framework premitives that are voice-platform and dialog management strategy independent. `@chitchatjs/cli` provides easy command access to create a project, build and deploy it (only supported for Alexa platform right now). `@chitchatjs/alexa` is a collection of VUI components designed on top of the core library's components that help build Alexa oriented VUI.

To get started, check the quick start guide on https://chitchat.js.org/
