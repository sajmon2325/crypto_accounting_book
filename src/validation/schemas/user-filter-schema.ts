export const userFilterSchemaValidation = {
    type: 'object',
    properties: {
        username: { type: 'string', maxLength: 50, nullable: true },
        password: { type: 'string', minLength: 6, maxLength: 100, nullable: true },
        email: { type: 'string', format: 'email', nullable: true },
        country: { type: 'string', nullable: true },
        accountingRecordId: { type: 'string', format: 'uuid', nullable: true }
    },
    additionalProperties: false
};
