const capitalize = (text) =>
    typeof text === 'string'
        ? text.charAt(0).toUpperCase() + text.slice(1)
        : '';

module.exports = {
    capitalize
};
