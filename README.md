# tsdetect [![Build Status](https://travis-ci.org/nabeix/tsdetectsvg?branch=master)](https://travis-ci.org/nabeix/tsdetect)

A command line tool to detect TypeScript maybe used in your project.

## Install

*TODO: publish as NPM package*

```
npm install -g tsdetect
```

## Usage

In your project directory, type `tsdetect` command.

```
tsdetect
```

## Use as node module

```
npm instal tsdetect --save
```

```
var tsdetect = require('tsdetect');
tsdetect.detect("/path/to/project", function(error, result) {
    console.log(result);
});
```

## How it works

`tsdetect` searches TypeScript using npm command in the following order.

1. in your project directory
2. in global

## Contribution

1. Fork it ( http://github.com/nabeix/tsdetect )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

## License

MIT
