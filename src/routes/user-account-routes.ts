import express from 'express';
import { 
     countUserAccounts,
     createUserAccount,
     deleteUserAccount,
     getAllUserAccounts,
     getUserAccount,
     getUserAccountByFilter,
     updateUserAccount 
    } from '../controllers/user-account-controller';

const router = express.Router();

// TODO Add validation as a middleware

router.get('/count', countUserAccounts);
router.post('/create', createUserAccount);
router.delete('/:accountId', deleteUserAccount);
router.get('/all', getAllUserAccounts);
router.get('/:accountId', getUserAccount);
router.post('/filter', getUserAccountByFilter);
router.put('/:accountId', updateUserAccount);

export default router;