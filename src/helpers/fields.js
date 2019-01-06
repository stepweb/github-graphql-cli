const include = (fields) => fields
    ? { fields }
    : {};

const sanitize = (fields = '') => JSON.stringify(fields, ' ', 4)
    .replace(/"|(?:\: true)/g, '')
    .replace(/(?:\: \{)/g, ' {');

module.exports = {
    include,
    sanitize
};
