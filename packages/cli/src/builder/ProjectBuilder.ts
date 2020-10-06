import path = require('path')

/**
 * Builder Configurations
 */
const CJS_CONFIG = 'cjs.json'
const BUILD_CONFIG_LOCATION = path.join(process.cwd(), CJS_CONFIG)

/**
 * User defined build configurations
 */
export interface BuildConfig {
    src: string,
    outDir: string
}

/**
 * Builder Main
 */
export interface ProjectBuilder {

    /**
     * Builds the package and prepares the deployment packages etc.
     * 
     * @param buildConfig BuildConfig
     */
    build(buildConfig: BuildConfig): void
}