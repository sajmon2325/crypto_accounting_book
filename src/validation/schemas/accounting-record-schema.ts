export const accountingRecordSchemaValidation = {
    type: 'object',
    properties: {
        coinType: { type: 'string', enum: ['BITCOIN', 'ETHEREUM', 'LITECOIN', 'CARDANO', 'POLKADOT', 'SOLANA', 'BNB'] },
        boughtAt: { type: 'string', format: 'date' },
        soldAt: { type: 'string', format: 'date', nullable: true },
        amount: { type: 'number', minimum: 1 },
        soldAmount: { type: 'number', nullable: true },
        purchasingPrice: { type: 'number', minimum: 1 },
        sellingPrice: { type: 'number', nullable: true, minimum: 0 },
        cryptoExchangeName: { type: 'string', enum: ['COINBASE', 'BINANCE', 'BLOCKFI', 'CRYPTO.COM'] },
        transactionFiatCurrency: { type: 'string', enum: ['EURO', 'DOLLAR', 'POUND'] },
        cryptoExchangeFee: { type: 'number', nullable: true, minimum: 0 },
        transactionFee: { type: 'number', nullable: true, minimum: 0 },
        createdBy: { type: 'string', minLength: 3, maxLength: 50 },
        userId: { type: 'string', pattern:'^[a-f\\d]{24}$', nullable: false, }
    },
    required: ['coinType', 'boughtAt', 'amount', 'purchasingPrice',
     'cryptoExchangeName', 'transactionFiatCurrency', 'createdBy', 'userId'],
    additionalProperties: false
};

// https://ajv.js.org/guide/typescript.html - typescript compilation
// https://ajv.js.org/json-schema.html#enum - types