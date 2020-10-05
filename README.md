# `ChitchatJS`

![](./images/logo/128x128.png)

ChitchatJS (`cjs`) is used to create, manage, and deploy machine learning based voice interfaces easily to Alexa.

> WORK IN PROGRESS, STAY TUNED.

## Getting Started

### Install CLI

```
$ npm install -g @chitchatjs/cli
```

### Create new project

```
$ cjs new
```

![](./images/gifs/create-project.gif)

### Compile

```
$ cjs compile
```

### Deploy

```
$ cjs deploy
```

### Test

```
$ cjs test
```

----
## Writing Bot

### Dialog Script

#### A basic hello world dialog script.

```typescript
// What user might say
let userSaysHello: UserTurn = {
    trigger: {
        texts: ["Hello, how are you"]
    } as UtteranceTrigger
}

// What system answers
let systemsGreetsBack: SystemTurn = {
    actions: [
        {
            text: "I'm good, thank you!"
        } as SpeechAction
    ]
}

// Plug turns into a dialog script
let dialogScript: Turn[] = [
    userSaysHello,
    systemsGreetsBack
]

// export, that's it!
export { dialogScript }
```