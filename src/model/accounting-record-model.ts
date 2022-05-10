import { SupportedCoins } from './enums/supported-coins';
import { SupportedCryptoExchanges } from './enums/supported-crypto-exchanges';
import { SupportedFiatCurrencies } from './enums/supported-fiat-currencies';

export interface AccountingRecordAttributes {
    id: string;
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

export class AccountingRecord implements AccountingRecordAttributes {
    id: string;
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


    constructor ( id: string, coinType: SupportedCoins,
                  boughtAt: Date, soldAt: Date | null,
                  amount: number, soldAmount: number | null,
                  purchasingPrice: number, sellingPrice: number | null,
                  cryptoExchangeName: SupportedCryptoExchanges, transactionFiatCurrency: SupportedFiatCurrencies,
                  cryptoExchangeFee: number | null, transactionFee: number | null, createdBy: string, userId: string ) {
        this.id = id;
        this.coinType = coinType;
        this.boughtAt = boughtAt;
        this.soldAt = soldAt;
        this.amount = amount;
        this.soldAmount = soldAmount;
        this.purchasingPrice = purchasingPrice;
        this.sellingPrice = sellingPrice;
        this.cryptoExchangeName = cryptoExchangeName;
        this.transactionFiatCurrency = transactionFiatCurrency;
        this.cryptoExchangeFee = cryptoExchangeFee;
        this.transactionFee = transactionFee;
        this.createdBy = createdBy;
        this.userId = userId;
    }
}