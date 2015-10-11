'use strict';

var node_path = require('path');

// Will be displayed by `{%=bin_name%} sample -h`
exports.info = 'Initialize a repo';
exports.usage = '{{name}} init';

exports.options = {
  cwd: {
    // `type` defined the variable type to be converted
    // If not specified, the value of the argument will be string
    // argument of `path` type will be resolved.
    type: node_path,

    // `info` is the description of the argument
    info: 'current working directory.',

    // Optional
    // Indicates the default value, if there is no `--cwd <cwd>` in the command.
    default: process.cwd(),

    // Optional.
    // Setter method to do arguments checking, validation, and other things
    set: function (cwd, is_default) {
      // Turns the setter method into an async one
      var done = this.async();

      setTimeout(function someAsyncMethod() {
        done(null, cwd)
      }, 10)
    }
  },

  pretty: {
    // $ {%=bin_name%} sample --pretty
    // then `options.pretty` will be `true`
    // 
    // $ {%=bin_name%} sample --no-pretty
    // then `options.pretty` will be `false`
    type: Boolean,

    info: 'pretty format',

    // $ {%=bin_name%}
    // `options.pretty` will be `true`
    default: true
  },

  files: {
    info: 'the files to be compiled',

    // A complicated setter
    set: function (files, is_default) {
      if (!files || is_default) {
        return [];
      }

      return files.split(',').map(function (file) {
        return file.trim()
      });
    }
  }
};
