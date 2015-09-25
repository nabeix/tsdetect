/// <reference path="../typings/tsd.d.ts" />

import path = require("path");
import {exec} from "child_process";

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
            if (execResult.length === 1) {
                tsPath = execResult[0];
            } else if (execResult.length > 1) {
                execResult.sort((a: string, b:string) => {
                    if (a.length < b.length) {
                        return -1;
                    }
                    if (a.length > b.length) {
                        return 1;
                    }
                    return 0;
                });
                tsPath = execResult[0];
            }
            if (tsPath) {
                resolve(tsPath);
            } else {
                resolve(null);
            }
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
        if (tsPath) {
            return tsPath;
        } else {
            return findGlobalTypeScript();
        }
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
