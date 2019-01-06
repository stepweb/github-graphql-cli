const builder = require('./mutation/builder');
const { command, desc } = require('./mutation/index');

exports.command = command;
exports.desc = desc;
exports.builder = builder;
