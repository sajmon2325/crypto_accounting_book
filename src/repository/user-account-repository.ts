import { UserAccount } from '../model/userAccount-model';
import logger from '../loggers/logger';
import { connectToDb } from '../database/db-connection';
import { BaseRepositoryOperations, UserAccountFilerOptions } from './base-repository-operations';
import { Collection, Filter, FindOneAndUpdateOptions, MatchKeysAndValues, ObjectId, UpdateFilter } from 'mongodb';

export class UserAccountRepository implements BaseRepositoryOperations<UserAccount> {

    private collection = 'accounts';

    countRecordsInCollection = async (): Promise<number> => {
        try {
            const accountsCollection: Collection = await connectToDb( this.collection );
            logger.info( 'Successfully retrieved number of all documents' );
            return accountsCollection.countDocuments();
        } catch ( e ) {
            if ( e instanceof Error ) {
                logger.error( e.stack );
                throw new Error( e.message );
            }
        }
        return Promise.reject( 'Failed to count all user account documents' );
    }

    createRecord = async ( userAccount: UserAccount ): Promise<UserAccount> => {
        try {
            const accountsCollection: Collection = await connectToDb( this.collection );
            const createdUserAccountId = await accountsCollection.insertOne( userAccount );
            const createdUserAccount = await accountsCollection.findOne<UserAccount>( { _id: createdUserAccountId.insertedId } );
            if ( createdUserAccount ) {
                logger.info( `Successfully created user account with id: ${ createdUserAccountId.insertedId }` );
                return createdUserAccount;
            }
        } catch ( e ) {
            if ( e instanceof Error ) {
                logger.error( e.stack );
                throw new Error( e.message );
            }
        }
        return Promise.reject( 'Failed to create new user account' );
    }

    delete = async ( accountId: string ): Promise<string | null> => {
        try {
            const accountCollection: Collection = await connectToDb( this.collection );
            const existingUserAccount = await accountCollection.findOne<UserAccount>( { _id: new ObjectId(accountId) } );
            logger.debug(`existingUserAccount ${existingUserAccount}`)
            if ( existingUserAccount ) {
                await accountCollection.deleteOne( { _id: new ObjectId(accountId) } );
                logger.info( `Successfully deleted record with id: ${ accountId }` );
                return accountId;
            } else {
                return null;
            }
        } catch ( e ) {
            if ( e instanceof Error ) {
                logger.error( e.stack );
                throw new Error( e.message );
            }
        }
        return Promise.reject( `Failed to delete user account with id: ${ accountId }` );
    }

    findAllRecords = async (): Promise<UserAccount[]> => {
        try {
            const accountCollection: Collection = await connectToDb( this.collection );
            const userAccounts: UserAccount[] = await accountCollection.find<UserAccount>( {} ).toArray();
            if ( userAccounts.length > 0 ) {
                logger.info( `Successfully found all ${ userAccounts.length } user account` );
                return userAccounts;
            }
        } catch ( e ) {
            if ( e instanceof Error ) {
                logger.error( e.stack );
                throw new Error( e.message );
            }
        }
        return Promise.reject( 'Failed to find all user account records from database' );
    }

    findOneRecord = async ( accountId: string ): Promise<UserAccount> => {
        try {
            const accountsCollection: Collection = await connectToDb( this.collection );
            const foundUserAccount = await accountsCollection.findOne<UserAccount>( { _id: new ObjectId(accountId) } );
            logger.debug(`accountId: ${accountId}`);
            logger.debug(`foundUserAccount: ${foundUserAccount}`);

            if ( foundUserAccount ) {
                logger.info( `Successfully found user account with id: ${ accountId }` );
                return foundUserAccount;
            }

            if ( !foundUserAccount ) {
                logger.info(`Record with accountId: ${accountId} was not found`);
                return {} as UserAccount;
            }
        } catch ( e ) {
            if ( e instanceof Error ) {
                logger.error( e.stack );
                throw new Error( e.message );
            }
        }

        return Promise.reject( 'Failed to find specified user account' );
    }

    findRecordsByFilter = async ( filter: UserAccountFilerOptions ): Promise<UserAccount[]> => {
        try {
            const accountsCollection: Collection = await connectToDb( this.collection );
            const userAccounts: UserAccount[] = await accountsCollection.find<UserAccount>( { ...filter } ).toArray();
            if ( userAccounts.length > 0 ) {
                logger.info( `Successfully found ${ userAccounts.length } user accounts in database` );
                return userAccounts;
            } else {
                logger.info(`Found ${userAccounts.length} accounting records in database`);
                return userAccounts;
            }
        } catch ( e ) {
            if ( e instanceof Error ) {
                logger.error( e.stack );
                throw new Error( e.message );
            }
        }
        return Promise.reject( 'Failed to find records by specified filter' );
    }

    updateRecord = async ( accountId: string, update: UserAccount ): Promise<UserAccount> => {
        try {
            const accountsCollection: Collection = await connectToDb( this.collection );
            if ( update ) {
                const filterOption = { _id: new ObjectId(accountId) } as Filter<UserAccount>;
                const updateOption = { $set: update as  MatchKeysAndValues<UserAccount> };
                const options = { returnDocument: 'after' } as FindOneAndUpdateOptions;

                await accountsCollection.findOneAndUpdate( filterOption, updateOption, options );
                const updatedUserAccount = await accountsCollection.findOne<UserAccount>({_id: new ObjectId(accountId)});

                if (  updatedUserAccount ) {
                    logger.debug( `Successfully updated record with id: ${ accountId }` );
                    return updatedUserAccount;
                } else {
                    logger.debug(`Failed to update record with id ${accountId}`);
                    return {} as UserAccount;
                }
            }
        } catch ( e ) {
            if ( e instanceof Error ) {
                logger.error( e.stack );
                throw new Error( e.message );
            }
        }
        return Promise.reject( `Failed to update record with id: ${ accountId }` );
    }
}