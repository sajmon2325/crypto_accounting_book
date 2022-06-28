import { JSONSchemaType } from 'ajv';

export interface UserSchema {
    username: string;
    password: string;
    email: string;
    country?: string;
    accountingRecordId?: string;
}


export const userSchemaValidation: JSONSchemaType<UserSchema> = {
    type: 'object',
    properties: {
        username: { type: 'string', maxLength: 50 },
        password: { type: 'string', minLength: 6, maxLength: 100 },
        email: { type: 'string', format: 'email' },
        country: { type: 'string', nullable: true },
        accountingRecordId: { type: 'string', format: 'uuid', nullable: true }
    },
    required: ['username', 'password', 'email'],
    additionalProperties: false
};
