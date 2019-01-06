const environment = process.env.NODE_ENV || 'dev';

const config = require(`./${ environment }`);

module.exports = {
    config
};
