/**
 * CLI global Configuration
 */
export interface CliConfig {
  version: string;
  templates: Template[];
}

/**
 * A sample template
 */
export interface Template {
  name: string;
  url: Url;
}

/**
 * URL of a sample
 */
export interface Url {
  type: string;
  value: string;
}

/**
 * Project configuration
 */
export interface ProjectConfig {
  outDir: string;
  target: "Alexa";
}
