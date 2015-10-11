'use strict';

var node_path = require('path');
var comfort   = require('comfort');

var root = node_path.join(__dirname, '..');

var commander = comfort({
  command_root: node_path.join(root, 'command'),
  option_root: node_path.join(root, 'option'),
  root: root,
  name: '{%=bin_name%}'
});

commander
.context({
  // properties and methods defined in `.context()`
  // could be accessed in command methods, by `this.foo` for example.
  foo: function () {
    console.log('foo');
  },
  // so that we can use `commander` everywhere
  commander: commander
})
.on('error', function (err) {
  console.error(err.message);
  process.exit(1);
})
.cli();
