import { ProjectBuilder, BuildConfig } from './ProjectBuilder'

/**
 * Alexa Project Builder
 */
export class AlexaProjectBuilder implements ProjectBuilder {
    build(buildConfig: BuildConfig): void {
        console.log("building the package!!")
    }
}