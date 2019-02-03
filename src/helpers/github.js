const { GraphQLClient } = require('graphql-request');

function connect({ personalToken }) {
    const endpoint = 'https://api.github.com/graphql';
    const accept = [
        'application/vnd.github.ocelot-preview+json',
        'application/vnd.github.starfire-preview+json'
    ].join(',');

    return new GraphQLClient(endpoint, {
        headers: {
            accept,
            authorization: `Bearer ${ personalToken }`
        }
    });
}

module.exports = {
    connect
};
