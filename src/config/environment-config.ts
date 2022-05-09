import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || '3000';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const MONGODB = {
    url: 'mongodb://localhost:27017',
    dbName: 'crypto_accounting_book',
};

const config = {
    server: SERVER,
    mongodb: MONGODB,
};

export default config;