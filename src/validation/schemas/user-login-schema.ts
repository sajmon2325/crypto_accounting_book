import { JSONSchemaType } from 'ajv';

export interface LoginSchema {
    username: string;
    password: string;
    email: string;
}


export const userLoginSchemaValidation: JSONSchemaType<LoginSchema> = {
    type: 'object',
    properties: {
        username: { type: 'string', maxLength: 50 },
        password: { type: 'string', minLength: 6, maxLength: 100 },
        email: { type: 'string', format: 'email' },
    },
    required: ['username', 'password', 'email'],
    additionalProperties: true
};