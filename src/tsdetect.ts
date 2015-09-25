/// <reference path="../typings/tsd.d.ts" />

import path = require("path");
import fs = require("fs");

function createJsonPathList(projectPath: string): string[] {
    var result: string[] = [];
    var splited = projectPath.split("/");
    var path = "/";
    for (var i = 0; i < splited.length; i++) {
        var d = splited[i];
        if (!d) continue;
        path += `${d}/`;
        result.push(`${path}package.json`);
    }
    result.reverse();
    return result;
}


function findTypeScriptInNodeModules(jsonPath: string): string {
    var tsPathBase = jsonPath.slice(0, jsonPath.lastIndexOf("/"));
    var jsonText: string = null;
    try {
        jsonText= fs.readFileSync(jsonPath, "utf-8");
    } catch(e) {
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

export function detect(projectPath: string): string {
    var absPath = path.resolve(projectPath);
    var jsonPathList = createJsonPathList(absPath);
    var tsPath: string = null;
    for (var i = 0; i < jsonPathList.length; i++) {
        tsPath = findTypeScriptInNodeModules(jsonPathList[i]);
        if (tsPath) break;
    }
    if (!tsPath) {
        // TODO:
    }
    return tsPath;
}
