/// <reference path="../typings/tsd.d.ts" />
var path = require("path");
var child_process_1 = require("child_process");
var targets = [
    "node_modules/typescript",
    "node_modules/gulp-typescript/node_modules/typescript",
    "node_modules/grunt-typescript/node_modules/typescript"
];
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
            for (var i = 0; i < targets.length; i++) {
                var index = execResult.indexOf(path.resolve(projectPath + "/" + targets[i]));
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
        return tsPath ? tsPath : findGlobalTypeScript();
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
