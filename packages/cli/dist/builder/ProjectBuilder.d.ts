export declare const CJS_CONFIG = "cjs.json";
export declare const BUILD_CONFIG_LOCATION: string;
export interface BuildConfig {
    src: string;
    outDir: string;
    target: "AlexaSkill" | "DialogFlowAgent";
}
export interface ProjectBuilder {
    build(buildConfig: BuildConfig): void;
}
