#!/usr/bin/env node
import { program } from "commander";

import { BuildCommand } from "./commands/build";
import { DeployCommand } from "./commands/deploy";
import { NewCommand } from "./commands/new";
import { RootCommand } from "./commands/root";
import { ConfigInitializer } from "./components/ConfigInitializer";
import { CliConfig } from "./types";
import { CLI_CONFIG_DIRECTORY } from "./util/constants";

/**
 * Initialize configuration
 */
const config: CliConfig = new ConfigInitializer().init(CLI_CONFIG_DIRECTORY);

new RootCommand().register(program);
new NewCommand(config).register(program);
new BuildCommand().register(program);
new DeployCommand().register(program);

program.parse(process.argv);
