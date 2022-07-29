import { NextFunction, Request, Response } from 'express';
import logger from '../loggers/logger';
import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwt-config';


export const jwtValidator = async (req: Request, res: Response, next: NextFunction) => {
    // validate if the token from session is valid
    const token: string = req.cookies.token;
    logger.debug(`${JSON.stringify(token)}`);

    if (!token) {
        logger.error(`jwt token is not present in request header`);
        return res.status(401).json({ message: 'authentication token is not set' });
    }

    try {
        //verify() will throw an error if token is invalid
        jwt.verify(token, JWT_CONFIG.jwtKey );
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // json web token is unauthorized
            logger.error('Specified user is not authorized to perform this call');
            return res.status(401).json({ message: 'user is unauthorized' });
        }
        // bad request
        logger.error('Bad request, something went wrong :)');
        return res.status(400).json({ message: 'Bad request, something went wrong' });
    }
    
    logger.info('Validation of JWT was successfull');
    next();
};