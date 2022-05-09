import { Collection, MongoClient } from 'mongodb';
import config from '../config/environment-config';
import logger from '../loggers/logger';

const url = config.mongodb.url;
const dbName = config.mongodb.dbName;

const client: MongoClient = new MongoClient( url );

export const connectToDb = async ( collectionName: string ): Promise<Collection> => {
    await client.connect();
    logger.debug( 'Successfully connected to db server' );
    const db = client.db( dbName );
    const collection = db.collection( collectionName );
    logger.debug( `Successfully connected to database ${ db.databaseName } and collection: ${ collection.collectionName }` );
    return collection;
};

