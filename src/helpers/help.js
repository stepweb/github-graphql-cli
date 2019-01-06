const mutation = require('../commands/mutation');
const query = require('../commands/query');

const introspect = require('./introspect');

const { sortByKey } = require('./sort');

const typeMap = {
    Mutation: mutation,
    Query: query
};

const findOverrides = type => {
    const overrides = typeMap[type];

    return Object.keys(overrides).reduce((accumulator, definition) => {
        accumulator[definition] = overrides[definition].describe;

        return accumulator;
    }, {});
};

const fetchTypeCommands = type => async (args) => {
    const {
        personalToken
    } = args;

    const introspectType = `introspect${ type }`;

    if (!introspect.hasOwnProperty(introspectType)) {
        throw new Error('Unsupported type for introspection');
    }

    const types = await introspect[introspectType]({
        personalToken
    });

    const validTypeCommands = Object.keys(types).reduce((accumulator, command) => {
        const { description } = types[command];

        accumulator[command] = description;

        return accumulator;
    }, {});

    return sortByKey(Object.assign({},
        validTypeCommands,
        findOverrides(type)));
};

const fetchMutationCommands = fetchTypeCommands('Mutation');
const fetchQueryCommands = fetchTypeCommands('Query');

module.exports = {
    fetchMutationCommands,
    fetchQueryCommands
};
