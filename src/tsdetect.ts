/// <reference path="../typings/tsd.d.ts" />

import path = require("path");
import {exec} from "child_process";

var targets: string[] = [
    "node_modules/typescript",
    "node_modules/gulp-typescript/node_modules/typescript",
    "node_modules/grunt-typescript/node_modules/typescript"
];

function findLocalTypeScript(projectPath: string): Promise<string> {
    var promise = new Promise<string>((resolve, reject) => {
        var execResult: string[] = [];
        var nodeModulePath = "/node_modules/typescript";
        var tsPath: string = null;
        exec("npm list typescript --parseable", {cwd: projectPath}, (error, stdout, stderr) => {
            if (error && (<any>error).code > 125) {
                reject(new Error("npm command execution error."));
                return;
            }
            var splited = stdout.toString().split("\n");
            for (var i = 0; i < splited.length; i++) {
                if (splited[i].indexOf(projectPath) === 0) {
                    execResult.push(splited[i]);
                }
            }
            for (var i = 0; i < targets.length; i++) {
                var index = execResult.indexOf(path.resolve(`${projectPath}/${targets[i]}`));
                if (index > -1) {
                    tsPath = execResult[index];
                    break;
                }
            }
            resolve(tsPath);
        });
    });
    return promise;
}

function findGlobalTypeScript(): Promise<string> {
    var promise = new Promise<string>((resolve, reject) => {
        var execResult: string[] = [];
        exec("npm list typescript -g --parseable", {}, (error, stdout, stderr) => {
            if (error && (<any>error).code > 125) {
                reject(new Error("npm command execution error."));
                return;
            }
            var splited = stdout.toString().split("\n");
            for (var i = 0; i < splited.length; i++) {
                if (splited[i]) {
                    execResult.push(splited[i]);
                }
            }
            if (execResult.length) {
                resolve(execResult[0]);
            } else {
                resolve(null);
            }
        });
    });
    return promise;
}

export function detect(projectPath: string, callback: (err: Error, result?: string) => void): void {
    var absPath = path.resolve(projectPath);
    findLocalTypeScript(absPath).then((tsPath) => {
        return tsPath ? tsPath : findGlobalTypeScript();
    }).then((tsPath) => {
        if (tsPath) {
            callback(null, tsPath);
        } else {
            callback(new Error("TypeScript not found."));
        }
    }).catch((error) => {
        callback(error);
    });
}
