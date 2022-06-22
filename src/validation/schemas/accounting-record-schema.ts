import { JSONSchemaType } from 'ajv';
import { SupportedCoins } from '../../model/enums/supported-coins';
import { SupportedCryptoExchanges } from '../../model/enums/supported-crypto-exchanges';
import { SupportedFiatCurrencies } from '../../model/enums/supported-fiat-currencies';

interface AccountingRecordSchema {
    coinType: SupportedCoins;
    boughtAt: Date;
    soldAt: Date | null;
    amount: number;
    soldAmount: number | null;
    purchasingPrice: number;
    sellingPrice: number | null;
    cryptoExchangeName: SupportedCryptoExchanges;
    transactionFiatCurrency: SupportedFiatCurrencies;
    cryptoExchangeFee: number | null;
    transactionFee: number | null;
    createdBy: string;
    userId: string;
  }

export const accountingRecordSchemaValidation: JSONSchemaType<AccountingRecordSchema> = {
    type: 'object',
    propertie: {
        coinType: { type: 'string', enum: ['BITCOIN', 'ETHEREUM', 'LITECOIN', 'CARDANO', 'POLKADOT', 'SOLANA', 'BNB'] },
        boughtAt: { type: 'string', format: 'date' },
        soldAt: { type: 'string', format: 'date', nullable: true },
        amount: { type: 'number', minimum: 1 },
        soldAmount: { type: 'number', nullable: true },
        purchasingPrice: { type: 'number', minimum: 1 },
        sellingPrice: { type: 'number', nullable: true, minimum: 0 },
        cryptoExchangeName: { type: 'string', enum: ['COINBASE', 'BINANCE', 'BLOCKFI', 'CRYPTO.COM'] },
        transactionFiatCurrency: { type: 'number', enum: ['EURO', 'DOLLAR', 'POUND'], minimum: 0 },
        cryptoExchangeFee: { type: 'number', nullable: true, minimum: 0 },
        transactionFee: { type: 'number', nullable: true, minimum: 0 },
        createdBy: { type: 'string', minLength: 3, maxLength: 50 },
        userId: { type: 'string', format: 'uuid' }
    },
    required: ['coinType', 'boughtAt', 'amount', 'purchasingPrice',
     'cryptoExchangeName', 'transactionFiatCurrency', 'createdBy', 'userId'],
    additionalProperties: false
};

// https://ajv.js.org/guide/typescript.html - typescript compilation
// https://ajv.js.org/json-schema.html#enum - types