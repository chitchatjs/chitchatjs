# `ChitchatJS`

![](./images/logo/128x128.png)

ChitchatJS framework is used to create, manage, and deploy machine learning or rule based voice interfaces easily.

> WORK IN PROGRESS, STAY TUNED.

## Getting Started

Check out `@chitchatjs/cli` for setup instructions.

## Writing Bot

### Dialog Script

#### A basic hello world dialog script.

```typescript
let sampleInteraction: cjs.Interaction = {
    user: {
        trigger: <cjs.UtteranceTrigger>{
            texts: ["Hello, how are you"]
        }
    },
    system: {
        actions: [
            <cjs.TellSpeechAction>{
                text: "I'm good, thank you!"
            }
        ]
    }
}

export let dialog: cjs.Dialog = { interactions: [sampleInteraction] }
```