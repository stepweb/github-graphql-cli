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

module.exports = (queryName) => ({
    fields,
    inputs,
    variables
}) => {
    const sanitizedInput = sanitizeInputs({ inputs, variables }).replace(/^{|}$/g, '');

    const args = sanitizedInput
        ? `(${ sanitizedInput })`
        : '';

    return format(`query ${ handleVariables({ inputs, variables }) } {
        ${ queryName } ${ args }
            ${ sanitizeFields(fields) }
    }`);
};
