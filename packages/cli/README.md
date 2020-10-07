# `ChitchatJS CLI`

![](./images/logo/128x128.png)

> WORK IN PROGRESS, NOT COMPLETELY FUNCTIONAL AT THE MOMENT. STAY TUNED.

ChitchatJS framework(`cjs`) is used to create, manage, and deploy machine learning or rule based voice interfaces easily.

## Getting Started

### Install CLI

```
$ npm install -g @chitchatjs/cli
```

### Create new project

```
$ cjs new
```

> Note: Gif a bit outdated

![](./images/gifs/create-project.gif)

### Build

Builds the project based on the build configuration in `cjs.json` in the root of the project.

```
$ cjs build
```

#### Build Configurations

Build configurations are defined in the `cjs.json` in your project root.

```json
{
    "outDir": "./pkg",
    "target": "Alexa"
}
```

| Config   | Description                                                                                            | Required |
| -------- | ------------------------------------------------------------------------------------------------------ | -------- |
| `outDir` | Location of the output directory.                                                                      | Yes      |
| `target` | Platform you want to deploy to. Can be `Alexa` or `Google`. <br/> Only `Alexa` is supported right now. | Yes      |

### Deploy

Deploys the project to the target platform.

```
$ cjs deploy
```

## Templates

You can bootstrap your projects using external templates. Some of the existing templates:

-   [hello-bot](https://github.com/chitchatjs/hello-bot-template)

### Installing templates

Installing template is easy!

Go to your `~/.cjs/config.json`

```json
{
    "version": "1.0",
    "templates": [
        {
            "name": "hello-bot",
            "url": {
                "type": "GIT",
                "value": "https://github.com/chitchatjs/hello-bot-template.git"
            }
        },
        {
            "name": "<my-template>",
            "url": {
                "type": "GIT",
                "value": "<git-url>"
            }
        }
    ]
}
```
