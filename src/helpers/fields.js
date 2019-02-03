const util = require('util');

const include = (fields) => fields
    ? { fields }
    : {};

const sanitize = (fields = '') => util.inspect(fields)
    .replace(/(?:\: true)/g, '')
    .replace(/\"([0-9]+)\"/g, '$1')
    .replace(/'([^\']+)':/g, '$1')
    .replace(/(?:\:\s*\{)/g, ' {');

module.exports = {
    include,
    sanitize
};
