# @chitchatjs/alexa

![](./images/logo/logo-128x128.png)

Full documentation is available on https://chitchat.js.org

With `@chitchatjs/alexa` you get many prebuilt Blocks that you can plug into your skill code. We will use `ax` as a short form of `alexa` below.

## Core

### `ax.dialogManager()`

`ax.dialogManager()` instantiates a dialog manager for your skill. It uses the specified `SkillDefinition` and a `RuleBasedDialogManager` by default.

You should export your skill and dialog manager `handler` from your skill's `index.js` file.

```ts
export = ax.dialogManager(definition).exports();
```

### `ax.definition()`

This is where your Skill code begins. A skill has a single `SkillDefinition`, definition contains multiple states and hence everything is wired to the definition object.

```ts
ax.definition()
    .addState(..)
    .addState(..)
    .build()
```

### `ax.state()`

Defines a new state in your `SkillDefinition`.

```ts
let dungenState = ax.state("Dungen").build();

definition.addState(dungenState);
```

### `ax.start()`

One of the states in your `SkillDefinition` must start with `ax.start()..`. Think of it as a root block of your skill. This is where `LaunchRequest` is captured when user opens your skill.

## Blocks

### `ax.ask()`

This block allows you to ask question to the user.

```ts
ax.ask("what is your name?").build();
// or
ax.ask("what is your name?").reprompt("your name please").build();
```

### `ax.say()`

This block allows you to say something back to the user and then close the session.

```ts
ax.say("Hello!");
```

::: tip Tip
Notice that there is no `.build()` at the end of this block. Some simple blocks don't have `.build()`.
:::

### `ax.compound()`

Compound block combines multiple blocks together. It executes all the blocks sequentially and prepares the final response.

```ts
ax.compound().add(ax.say("Hello world")).build();
```

::: warning Caution
If using multiple blocks that generate the same field in the final response, the last block will overwrite the previous block's response field.
:::

### `ax.when()`

When block in its simplest form executes its block only when provided condition is met.

```ts
let whenBlock = ax
    .when()
    .true((ctx: AlexaDialogContext, event: AlexaEvent) => {
        return event.currentRequest.request.type === "IntentRequest";
    })
    .then(ax.say("This is an intent request!"));
```

Above code will render `This is an intent request` on every `IntentRequest`.

Optionally, you can also use `.otherwise(..)` to wire a Block when condition doesn't meet.

```ts
whenBlock.otherwise(ax.say("This is not an intent request"));
```

### `ax.whenUserSays()`

A much simple `when` block that only checks if user said a specific utterance.

```ts
ax.whenUserSays(["hello alexa"]).then(ax.say("hello!")).build();
```

This will generate:

```
U: hello alexa
A: hello!
```

This block automatically generates an intent for the specified utterance!

#### Capturing slot types

You can use `{..}` to annotate a type inside a sample utterance and then use `.withSlotType(<name>, <slot-type-name>)` method to add a type.

```ts
ax.whenUserSays(["hello {name}"]).withSlotType("name", "AMAZON.FIRST_NAME").then(ax.say("hello!")).build();
```

::: warning Caution
If a slot type is already added elsewhere in the skill before this type, this type will not be injected. To manage types in a better way use the global block `ax.type()`.
:::

#### Using slot type values

You can set the state variables using `ax.setStateVar()` after a `ax.whenUserSays()` block.

```ts
ax.whenUserSays(["hello {name}"])
    .withSlotType("name", "AMAZON.FIRST_NAME")
    .then(
        ax
            .compound()
            .add(
                ax.setStateVar((c: AlexaDialogContext, e: AlexaEvent) => {
                    // setting the slot value as a state var
                    return { name: e.currentRequest.request.intent.slots.name.value };
                })
            )
            .add(ax.ask("did you mean {name}?").build())
            .build()
    )
    .build();
```

Output:

```
U: hello alexa
A: did you mean alexa?
```

### `ax.slotType()`

A block that allows you to inject a Slot Type in your skill.

