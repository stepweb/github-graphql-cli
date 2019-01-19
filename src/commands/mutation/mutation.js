const { format } = require('../../helpers/format');
const { sanitize: sanitizeFields } = require('../../helpers/fields');
const { sanitize: sanitizeInputs } = require('../../helpers/inputs');

const {
    sanitize: sanitizeVariables,
    sift
} = require('../../helpers/variables');

const handleVariables = ({
    inputs,
    variables
}) =>
    variables
        ? `(${ sanitizeVariables(sift({ inputs, variables })) })`
        : '';

module.exports = (mutationName) => ({
    fields,
    inputs,
    variables
}) =>
    format(`mutation ${ handleVariables({ inputs, variables }) } {
        ${ mutationName }(input: ${ sanitizeInputs({ inputs, variables }).sanitized })
            ${ sanitizeFields(fields) }
    }`);
