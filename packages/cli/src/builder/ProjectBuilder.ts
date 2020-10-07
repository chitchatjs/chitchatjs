import path = require("path");

/**
 * Builder Configurations
 */
export const CJS_CONFIG = "cjs.json";
export const BUILD_CONFIG_LOCATION = path.join(process.cwd(), CJS_CONFIG);

/**
 * User defined build configurations
 */
export interface BuildConfig {
    outDir: string;
    target: "AlexaSkill" | "DialogFlowAgent";
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
    build(buildConfig: BuildConfig): void;
}
