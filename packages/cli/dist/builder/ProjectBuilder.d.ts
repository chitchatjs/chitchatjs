export interface BuildConfig {
    src: string;
    outDir: string;
    target: "AlexaSkill" | "DialogFlowAgent";
}
export interface ProjectBuilder {
    build(buildConfig: BuildConfig): void;
}
