const {
    fields: { sanitize: sanitizeFields },
    format: { format }
} = require('../../../helpers');

module.exports = fields =>
    format(`query pullRequest($name: String!, $number: Int!, $owner: String!) {
        repository(owner:$owner, name:$name) {
            pullRequest(number:$number)
                ${ sanitizeFields(fields) }
        }
    }`);
