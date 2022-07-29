import { Request, Response } from 'express';
import logger from '../loggers/logger';
import bcrypt from 'bcrypt';
import { UserAccount, UserAccountAttributes } from '../model/userAccount-model';
import { UserAccountFilerOptions } from '../repository/base-repository-operations';
import { UserAccountRepository } from '../repository/user-account-repository';

const userAccountRepository = new UserAccountRepository();

export const countUserAccounts = async (req: Request, res: Response) => { 
    const allUserAccounts = await userAccountRepository.countRecordsInCollection();
    logger.info(`Number of all user accounts in db: ${allUserAccounts}`);
    return res.status(200).json({ count: allUserAccounts, message: 'Successfully feteched count of all user accounts' });
};

export const createUserAccount = async (req: Request, res: Response) => {
    const userAccToCreate: UserAccountAttributes = req.body.userAccount;
    const encryptedPassword = await encryptPassword(userAccToCreate.password);

    if (!encryptedPassword || encryptedPassword instanceof Error) {
        logger.error(`Failed to encrypt password for user: ${userAccToCreate.username}`);
        throw new Error(`Failed to encrypt password for user: ${userAccToCreate.username}`);
    } else {
        userAccToCreate.password = encryptedPassword;
    }

    const createdUserAccount: UserAccount = await userAccountRepository.createRecord(userAccToCreate);
    if (!createdUserAccount) {
        logger.error(`Failed to create new user account with username: ${userAccToCreate.username}`);
        return res.status(500).json({ message: 'Create new user account failed' });
    }

    logger.info(`Successfully created new user account with username: ${createdUserAccount.username}`);
    return res.status(200).json({ createdUser: createdUserAccount, message: 'Successfully created user account' });
};

export const deleteUserAccount = async (req: Request, res: Response) => {
    const userAccountId = req.params.accountId;
    logger.debug(`userAccountId: ${userAccountId}`);

    const deletedAccountId = await userAccountRepository.delete(userAccountId);
    if (!deletedAccountId || deleteUserAccount === null) {
        logger.error(`Failed to delete user account with id: ${userAccountId}`);
        return res.status(500).json({ message: 'Deleting user account failed' });
    }

    logger.info(`Successfully deleted user account with id: ${deletedAccountId}`);
    return res.status(200).json({ accountId: deletedAccountId, message: 'Successfully deleted user account' });
};

export const getAllUserAccounts = async (req: Request, res: Response) => {
    const userAccounts: UserAccount[] = await userAccountRepository.findAllRecords();

    if (!userAccounts) {
        logger.error('Failed to fetch all user accounts');
        return res.status(500).json({ message: 'Failed to fetch all user accounts' });
    }

    logger.info('Successfully fetched all user accounts');
    return res.status(200).json({ userAccounts: userAccounts, message: 'Successfully fetched all user accounts' });
};

export const getUserAccount = async (req: Request, res: Response) => {
    const accountId = req.params.accountId;

    const userAccount: UserAccount = await userAccountRepository.findOneRecord(accountId);
    if (!userAccount) {
        logger.error(`Failed to fetch user account with id: ${accountId}`);
        return res.status(500).json({ message: `Failed to fetch user account with id: ${accountId}` });
    }

    if (Object.keys(userAccount).length === 0) {
        logger.error(`Record with accountId: ${accountId} was not found`);
        return res.status(404).json({ message: `Record with accountId: ${accountId} was not found` });
    }
    
    logger.info(`Successfully fetched user account with username: ${userAccount.username}`);
    return res.status(200).json({ userAccount: userAccount, message: `Successfully fetched user account with username: ${userAccount.username}` });
};

export const getUserAccountByFilter = async (req: Request, res: Response) => {
    const filter: UserAccountFilerOptions = req.body.filter;

    const userAccounts: UserAccount[] = await userAccountRepository.findRecordsByFilter(filter);
    if (!userAccounts || userAccounts.length === 0) {
        logger.error('No accounting records found with specified filter');
        return res.status(404).json({ message: 'No accounting records found with specified filter' });
    }

    logger.info('Successfully fetched user accounts by specified filter');
    return res.status(200).json({ userAccounts: userAccounts, message: 'Successfully fetched user accounts by specified filter' });
};

export const updateUserAccount = async (req: Request, res: Response) => {
    const accountId = req.params.accountId;
    const update: UserAccount = req.body.update;
    
    const updatedUserAccount: UserAccount = await userAccountRepository.updateRecord(accountId, update);
    if (!updatedUserAccount || Object.keys(updatedUserAccount).length === 0) {
        logger.error('Failed to update user account');
        return res.status(404).json({ message: 'Failed to update user account' });
    }

    logger.info(`Successfully updated user account with username: ${updatedUserAccount.username}`);
    return res.status(200).json({ updatedUserAccount: updatedUserAccount, message: `Successfully updated user account with username: ${updatedUserAccount.username}` });
};

const encryptPassword = async (password: string) => {
    const saltRounds = 10;
    try {
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        logger.info(`Password encryptes successfully: ${password}`);
        return encryptedPassword;
    } catch (e) {
        if (e instanceof Error) {
            logger.error('Failed to hash password');
            return new Error(`Failed to encrypt password, ${e.message}`);
        }
    }
}