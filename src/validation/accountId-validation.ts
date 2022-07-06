import { Request, Response, NextFunction } from 'express';
import { JSONSchemaType } from 'ajv';
import { ajv } from './ajv-instance';
import logger from '../loggers/logger';

export const reqAccountIdValidation = (idSchema: JSONSchemaType<string>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const isValid = ajv.compile<string>(idSchema);
        const valid = isValid(req.params.accountId);

        if (!valid) {
            const errors = isValid.errors;
            logger.error(`An error occured during validation of request body on endpoint ${req.originalUrl}, method ${req.method}`);
            return res.status(400).json(errors);
        }
        next();
    }
};
