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

const handleInputs = ({ inputs, fields, variables }, inputsAccumulator) => {
    if (!fields) {
        throw 'Error: No fields were specified\n';
    }

    const sanitizedInput = sanitizeInputs({ inputs, variables }).replace(/^{|}$/g, '');

    const args = sanitizedInput
        ? `(${ sanitizedInput })`
        : '';

    const sanitizedFields = Object.keys(fields)
        .filter(key => typeof fields[key] !== 'object'
            || (typeof fields[key] === 'object' && !inputs.hasOwnProperty(key)))
        .reduce((accumulator, key) => {
            accumulator[key] = fields[key];

            return accumulator;
        }, {});

    const unsanitizedInput = Object.keys(inputs)
        .filter(key => typeof inputs[key] === 'object')
        .reduce((accumulator, key) => {
            accumulator[key] = inputs[key];

            return accumulator;
        }, {});

    const t = Object.keys(unsanitizedInput).reduce((accumulator, key) => {
        if (variables) {
            throw new Error('Nested variables are not yet supported.');

            // This requires for us to correctly handle variables by passing them
            // to the recursive handleInputs() below.  This has not yet been done.
            // Open an feature request issue if this something you want - or
            // better yet: submit a PR :)
        }

        const {
            args,
            fields: updatedFields
        } = handleInputs({ inputs: unsanitizedInput[key], fields: fields[key] }, accumulator);

        accumulator[`${ key } ${ args }`] = updatedFields;

        return accumulator;
    }, {});

    const updatedFields = Object.assign({},
        sanitizedFields,
        t);

    return {
        args,
        fields: updatedFields
    };
};

module.exports = (queryName) => ({
    fields,
    inputs,
    variables
}) => {
    const {
        args,
        fields: updatedFields
    } = handleInputs({ inputs, fields, variables }, {});

    return format(`query ${ handleVariables({ inputs, variables }) } {
        ${ queryName } ${ args }
            ${ sanitizeFields(updatedFields) }
    }`);
};
