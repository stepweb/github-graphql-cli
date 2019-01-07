const github = require('./github');

const introspectInputs = async ({ personalToken, mutationName }, overrides) => {
    const introspect = await github.connect({ personalToken })
        .request(`query {
            __type(name: "${ mutationName }") {
                inputFields {
                    name
                    type {
                        name
                        ofType {
                          name
                        }
                    }
                }
            }
        }`);

    const types = introspect.__type.inputFields.reduce((accumulator, input) => {
        accumulator[`$${ input.name }`] = input.type.name || input.type.ofType.name;

        return accumulator;
    }, {});

    return Object.assign({},
        types,
        overrides);
};

const introspectType = (type) => async ({ personalToken }) => {
    const introspect = await github.connect({ personalToken })
        .request(`query {
            __type(name: "${ type }") {
                fields {
                    name
                    description
                }
            }
        }`);

    return introspect.__type.fields.reduce((accumulator, field) => {
        const {
            description,
            name
        } = field;

        accumulator[name] = {
            description
        };

        return accumulator;
    }, {});
};

const introspectMutation = introspectType('Mutation');
const introspectQuery = introspectType('Query');

module.exports = {
    introspectInputs,
    introspectMutation,
    introspectQuery,
    introspectType
};
