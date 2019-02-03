#!/usr/bin/env node

const yargs = require('yargs');

const {
    personalToken
} = require('./src/config');

const {
    help: {
        fetchMutationCommands,
        fetchQueryCommands
    }
} = require('./src/helpers');

(async () => {
    // Unfortunately we need to front-load all possible commands for help since
    // yargs doesn't support async builder functions yet.
    global.MUTATION_COMMANDS = await fetchMutationCommands({ personalToken });
    global.QUERY_COMMANDS = await fetchQueryCommands({ personalToken });

    yargs
        .config({
            personalToken
        })
        .commandDir('src/commands/')
        .option('dry', {
            alias: 'd',
            describe: 'Prints out GraphQL command without running it'
        })
        .option('owner', {
            alias: 'o',
            demandOption: true,
            describe: 'Owner of repository'
        })
        .option('repo', {
            alias: 'r',
            demandOption: true,
            describe: 'Name of repository'
        })
        .option('types', {
            alias: 't',
            describe: 'Perform type checking'
        })
        .option('verbose', {
            alias: 'v',
            describe: 'Verbose'
        })
        .demandCommand()
        .help()
        .argv;
})();
