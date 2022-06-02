import express, { Request, Response } from 'express';
import config from './config/environment-config';
import bodyParser from 'body-parser';
import logger from './loggers/logger';

import loginRouter from './routes/auth-routes';
import userAccountRouter from './routes/user-account-routes';

const app = express();
const port = config.server.port;

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

// JUST FOR INITIAL TESTING PURPOSES - WILL BE DELETED LATER
app.get( '/', ( req: Request, res: Response ) => {
    return res.send( 'App is working correctly' );
} );

app.use('/api/auth', loginRouter );
app.use('/api/userAccount', userAccountRouter);

app.listen( port, async () => {
    logger.info( `Server is listening on port ${ port }` );
} );