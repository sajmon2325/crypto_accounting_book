export const accountingRecordFilterSchemaValidation = {
    type: 'object',
    properties: {
        coinType: { type: 'string', enum: ['BITCOIN', 'ETHEREUM', 'LITECOIN', 'CARDANO', 'POLKADOT', 'SOLANA', 'BNB'], nullable: true },
        cryptoExchangeName: { type: 'string', enum: ['COINBASE', 'BINANCE', 'BLOCKFI', 'CRYPTO.COM'], nullable: true  },
        boughtAt: { type: 'string', format: 'date', nullable: true   }
    },
    additionalProperties: false
};
