export type UserAccountFilerOptions = {
    username?: string;
    password?: string;
    email?: string;
    country?: string;
    accountingRecordId?: string;
};

export interface BaseRepositoryOperations<T> {

    createRecord ( item: T ): Promise<T>;

    updateRecord ( id: string, item: T ): Promise<T>;

    delete ( id: string ): Promise<string>;

    findOneRecord ( id: string ): Promise<T>;

    findAllRecords (): Promise<T[]>;

    findRecordsByFilter ( filter: UserAccountFilerOptions ): Promise<T[]>;

    countRecordsInCollection (): Promise<number>;
}