/// <reference path="../typings/tsd.d.ts" />
var path = require("path");
var child_process_1 = require("child_process");
function findLocalTypeScript(projectPath) {
    var promise = new Promise(function (resolve, reject) {
        var execResult = [];
        var nodeModulePath = "/node_modules/typescript";
        var tsPath = null;
        child_process_1.exec("npm list typescript --parseable", { cwd: projectPath }, function (error, stdout, stderr) {
            if (error && error.code > 125) {
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
            }
            else if (execResult.length > 1) {
                execResult.sort(function (a, b) {
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
            }
            else {
                resolve(null);
            }
        });
    });
    return promise;
}
function findGlobalTypeScript() {
    var promise = new Promise(function (resolve, reject) {
        var execResult = [];
        child_process_1.exec("npm list typescript -g --parseable", {}, function (error, stdout, stderr) {
            if (error && error.code > 125) {
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
            }
            else {
                resolve(null);
            }
        });
    });
    return promise;
}
function detect(projectPath, callback) {
    var absPath = path.resolve(projectPath);
    findLocalTypeScript(absPath).then(function (tsPath) {
        if (tsPath) {
            return tsPath;
        }
        else {
            return findGlobalTypeScript();
        }
    }).then(function (tsPath) {
        if (tsPath) {
            callback(null, tsPath);
        }
        else {
            callback(new Error("TypeScript not found."));
        }
    }).catch(function (error) {
        callback(error);
    });
}
exports.detect = detect;
