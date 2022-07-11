import { Request, Response, NextFunction } from 'express';
import { UserSchema } from './schemas/user-schema';
import { JSONSchemaType } from 'ajv';
import { ajv } from './ajv-instance';
import logger from '../loggers/logger';


export const reqUserUpdateValidation = (userSchema: JSONSchemaType<UserSchema>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const isValid = ajv.compile<UserSchema>(userSchema);
        const valid = isValid(req.body.update);

        if (!valid) {
            const errors = isValid.errors;
            logger.error(`An error occured during validation of request body on endpoint ${req.originalUrl}, method ${req.method}`);
            return res.status(400).json(errors);
        }
        next();
    };
};