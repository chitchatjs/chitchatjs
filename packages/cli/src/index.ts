#!/usr/bin/env node
import { program } from "commander";
import { BuildCommand } from "./commands/build";
import { DeployCommand } from "./commands/deploy";
import { NewCommand } from "./commands/new";
import { RootCommand } from "./commands/root";

new RootCommand().register(program);
new NewCommand().register(program);
new BuildCommand().register(program);
new DeployCommand().register(program);

program.parse(process.argv);
