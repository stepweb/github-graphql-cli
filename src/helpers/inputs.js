const util = require('util');

const include = (inputs) => inputs
    ? { inputs }
    : {};

const reducerResolver = ({ inputs, variables }) => variables
    ? variableReducer
    : valueReducer({ inputs, variables });

const sanitize = ({ inputs, variables }) => {
    if (!inputs) {
        return '';
    }

    const keys = Object.keys(inputs);

    const reducer = reducerResolver({
        inputs,
        variables
    });

    const inputsObject = keys.reduce(reducer, {});

    const variableOutput = util.inspect(inputsObject)
        .replace(/'/g, '"');

    return variableOutput;
};

const valueReducer = ({ inputs, variables }) => (accumulator, key) => {
    if (typeof inputs[key] !== 'object') {
        accumulator[key] = `${ inputs[key] }`;
    }

    return accumulator;
};

const variableReducer = (accumulator, key) => {
    accumulator[key] = `$${ key }`;

    return accumulator;
};

module.exports = {
    include,
    sanitize
};
