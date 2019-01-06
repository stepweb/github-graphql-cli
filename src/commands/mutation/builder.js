const mutation = require('./index');

const builder = (yargs) => {
    const commands = MUTATION_COMMANDS;

    yargs
        .scriptName('')
        .updateStrings({
            'Commands:': 'Mutation Commands:'
        })
        .option('fields', {
            alias: 'f',
            demandOption: true,
            describe: 'Dot notation definition of which fields to return'
        })
        .option('inputs', {
            alias: 'i',
            demandOption: true,
            describe: 'Dot notation definition of variables to pass as inputs'
        });

    return Object.keys(commands).reduce((accumulator, command) => {
        accumulator
            .command({
                command,
                describe: commands[command],
                handler: mutation.handlerFactory(command)
            });

        return accumulator;
    }, yargs);
};

module.exports = builder;
