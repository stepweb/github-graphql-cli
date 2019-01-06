const query = require('./index');

const builder = (yargs) => {
    const commands = QUERY_COMMANDS;

    yargs.commandDir('pullRequest', {
        include: /index\.js/
    })
        .scriptName('')
        .updateStrings({
            'Commands:': 'Query Commands:'
        });

    return Object.keys(commands).reduce((accumulator, command) => {
        accumulator
            .command({
                command,
                describe: commands[command],
                handler: query.handlerFactory(command)
            });

        return accumulator;
    }, yargs);
};

module.exports = builder;
