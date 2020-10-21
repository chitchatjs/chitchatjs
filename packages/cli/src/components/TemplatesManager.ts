import { Config, Template } from "./ConfigInitializer";

export class TemplatesManager {
  getTemplateNames(config: Config): string[] {
    return config.templates.map((t) => {
      return t.name;
    });
  }

  getTemplateByName(config: Config, templateName: string): Template {
    let templates = config.templates.filter((t) => {
      return t.name === templateName;
    });

    if (!templates || templates.length == undefined) {
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
