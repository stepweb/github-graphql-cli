const github = require('../../helpers/github');

const { include: includeFields } = require('../../helpers/fields');
const { include: includeInputs } = require('../../helpers/inputs');
const { include: includeTypeChecking } = require('../../helpers/variables');

const { cast } = require('../../helpers/cast');
const { introspectInputs } = require('../../helpers/introspect');
const { capitalize } = require('../../helpers/string');

const builder = require('./builder');
const mutation = require('./mutation');

const {
    error,
    log
} = require('../../helpers/logger');

exports.command = 'mutation <command>';
exports.desc = 'Execute a mutation';
exports.builder = builder;

exports.handler = () => {
    console.log('No handler found');
};

exports.handlerFactory = command => async (argv) => {
    const {
        fields,
        inputs,
        owner: ownerName,
        personalToken,
        repo: repositoryName,
        types,
        verbose
    } = argv;

    log(`Executing mutation ${ command }`, verbose);

    const inputTypes = await introspectInputs({
        mutationName: `${ capitalize(command) }Input`,
        personalToken
    }, {
        $pullRequestId: 'ID!'
    });

    const castInputs = cast({
        inputs,
        types: inputTypes
    });

    const mutationOptions = Object.assign({},
        includeFields(fields),
        includeInputs(inputs),
        includeTypeChecking(types && inputTypes));

    const result = await github.connect({ personalToken })
        .request(mutation(command)(mutationOptions), castInputs)
        .catch(({ response: { errors } }) => {
            errors.forEach(({ message }) =>
                error(message)
            );
        });

    if (result) {
        console.log(result);
    }
};
