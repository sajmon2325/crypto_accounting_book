import { Collection, ObjectId } from "mongodb";
import { connectToDb } from "../database/db-connection";
import logger from "../loggers/logger";
import { AccountingRecord } from "../model/accounting-record-model";
import { AccrountingRecordFilterOptions, BaseRepositoryOperations, UserAccountFilerOptions } from "./base-repository-operations";

export class AccountingRecordRepository implements BaseRepositoryOperations<AccountingRecord> {

    private collection = 'accounting_records';

    countRecordsInCollection = async (): Promise<number> => {
        try {
            const recordsCollection: Collection = await connectToDb(this.collection);
            logger.info('Successfully retrieved number of all accounting record documents');
            return recordsCollection.countDocuments();
        } catch ( e ) {
            if ( e instanceof Error ) {
                logger.error(e.stack);
                throw new Error(e.message);
            }
        }
        return Promise.reject('Failed to count all user account documents');
    }

    createRecord = async (accountingRecord: AccountingRecord): Promise<AccountingRecord> =>  {
        try {
            const recordsCollection: Collection = await connectToDb(this.collection);
            const createdAccountingRecordId = await recordsCollection.insertOne(accountingRecord);
            const createdAccountingRecord = await recordsCollection.findOne<AccountingRecord>( { _id: createdAccountingRecordId.insertedId } );
            if (createdAccountingRecord) {
                logger.info(`Successfully created accounting record with id: ${createdAccountingRecordId.insertedId}`);
                return createdAccountingRecord;
            }
        } catch ( e ) {
            if ( e instanceof Error ) {
                logger.error(e.stack);
                throw new Error(e.message);
            }
        }
        return Promise.reject('Failed to create new accounting record');
    }

    delete = async (recordId: string): Promise<string> =>  {
        try {
            const recordsCollection: Collection = await connectToDb(this.collection);
            const existingAccountingRecord = await recordsCollection.findOne<AccountingRecord>( { _id: recordId } );
            if ( existingAccountingRecord ) {
                await recordsCollection.deleteOne( { _id: recordId } );
                logger.info(`Successfully deleted record with id: ${recordId}`);
                return recordId;
            }
        } catch ( e ) {
            if ( e instanceof Error ) {
                logger.error(e.stack);
                throw new Error(e.message);
            }
        }
        return Promise.reject(`Failed to delete accounting record with id: ${recordId}`);
    }

    findAllRecords = async (): Promise<AccountingRecord[]> => {
        try {
            const recordsCollection: Collection = await connectToDb(this.collection);
            const accountingRecords: AccountingRecord[] = await recordsCollection.find<AccountingRecord>( {} ).toArray();
            if ( accountingRecords.length > 0 ) {
                logger.info(`Successfully found all ${accountingRecords.length} accounting records`);
                return accountingRecords;
            }
        } catch ( e ) {
            if ( e instanceof Error ) {
                logger.error(e.stack);
                throw new Error(e.message);
            }
        }
        return Promise.reject('Failed to find all accounting records from database');
    }

    findOneRecord = async (recordId: string): Promise<AccountingRecord> => {
        try {
            const recordsCollection: Collection = await connectToDb(this.collection);
            const foundAccountingRecord = await recordsCollection.findOne<AccountingRecord>( { _id: recordId } );
            if ( foundAccountingRecord ) {
                logger.info(`Successfully found accounting record with id: ${recordId}`);
                return foundAccountingRecord;
            }
        } catch ( e ) {
            if ( e instanceof Error ) {
                logger.error(e.stack);
                throw new Error(e.message);
            }
        }
        return Promise.reject('Failed to find specified accounting record');
    }

    findRecordsByFilter = async (filter: AccrountingRecordFilterOptions): Promise<AccountingRecord[]> => {
        try {
            const recordsCollection: Collection = await connectToDb(this.collection);
            const accountingRecords: AccountingRecord[] = await recordsCollection.find<AccountingRecord>( { ...filter } ).toArray();
            if( accountingRecords.length > 0 ) {
                logger.info(`Succefully found ${accountingRecords.length} accounting records in database`);
                return accountingRecords;
            }
        } catch ( e ) {
            if ( e instanceof Error ) {
                logger.error(e.stack);
                throw new Error(e.message);
            } 
        }
        return Promise.reject('Failed to find records by specified filter');
    }

    updateRecord = async (recordId: string, update: AccountingRecord): Promise<AccountingRecord> =>  {
        try {
            const recordsCollection: Collection = await connectToDb(this.collection);
            if ( update ) {
                const updatedAccountingRecord = await recordsCollection.findOneAndUpdate( { _id: recordId }, { $set: update }, { returnDocument: 'after' } );
                if ( updatedAccountingRecord ) {
                    const accountingRecord: AccountingRecord = ( <AccountingRecord> updatedAccountingRecord.lastErrorObject );
                    logger.info(`Successfully updated accounting record with id: ${recordId}`);
                    return accountingRecord;
                }
            }
        } catch ( e ) {
            if ( e instanceof Error ) {
                logger.error(e.stack);
                throw new Error(e.message);
            }
        }
        return Promise.reject(`'Failed to update accounting record with id: ${recordId}'`);
    }
}