import { Request, Response, NextFunction } from 'express';
import { ajv } from './ajv-instance';
import logger from '../loggers/logger';


export const reqAccountFilterValidation = (accountFilterSchema: object) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const isValid = ajv.compile(accountFilterSchema);
        const valid = isValid(req.body.filter);

        if (!valid) {
            const errors = isValid.errors;
            logger.error(`An error occured during validation of request body on endpoint ${req.originalUrl}, method ${req.method}`);
            return res.status(400).json(errors);
        }
        next();
    };
};