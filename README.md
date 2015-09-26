# tsdetect [![Build Status](https://travis-ci.org/nabeix/tsdetect.svg?branch=master)](https://travis-ci.org/nabeix/tsdetect)

A command line tool to detect TypeScript maybe used in your project.

## Install

```
$ npm install -g tsdetect
```

## Usage

In your project directory, type `tsdetect` command.

```
$ tsdetect
/Users/nabeix/.nodebrew/current/lib/node_modules/typescript
```

## Use as node module

```
$ npm instal tsdetect --save
```

```
var tsdetect = require('tsdetect');

tsdetect.detect("/path/to/project", function(error, result) {
    console.log(result);
});
```

## How it works

`tsdetect` tries to detect TypeScript using npm command in the following order.

1. node_modules/typescript
2. node_modules/gulp-typescript/node_modules/typescript
3. node_modules/grunt-typescript/node_modules/typescript
4. global installed

## Contribution

1. Fork it ( http://github.com/nabeix/tsdetect )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

## License

MIT
