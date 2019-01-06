const include = (types) => types
    ? { variables: types }
    : {};

const sanitize = variables => {
    const keys = Object.keys(variables);
    const variablesParams = keys.map(key => `${ key }:${ variables[key] }`);

    return JSON.stringify(variablesParams.join(', '), ' ', 4)
        .replace(/(?:"|')/g, '');
};

const sift = ({
    inputs,
    variables
}) => Object.keys(inputs).reduce((accumulator, inputVariable) => {
    accumulator[`$${ inputVariable }`] = variables[`$${ inputVariable }`];

    return accumulator;
}, {});

module.exports = {
    include,
    sanitize,
    sift
};
