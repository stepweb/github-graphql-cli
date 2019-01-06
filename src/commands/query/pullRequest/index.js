const {
    github,
    logger: { log }
} = require('../../../helpers');

const builder = require('./builder');
const query = require('./query');

exports.aliases = 'pr';
exports.command = 'pullRequest <id>';
exports.desc = 'Get details about a pull request';
exports.builder = builder;

exports.handler = async (argv) => {
    const {
        fields,
        id: pullRequestId,
        owner: ownerName,
        personalToken,
        repo: repositoryName,
        verbose
    } = argv;

    log(`Fetching details for pull request ${ pullRequestId }`, verbose);

    const result = await github.connect({ personalToken })
        .request(query(fields), {
            name: repositoryName,
            number: pullRequestId,
            owner: ownerName
        });

    const data = result.repository.pullRequest;

    console.log(data);
};
