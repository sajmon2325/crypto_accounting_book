import { Request, Response } from 'express';
import logger from '../loggers/logger';
import { UserAccount } from '../model/userAccount-model';
import { UserAccountRepository } from '../repository/user-account-repository';
import jwt, { SignOptions } from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwt-config';

const userAccountRepository = new UserAccountRepository();

export const logInUser = async ( req: Request, res: Response ) => {
    //verify that user exists in DB
    const username = req.body.userAccount.username;
    const password = req.body.userAccount.password;
    const email = req.body.userAccount.email;
    const existingUser = await userAccountRepository.findRecordByUsername(username);

    if (!verifyUserExists(existingUser)) {
        logger.error(`UserAccount with username: ${username} was not found`);
        return res.status(404).json({ message: `Record with username: ${username} was not found` });
    }

    if (!verifyCredentials(existingUser, password, email)) {
        logger.error(`Failed to log in user: ${username} - password or email doesn't match`);
        return res.status(401).json({ message: `Failed to log in user: ${username} - password or email doesn't match` });
    }

    // create and sign new jwt token
    const tokenOptions: SignOptions = { 
        algorithm: JWT_CONFIG.algorithm,
        expiresIn: JWT_CONFIG.jwtExpirySeconds,
    };
    const token = jwt.sign({ username, email }, JWT_CONFIG.jwtKey, tokenOptions);

    if (!token) {
        logger.error(`Failed to log in user with username: ${username} and email: ${email}`);
        res.status(401).json({ message: `Failed to login user with username: ${username}` });
    }

    res.status(200).cookie('token', token, { maxAge: JWT_CONFIG.jwtExpirySeconds * 1000 }).send({ token: token });
};

export const logOutUser = async ( req: Request, res: Response ) => {};

const verifyUserExists = (user: UserAccount) => {
    if (!user || Object.keys(user).length === 0) {
        return false;
    } else {
        return true;
    }
};

const verifyCredentials = async (user: UserAccount, password: string, email: string ) => {
    if (user.password !== password || user.email !== email) {
        return false;
    } else {
        return true;
    }
}