```ts
ax.slotType("MyCity").values(["hapur", "ghaziabad"]).build();
// or
let slotType: SlotType = mySlotType(); // create your slot type from scratch
ax.slotType().import(slotType).build();
```

### `ax.localize()`

A block to localize the artifacts in your skill, which you can add anywhere in your block tree.

```ts
ax.localize([Locale.en_US, Locale.en_CA])
    .block(
        // now, info block is localized and
        // will produce artifacts in both en-US and en-CA locales.
        ax.info().name("Hello bot").build()
    )
    .build();
```

::: tip Note
`ax.localize()` will have no effect on blocks that are purely to execute run time requests, such as `ax.say(..)`.
:::

### `ax.whenIntentName()`

Another variation of `when` block that gives you a bit more control. You can define your intent outside and use this block to define condition by intent name.

```ts
ax.whenIntentName("HelloAlexaIntent").then(ax.say("hello!")).build();
```

### `ax.setStateVar()`

This blocks allows you to set state variable(s), so that you can use them in your responses.

```ts
ax.compound().add(ax.setStateVar("name", "Kevindra")).add(ax.say("hello, {name}!")).build();
```

Output: Now Alexa knows our name.

```ts
U: hello alexa
A: hello, Kevindra!
```

You can also use this block to hook your own function, for more dynamic value injections.

```ts
ax.compound()
    .add(
        ax.setStateVar((ctx: AlexaDialogContext, event: AlexaEvent) => {
            let userName = myApi.getUserName();
            return { name: userName };
        })
    )
    .add(ax.say("hello, {name}!"))
    .build();
```

This block uses string interpolation. When you define a variable name inside `{}` it will look for the state.

### `ax.removeStateVar()`

This block simply removes a state variable.

```ts
ax.removeStateVar("name")
// or
ax.removeStateVar(["name", ..])
// or
ax.removeStateVar((ctx: AlexaDialogManager, event: AlexaEvent) => {
    return ["name"]
})
```

### `ax.goto()`

This block allows you to go to a new state.

```ts
ax.compound().add(ax.say("taking you to the dungen")).add(ax.goto("Dungen"));

ax.state("Dungen")
    .add(ax.whenUserSays(["why am I in the dungen"]).then(ax.say("because dungen is cool")).build())
    .build();
```

Output:

```
...
A: taking you to the dungen
U: why am I in the dungen
A: because dungen is cool
```

### `ax.end()`

Similar to `ax.start()`, this block handles the `SessionEndedRequest` gracefully. Hence, it is important to add this block in your skill's terminal states.

### `ax.empty()`

Sometimes, you may not want to render any response back. This is useful when you want to handle the `SessionEndedRequest` using your own code. You can return this block after implementing your custom code.

### `ax.info()`

Info block allows you to update your skill's details such as its name, invocation name etc. You can simply plug in this block anywhere in your skill definition and it will inject the specified name in your Skill's manifest and/or in your interaction models.

```ts
ax.info(Locale.en_US).name("My Skill").invocationName("My Skill").build();
```

### `ax.custom()`

Custom block gives your full control in how you want to handle the resource generation and request handling yourself.

```ts
ax.custom()
    .executor((c: AlexaDialogContext, e: AlexaEvent) => {
        let res = ResponseFactory.init();
        res.speak("I'm speaking this from a custom block.");
        return res.getResponse();
    })
    .build();
```

Output:

```
..
A: I'm speaking this from a custom block.
```

Sometimes you also want to manually handle the Interaction Models, Skill Manifest and other resources yourself. `ax.custom()` block allows you to do that as well. You can set a resource using the [Skill Package path](https://developer.amazon.com/en-US/docs/alexa/smapi/skill-package-api-reference.html) of the resource.

```ts
ax.custom()
    .builder((c: AlexaBuilderContext) => {
        return {
            resourceMap: {
                "/skill.json": mySkillManifest,
            },
        };
    })
    .build();
```

::: tip
Returning `resourceMap` or `Response` from the `custom` block performs a merge with the already generated artifacts and response from other blocks.
:::
