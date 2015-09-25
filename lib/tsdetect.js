/// <reference path="../typings/tsd.d.ts" />
var path = require("path");
var fs = require("fs");
function createJsonPathList(projectPath) {
    var result = [];
    var splited = projectPath.split("/");
    var path = "/";
    for (var i = 0; i < splited.length; i++) {
        var d = splited[i];
        if (!d)
            continue;
        path += d + "/";
        result.push(path + "package.json");
    }
    result.reverse();
    return result;
}
function findTypeScriptInNodeModules(jsonPath) {
    var tsPathBase = jsonPath.slice(0, jsonPath.lastIndexOf("/"));
    var jsonText = null;
    try {
        jsonText = fs.readFileSync(jsonPath, "utf-8");
    }
    catch (e) {
        return null;
    }
    var json = JSON.parse(jsonText);
    if ("typescript" in json["dependencies"] || "typescript" in json["devDependencies"]) {
        return tsPathBase + "/node_modules/typescript";
    }
    if ("gulp-typescript" in json["dependencies"] || "gulp-typescript" in json["devDependencies"]) {
        return tsPathBase + "/node_modules/gulp-typescript/node_modules/typescript";
    }
    return null;
}
function detect(projectPath) {
    var absPath = path.resolve(projectPath);
    var jsonPathList = createJsonPathList(absPath);
    var tsPath = null;
    for (var i = 0; i < jsonPathList.length; i++) {
        tsPath = findTypeScriptInNodeModules(jsonPathList[i]);
        if (tsPath)
            break;
    }
    if (!tsPath) {
    }
    return tsPath;
}
exports.detect = detect;
