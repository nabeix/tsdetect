var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('compile', function(cb) {
  exec('node_modules/typescript/bin/tsc', function (err, stdout, stderr) {
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
    cb(err);
  });
});

gulp.task('default', ['compile']);
