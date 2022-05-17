import { Request, Response } from 'express';
import { UserAccountRepository } from '../repository/user-account-repository';
import { UserAccount } from '../model/userAccount-model';

const userAccRepository = new UserAccountRepository();

export const registerUser = async ( req: Request, res: Response ) => {
    try {
        const newUserAccount: UserAccount = req.body.userAccount;
        const createdUserAcc: UserAccount = await userAccRepository.createRecord( newUserAccount );
        return res.status( 200 ).json( { userAccount: createdUserAcc, message: 'User account successfully created' } );
    } catch ( e ) {
        if ( e instanceof Error ) {
            res.status( 400 ).json( { message: 'Failed to create new user account', error: e.message } );
        }
    }
};

export const logInUser = async ( req: Request, res: Response ) => {

};

export const logOutUser = async ( req: Request, res: Response ) => {

};