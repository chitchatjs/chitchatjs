import { ui } from 'inquirer'
import { ProjectBuilder, BuildConfig } from './ProjectBuilder'
import { logger, startSpinner } from '../util/util'
import { DEV_WORKING_DIRECTORY } from '../util/util'
import path = require('path')
import { AlexaSkill } from '@chitchatjs/alexa'

/**
 * Alexa Project Builder
 */
export class AlexaProjectBuilder implements ProjectBuilder {
    build(buildConfig: BuildConfig): void {
        let spinner = startSpinner("🔨 Building project..")
        this.loadProject(buildConfig)
        spinner.stop()
    }

    loadProject(buildConfig: BuildConfig) {
        logger.info("Loading your project from: " + DEV_WORKING_DIRECTORY)
        try {
            let p: AlexaSkill = require(DEV_WORKING_DIRECTORY).default
            // console.log("Loaded: " + JSON.stringify(p.dialogSet, null, 2))
        } catch (e) {
            logger.error("error: ", e)
        }
    }
}