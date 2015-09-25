/// <reference path="../typings/tsd.d.ts" />

import program = require("commander");
import tsdetect = require("./tsdetect");

var version = require("../package.json").version;

var projectPath: string = null;

program
    .version(version)
    .usage("[options] [project-path]")
    .description("A command line tool to detect TypeScript maybe used in your project.")
    .parse(process.argv);

if (program.args.length) {
    projectPath = program.args[0];
} else {
    projectPath = process.cwd();
}

tsdetect.detect(projectPath, (err: any, result: string) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(result);
    }
});
