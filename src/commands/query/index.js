const github = require('../../helpers/github');

const { include: includeFields } = require('../../helpers/fields');
const { include: includeInputs } = require('../../helpers/inputs');
const {
    error,
    log
} = require('../../helpers/logger');

const builder = require('./builder');
const query = require('./query');

exports.command = 'query <command>';
exports.desc = 'Execute a query';
exports.builder = builder;

exports.handler = () => {
    console.log('No handler found');
};

exports.handlerFactory = command => async (argv) => {
    const {
        dry,
        fields,
        inputs,
        owner: ownerName,
        personalToken,
        repo: repositoryName,
        verbose
    } = argv;

    log(`Executing query ${ command }`, verbose);

    const queryOptions = Object.assign({},
        includeFields(fields),
        includeInputs(inputs));

    const gql = query(command)(queryOptions);

    if (dry) {
        console.log(gql);

        return;
    }

    const result = await github.connect({ personalToken })
        .request(gql)
        .catch(({ response: { errors } }) => {
            errors.forEach(({ message }) =>
                error(message)
            );
        });

    if (result) {
        console.log(JSON.stringify(result, ' ', 2));
    }
};
