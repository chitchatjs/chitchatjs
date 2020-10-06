import { ProjectBuilder, BuildConfig } from './ProjectBuilder'

/**
 * Dialogflow Project Builder
 */
export class DialogflowProjectBuilder implements ProjectBuilder {
    build(buildConfig: BuildConfig): void {
        throw new Error("Dialog flow isn't supported right now.")
    }
}