import { ProjectBuilder, BuildConfig } from './ProjectBuilder';
export declare class AlexaProjectBuilder implements ProjectBuilder {
    build(buildConfig: BuildConfig): void;
    loadProject(buildConfig: BuildConfig): void;
}
