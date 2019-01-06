const prettier = require('prettier');

const format = (source) => prettier.format(source, {
    semi: false,
    parser: 'graphql',
    tabWidth: 4
});

module.exports = {
    format
};
