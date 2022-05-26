import { UserAccount } from '../model/userAccount-model';
import logger from '../loggers/logger';
import { connectToDb } from '../database/db-connection';
import { BaseRepositoryOperations, UserAccountFilerOptions } from './base-repository-operations';
import { Collection, ObjectId } from 'mongodb';

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
            const createdUserAccount = await accountsCollection.findOne<UserAccount>( { $where: { _id: createdUserAccountId.insertedId } } );
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
        return Promise.reject( 'Failed to create new user account account' );
    }

    delete = async ( accountId: string ): Promise<string> => {
        try {
            const accountCollection: Collection = await connectToDb( this.collection );
            const existingUserAccount = await accountCollection.findOne<UserAccount>( { $where: { _id: new ObjectId( accountId ) } } );
            if ( existingUserAccount ) {
                await accountCollection.deleteOne( { $where: { _id: new ObjectId( accountId ) } } );
                logger.info( `Successfully deleted record with id: ${ accountId }` );
                return accountId;
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
            const foundUserAccount = await accountsCollection.findOne<UserAccount>( { $where: { _id: new ObjectId( accountId ) } } );

            if ( foundUserAccount ) {
                logger.info( `Successfully found user account with id: ${ accountId }` );
                return foundUserAccount;
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
                const updatedUserAccount = await accountsCollection.findOneAndUpdate( { $where: { _id: new ObjectId( accountId ) } }, { $set: update }, { returnDocument: 'after' } );
                if ( updatedUserAccount ) {
                    const userAccount: UserAccount = ( <UserAccount> updatedUserAccount.lastErrorObject );
                    logger.info( `Successfully updated record with id: ${ accountId }` );
                    return userAccount;
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