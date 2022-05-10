export interface BaseRepositoryOperations<T> {

    createRecord ( item: T ): Promise<T>;

    updateRecord ( id: string, item: T ): Promise<T>;

    delete ( id: string ): Promise<string>;

    findOneRecord ( id: string ): Promise<T>;

    findAllRecords (): Promise<T[]>;

    findRecordsByFilter ( filter: T ): Promise<T[]>;

    countRecordsInCollection (): Promise<number>;
}