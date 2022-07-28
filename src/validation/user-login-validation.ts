import { Request, Response, NextFunction } from 'express';
import logger from '../loggers/logger';
import { ajv } from './ajv-instance';

export const reqLoginValidation = (userLoginSchemaValidation: object) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const isValid = ajv.compile(userLoginSchemaValidation);
        const valid = isValid(req.body.userAccount);

        if (!valid) {
            const errors = isValid.errors;
            logger.error(`An error occured during validation of request body on endpoint ${req.originalUrl}, method ${req.method}`);
            return res.status(401).json(errors);
        }
        next();
    };
};