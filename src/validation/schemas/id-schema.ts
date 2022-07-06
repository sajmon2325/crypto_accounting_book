import { JSONSchemaType } from 'ajv';

export const idSchemaValidation: JSONSchemaType<string> = {
    type: 'string',
    pattern: '^[a-f\\d]{24}$',
    nullable: false,
    additionalProperties: false
};