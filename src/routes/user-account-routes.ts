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
import { reqAccountIdValidation } from '../validation/accountId-validation';
import { idSchemaValidation } from '../validation/schemas/id-schema';
import { userFilterSchemaValidation } from '../validation/schemas/user-filter-schema';
import { reqAccountFilterValidation } from '../validation/user-filter-validation';
import { reqUserUpdateValidation } from '../validation/user-update-validation';

const router = express.Router();

router.get('/count', countUserAccounts);
router.post('/create', reqUserValidation(userSchemaValidation), createUserAccount);
router.delete('/:accountId', reqAccountIdValidation(idSchemaValidation), deleteUserAccount);
router.get('/all', getAllUserAccounts);
router.get('/:accountId', reqAccountIdValidation(idSchemaValidation), getUserAccount);
router.post('/filter', reqAccountFilterValidation(userFilterSchemaValidation), getUserAccountByFilter);
router.put('/:accountId', reqAccountIdValidation(idSchemaValidation), reqUserUpdateValidation(userSchemaValidation), updateUserAccount);

export default router;

// TODO Make sure that in all handlers are covered cases where there is found nothing to delete/create/uypdate and app won't crash