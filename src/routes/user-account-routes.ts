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
router.delete('/:id', deleteUserAccount);
router.get('/all', getAllUserAccounts);
router.get('/:id', getUserAccount);
router.get('/filter', getUserAccountByFilter);
router.put('/:id', updateUserAccount);

export default router;