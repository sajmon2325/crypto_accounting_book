import { SupportedCoins } from "../model/enums/supported-coins";
import { SupportedCryptoExchanges } from "../model/enums/supported-crypto-exchanges";

export type UserAccountFilerOptions = {
    username?: string;
    password?: string;
    email?: string;
    country?: string;
    accountingRecordId?: string;
};

export type AccrountingRecordFilterOptions = {
    coinType?: SupportedCoins;
    cryptoExchangeName?: SupportedCryptoExchanges;
    boughtAt?: Date;
};

type filterOptions = UserAccountFilerOptions | AccrountingRecordFilterOptions;

export interface BaseRepositoryOperations<T> {

    createRecord ( item: T ): Promise<T>;

    updateRecord ( id: string, item: T ): Promise<T>;

    delete ( id: string ): Promise<string>;

    findOneRecord ( id: string ): Promise<T>;

    findAllRecords (): Promise<T[]>;

    findRecordsByFilter ( filter: filterOptions ): Promise<T[]>;

    countRecordsInCollection (): Promise<number>;
}