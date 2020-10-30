# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.8](https://github.com/chitchatjs/chitchatjs/compare/@chitchatjs/alexa@0.3.7...@chitchatjs/alexa@0.3.8) (2020-10-30)


### Bug Fixes

* adding new plugin for APL sample displays and utilities ([ec76a4f](https://github.com/chitchatjs/chitchatjs/commit/ec76a4f00341fa7ff9a9ef301d9656ee84736a9a)), closes [#105](https://github.com/chitchatjs/chitchatjs/issues/105)





## [0.3.7](https://github.com/chitchatjs/chitchatjs/compare/@chitchatjs/alexa@0.3.6...@chitchatjs/alexa@0.3.7) (2020-10-28)


### Bug Fixes

* support for full response envelope in the ax.custom().executor() block ([c5c4660](https://github.com/chitchatjs/chitchatjs/commit/c5c46604b5e1812f80642555f59aa2858e18a23e)), closes [#95](https://github.com/chitchatjs/chitchatjs/issues/95)





## [0.3.6](https://github.com/chitchatjs/chitchatjs/compare/@chitchatjs/alexa@0.3.5...@chitchatjs/alexa@0.3.6) (2020-10-28)


### Bug Fixes

* ax.whenLaunch() and ax.run() blocks ([f5b2d08](https://github.com/chitchatjs/chitchatjs/commit/f5b2d082a3700222c7b64e900c61fd9e98b365ae)), closes [#90](https://github.com/chitchatjs/chitchatjs/issues/90) [#91](https://github.com/chitchatjs/chitchatjs/issues/91)





## [0.3.5](https://github.com/chitchatjs/chitchatjs/compare/@chitchatjs/alexa@0.3.4...@chitchatjs/alexa@0.3.5) (2020-10-26)

**Note:** Version bump only for package @chitchatjs/alexa





## [0.3.4](https://github.com/chitchatjs/chitchatjs/compare/@chitchatjs/alexa@0.3.3...@chitchatjs/alexa@0.3.4) (2020-10-23)


### Bug Fixes

* adding de-dupe logic to ax.intent() and ax.slotType() blocks ([a069678](https://github.com/chitchatjs/chitchatjs/commit/a069678f5ff251781d45cfacc199f507e795cec8)), closes [#75](https://github.com/chitchatjs/chitchatjs/issues/75)
* removing null or empty samples restriction from ax.intent() ([4c1e7ce](https://github.com/chitchatjs/chitchatjs/commit/4c1e7ced35b516f04a260629654f0bee4732fcbf)), closes [#81](https://github.com/chitchatjs/chitchatjs/issues/81)





## [0.3.3](https://github.com/chitchatjs/chitchatjs/compare/@chitchatjs/alexa@0.3.2...@chitchatjs/alexa@0.3.3) (2020-10-23)

**Note:** Version bump only for package @chitchatjs/alexa





## [0.3.2](https://github.com/chitchatjs/chitchatjs/compare/@chitchatjs/alexa@0.3.1...@chitchatjs/alexa@0.3.2) (2020-10-22)


### Bug Fixes

* adding SSMLSpeechBlock as input to ax.say() & ax.ask() ([b3c489c](https://github.com/chitchatjs/chitchatjs/commit/b3c489c9f7670093b516accd0af27701b1025e4f)), closes [#77](https://github.com/chitchatjs/chitchatjs/issues/77)





## [0.3.1](https://github.com/chitchatjs/chitchatjs/compare/@chitchatjs/alexa@0.3.0...@chitchatjs/alexa@0.3.1) (2020-10-22)


### Bug Fixes

* removing default intents from the default IM, we will use plugin ([ec87239](https://github.com/chitchatjs/chitchatjs/commit/ec872393187b54556f4229967451da8ea419aec5)), closes [#73](https://github.com/chitchatjs/chitchatjs/issues/73)





# [0.3.0](https://github.com/chitchatjs/chitchatjs/compare/@chitchatjs/alexa@0.2.7...@chitchatjs/alexa@0.3.0) (2020-10-22)


### Bug Fixes

* allowing ax.ssml() to also accept ssml block, not just text string ([9b3913d](https://github.com/chitchatjs/chitchatjs/commit/9b3913db9574b8ece1eaccc58d53eb93c8fa05f8)), closes [#55](https://github.com/chitchatjs/chitchatjs/issues/55)


### Features

* adding agent.addAllStates(..) to add multiple states at once ([6d8dc15](https://github.com/chitchatjs/chitchatjs/commit/6d8dc15a06e54b889a6af6797e2b975d39b6fb91)), closes [#63](https://github.com/chitchatjs/chitchatjs/issues/63)
* adding support for Directive building block ([5c1ac4a](https://github.com/chitchatjs/chitchatjs/commit/5c1ac4a02a6a73406831c7075259c9da00926a30)), closes [#52](https://github.com/chitchatjs/chitchatjs/issues/52)
* full SSML support in both ax.say() and ax.ask() ([63d9647](https://github.com/chitchatjs/chitchatjs/commit/63d9647f2afeadd8d9c0eb500de58ff852bb1de0)), closes [#50](https://github.com/chitchatjs/chitchatjs/issues/50)
* localized runtime presentation layer components such as ax.say(), ask() and directive() ([58137b3](https://github.com/chitchatjs/chitchatjs/commit/58137b3f3dc17dd30eba3979e2e83653d59a11d4)), closes [#48](https://github.com/chitchatjs/chitchatjs/issues/48)
* starting @chitchatjs/ax-kit with few starter blocks ([caca62a](https://github.com/chitchatjs/chitchatjs/commit/caca62a1e07b52e3af251b4afe2dc0e97f77c2c0)), closes [#58](https://github.com/chitchatjs/chitchatjs/issues/58)





## [0.2.7](https://github.com/chitchatjs/chitchatjs/compare/@chitchatjs/alexa@0.2.6...@chitchatjs/alexa@0.2.7) (2020-10-19)


### Bug Fixes

* adding support for fallback and catch blocks for State objects ([69e7a30](https://github.com/chitchatjs/chitchatjs/commit/69e7a30ffbc0bc67d6eaa0fa2c1b379749e78fed)), closes [#17](https://github.com/chitchatjs/chitchatjs/issues/17)





## [0.2.6](https://github.com/chitchatjs/chitchatjs/compare/@chitchatjs/alexa@0.2.5...@chitchatjs/alexa@0.2.6) (2020-10-17)

**Note:** Version bump only for package @chitchatjs/alexa





## [0.2.5](https://github.com/chitchatjs/chitchatjs/compare/@chitchatjs/alexa@0.2.4...@chitchatjs/alexa@0.2.5) (2020-10-17)


### Bug Fixes

* fixing a bug where whenUserSays() utterances result in duplicate intents ([9b7f37b](https://github.com/chitchatjs/chitchatjs/commit/9b7f37b78e6ee7625c71eb71332968a6ce702822)), closes [#41](https://github.com/chitchatjs/chitchatjs/issues/41)





## [0.2.4](https://github.com/chitchatjs/chitchatjs/compare/@chitchatjs/alexa@0.2.3...@chitchatjs/alexa@0.2.4) (2020-10-16)

**Note:** Version bump only for package @chitchatjs/alexa





## [0.2.3](https://github.com/chitchatjs/chitchatjs/compare/@chitchatjs/alexa@0.2.2...@chitchatjs/alexa@0.2.3) (2020-10-15)


### Bug Fixes

* adding ax.whenMissingSlot() block for slot prompts ([8b4ed3b](https://github.com/chitchatjs/chitchatjs/commit/8b4ed3b53b7d4a188a828c44b88edaebc09bf8a7)), closes [#19](https://github.com/chitchatjs/chitchatjs/issues/19) [#19](https://github.com/chitchatjs/chitchatjs/issues/19)
* implicit state population for slots! ([02185e1](https://github.com/chitchatjs/chitchatjs/commit/02185e1abbf2117a34259b656d76980b5f13c2e1)), closes [#35](https://github.com/chitchatjs/chitchatjs/issues/35)
* removing ax.whenMissingSlot(..).for(intentName) ([3c0b257](https://github.com/chitchatjs/chitchatjs/commit/3c0b257757c0def0331102da940bad7405cdb0ad)), closes [#19](https://github.com/chitchatjs/chitchatjs/issues/19)





## [0.2.2](https://github.com/chitchatjs/chitchatjs/compare/@chitchatjs/alexa@0.2.1...@chitchatjs/alexa@0.2.2) (2020-10-15)


### Bug Fixes

* adding ax.whenMissingSlot() block for slot prompts ([6cca0c6](https://github.com/chitchatjs/chitchatjs/commit/6cca0c633caa8487a9a8475a5ff716709ee9b078)), closes [#19](https://github.com/chitchatjs/chitchatjs/issues/19) [#19](https://github.com/chitchatjs/chitchatjs/issues/19)





## [0.2.1](https://github.com/kevindra/chitchatjs/compare/@chitchatjs/alexa@0.2.0...@chitchatjs/alexa@0.2.1) (2020-10-14)


### Bug Fixes

* missed intent block from the previous release ([87d790a](https://github.com/kevindra/chitchatjs/commit/87d790aee99ba4f224c915f032cd0e2331d28cd4))





# [0.2.0](https://github.com/kevindra/chitchatjs/compare/@chitchatjs/alexa@0.0.24...@chitchatjs/alexa@0.2.0) (2020-10-14)


### Bug Fixes

* wrong version in cli and alexa packages ([04a2ccb](https://github.com/kevindra/chitchatjs/commit/04a2ccbfea951739422f135999e515e9c38fbbca))


### Features

* 🎉 first release (beta) 🎉 ([4be8fe5](https://github.com/kevindra/chitchatjs/commit/4be8fe50072d52547d2da83c069f4de3b12ef194))





## [0.0.24](https://github.com/kevindra/chitchatjs/compare/@chitchatjs/alexa@0.0.23...@chitchatjs/alexa@0.0.24) (2020-10-14)

**Note:** Version bump only for package @chitchatjs/alexa





## [0.0.23](https://github.com/kevindra/chitchatjs/compare/@chitchatjs/alexa@0.0.22...@chitchatjs/alexa@0.0.23) (2020-10-14)

**Note:** Version bump only for package @chitchatjs/alexa





## [0.0.22](https://github.com/kevindra/chitchatjs/compare/@chitchatjs/alexa@0.0.21...@chitchatjs/alexa@0.0.22) (2020-10-13)

**Note:** Version bump only for package @chitchatjs/alexa
