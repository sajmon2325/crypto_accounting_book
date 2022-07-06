import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export const ajv: Ajv = new Ajv({
    allErrors: true,
    coerceTypes: true,
    removeAdditional: true,
    useDefaults: true
});

addFormats(ajv);