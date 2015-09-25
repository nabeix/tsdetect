/// <reference path="../typings/tsd.d.ts" />
var program = require("commander");
var tsdetect = require("./tsdetect");
var version = require("../package.json").version;
var projectPath = null;
program
    .version(version)
    .description("A command line tool to detect TypeScript maybe used in your project.")
    .arguments("[project-path]")
    .action(function (path) {
    projectPath = path;
})
    .parse(process.argv);
if (!projectPath) {
    projectPath = process.cwd();
}
var tsPath = tsdetect.detect(projectPath);
if (tsPath) {
    console.log(tsPath);
}
else {
    console.log("TypeScript not found.");
}
