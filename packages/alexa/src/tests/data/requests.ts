import { RequestEnvelope } from "ask-sdk-model";

export let launchRequest: RequestEnvelope = {
    version: "1.0",
    session: {
        new: false,
        sessionId: "amzn1.echo-api.session.123456789012",
        application: {
            applicationId: "amzn1.ask.skill.987654321",
        },
        attributes: {},
        user: {
            userId: "amzn1.ask.account.testUser",
        },
    },
    context: {
        AudioPlayer: {
            playerActivity: "IDLE",
        },
        System: {
            apiEndpoint: "dummy-api-end-point",
            application: {
                applicationId: "amzn1.ask.skill.987654321",
            },
            user: {
                userId: "amzn1.ask.account.testUser",
            },
            device: {
                deviceId: "random-device-id",
                supportedInterfaces: {
                    AudioPlayer: {},
                },
            },
        },
    },
    request: {
        type: "LaunchRequest",
        requestId: "amzn1.echo-api.request.1234",
        timestamp: "2016-10-27T21:06:28Z",
        locale: "en-US",
    },
};

export let getWeatherIntent: RequestEnvelope = {
    version: "1.0",
    session: {
        new: false,
        sessionId: "amzn1.echo-api.session.123456789012",
        application: {
            applicationId: "amzn1.ask.skill.987654321",
        },
        attributes: {
            platformState: {
                currentStateName: "SecondTurn",
                globalState: {},
            },
        },
        user: {
            userId: "amzn1.ask.account.testUser",
        },
    },
    context: {
        AudioPlayer: {
            playerActivity: "IDLE",
        },
        System: {
            apiEndpoint: "dummy-api-end-point",
            application: {
                applicationId: "amzn1.ask.skill.987654321",
            },
            user: {
                userId: "amzn1.ask.account.testUser",
            },
            device: {
                deviceId: "random-device-id",
                supportedInterfaces: {
                    AudioPlayer: {},
                },
            },
        },
    },
    request: {
        type: "IntentRequest",
        requestId: "amzn1.echo-api.request.1234",
        timestamp: "2016-10-27T21:06:28Z",
        locale: "en-US",
        intent: {
            name: "GetWeatherIntent",
            confirmationStatus: "NONE",
        },
        dialogState: "IN_PROGRESS",
    },
};

export let givemeweatIntent: RequestEnvelope = {
    version: "1.0",
    session: {
        new: false,
        sessionId: "amzn1.echo-api.session.123456789012",
        application: {
            applicationId: "amzn1.ask.skill.987654321",
        },
        attributes: {
            platformState: {
                currentStateName: "weather",
                globalState: {},
            },
        },
        user: {
            userId: "amzn1.ask.account.testUser",
        },
    },
    context: {
        AudioPlayer: {
            playerActivity: "IDLE",
        },
        System: {
            apiEndpoint: "dummy-api-end-point",
            application: {
                applicationId: "amzn1.ask.skill.987654321",
            },
            user: {
                userId: "amzn1.ask.account.testUser",
            },
            device: {
                deviceId: "random-device-id",
                supportedInterfaces: {
                    AudioPlayer: {},
                },
            },
        },
    },
    request: {
        type: "IntentRequest",
        requestId: "amzn1.echo-api.request.1234",
        timestamp: "2016-10-27T21:06:28Z",
        locale: "en-US",
        intent: {
            name: "givemeweatIntent",
            confirmationStatus: "NONE",
        },
        dialogState: "IN_PROGRESS",
    },
};

export let userEvent: RequestEnvelope = {
    version: "1.0",
    session: {
        new: false,
        sessionId: "amzn1.echo-api.session.123456789012",
        application: {
            applicationId: "amzn1.ask.skill.987654321",
        },
        attributes: {},
        user: {
            userId: "amzn1.ask.account.testUser",
        },
    },
    context: {
        AudioPlayer: {
            playerActivity: "IDLE",
        },
        System: {
            apiEndpoint: "dummy-api-end-point",
            application: {
                applicationId: "amzn1.ask.skill.987654321",
            },
            user: {
                userId: "amzn1.ask.account.testUser",
            },
            device: {
                deviceId: "random-device-id",
                supportedInterfaces: {
                    AudioPlayer: {},
                },
            },
        },
    },
    request: {
        type: "Alexa.Presentation.APL.UserEvent",
        requestId: "amzn1.echo-api.request.1234",
        timestamp: "2016-10-27T21:06:28Z",
        locale: "en-US",
        arguments: [],
    },
};

export let orderPizzaIntent: RequestEnvelope = {
    version: "1.0",
    session: {
        new: false,
        sessionId: "amzn1.echo-api.session.123456789012",
        application: {
            applicationId: "amzn1.ask.skill.987654321",
        },
        attributes: {},
        user: {
            userId: "amzn1.ask.account.testUser",
        },
    },
    context: {
        AudioPlayer: {
            playerActivity: "IDLE",
        },
        System: {
            apiEndpoint: "dummy-api-end-point",
            application: {
                applicationId: "amzn1.ask.skill.987654321",
            },
            user: {
                userId: "amzn1.ask.account.testUser",
            },
            device: {
                deviceId: "random-device-id",
                supportedInterfaces: {
                    AudioPlayer: {},
                },
            },
        },
    },
    request: {
        type: "IntentRequest",
        requestId: "amzn1.echo-api.request.1234",
        timestamp: "2016-10-27T21:06:28Z",
        locale: "en-US",
        intent: {
            name: "OrderPizzaIntent",
            confirmationStatus: "NONE",
        },
        dialogState: "IN_PROGRESS",
    },
};

export let yesIntent: RequestEnvelope = {
    version: "1.0",
    session: {
        new: false,
        sessionId: "amzn1.echo-api.session.123456789012",
        application: {
            applicationId: "amzn1.ask.skill.987654321",
        },
        attributes: {},
        user: {
            userId: "amzn1.ask.account.testUser",
        },
    },
    context: {
        AudioPlayer: {
            playerActivity: "IDLE",
        },
        System: {
            apiEndpoint: "dummy-api-end-point",
            application: {
                applicationId: "amzn1.ask.skill.987654321",
            },
            user: {
                userId: "amzn1.ask.account.testUser",
            },
            device: {
                deviceId: "random-device-id",
                supportedInterfaces: {
                    AudioPlayer: {},
                },
            },
        },
    },
    request: {
        type: "IntentRequest",
        requestId: "amzn1.echo-api.request.1234",
        timestamp: "2016-10-27T21:06:28Z",
        locale: "en-US",
        intent: {
            name: "AMAZON.YesIntent",
            confirmationStatus: "NONE",
        },
        dialogState: "IN_PROGRESS",
    },
};
