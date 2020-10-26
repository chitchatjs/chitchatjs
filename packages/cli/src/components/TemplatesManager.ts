import { CliConfig, Template } from "../types";

export class TemplatesManager {
  getTemplateNames(config: CliConfig): string[] {
    return config.templates.map((t) => {
      return t.name;
    });
  }

  getTemplateByName(config: CliConfig, templateName: string): Template {
    const templates = config.templates.filter((t) => {
      return t.name === templateName;
    });

    if (templates.length === 0) {
      throw new Error(
        "No templates defined in the cli configuration. Update the configuration and add the template."
      );
    }

    if (templates.length > 1) {
      throw new Error(
        "Templates can not have same name in the cli configurations. Fix the configuration by updating template names accordingly."
      );
    }

    return templates[0];
  }
}
