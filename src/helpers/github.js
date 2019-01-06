const { GraphQLClient } = require('graphql-request');

function connect({ personalToken }) {
    const endpoint = 'https://api.github.com/graphql';

    return new GraphQLClient(endpoint, {
        headers: {
            accept: 'application/vnd.github.ocelot-preview+json',
            authorization: `Bearer ${ personalToken }`
        }
    });
}

module.exports = {
    connect
};
