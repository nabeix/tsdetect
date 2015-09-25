/// <reference path="../typings/tsd.d.ts" />

import program = require("commander");
import tsdetect = require("./tsdetect");

var version = require("../package.json").version;

var projectPath: string = null;

program
    .version(version)
    .description("A command line tool to detect TypeScript maybe used in your project.")
    .arguments("[project-path]")
    .action((path: string) => {
        projectPath = path;
    })
    .parse(process.argv);

if (!projectPath) {
    projectPath = process.cwd();
}

var tsPath = tsdetect.detect(projectPath);
if (tsPath) {
    console.log(tsPath);
} else {
    console.log("TypeScript not found.");
}
