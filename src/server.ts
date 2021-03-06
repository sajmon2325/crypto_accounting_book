import express from 'express';
import config from './config/environment-config';
import bodyParser from 'body-parser';
import logger from './loggers/logger';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth-routes';
import userAccountRouter from './routes/user-account-routes';
import accountingRecordRouter from './routes/accounting-record-routes';

const app = express();
const port = config.server.port;

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use(cookieParser());

app.use('/api/auth', authRouter );
app.use('/api/userAccount', userAccountRouter);
app.use('/api/accountingRecord', accountingRecordRouter);

app.listen( port, async () => {
    logger.info( `Server is listening on port ${ port }` );
} );