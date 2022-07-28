import { NextFunction, Request, Response } from 'express';

export const jwtValidator = async (req: Request, res: Response, next: NextFunction) => {
    // validate if the token from session is valid
    
};