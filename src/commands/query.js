const builder = require('./query/builder');
const { command, desc } = require('./query/index');

exports.command = command;
exports.desc = desc;
exports.builder = builder;
