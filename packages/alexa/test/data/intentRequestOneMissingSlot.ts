import { RequestEnvelope } from "ask-sdk-model";

export const intentRequestOneMissingSlot: RequestEnvelope = {
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
      name: "WeatherIntent",
      slots: {
        city: {
          name: "city",
          value: "seattle",
          confirmationStatus: "NONE",
        },
        date: {
          name: "date",
          confirmationStatus: "NONE",
        },
      },
      confirmationStatus: "NONE",
    },
    dialogState: "IN_PROGRESS",
  },
};
