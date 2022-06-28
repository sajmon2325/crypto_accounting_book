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
import { reqUserValidation } from '../validation/user-validation';
import { userSchemaValidation } from '../validation/schemas/user-schema';

const router = express.Router();

router.get('/count', countUserAccounts);
router.post('/create', reqUserValidation(userSchemaValidation), createUserAccount);
router.delete('/:accountId', deleteUserAccount);
router.get('/all', getAllUserAccounts);
router.get('/:accountId', getUserAccount);
router.post('/filter', getUserAccountByFilter);
router.put('/:accountId', reqUserValidation(userSchemaValidation), updateUserAccount);

export default router;