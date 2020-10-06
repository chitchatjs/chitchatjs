export interface BuildConfig {
    src: string;
    outDir: string;
}
export interface ProjectBuilder {
    build(buildConfig: BuildConfig): void;
}
