const typeMap = {
    Boolean: Boolean,
    Float: Number,
    ID: String,
    Int: Number,
    String: String
};

const cast = ({ inputs, types }) => Object.keys(inputs).reduce((accumulator, input) => {
    const type = types[`$${ input }`];
    const typeCast = typeMap[type.replace(/!$/, '')];

    accumulator[input] = typeCast
        ? typeCast(inputs[input])
        : inputs[input];

    return accumulator;
}, {});

module.exports = {
    cast
};
