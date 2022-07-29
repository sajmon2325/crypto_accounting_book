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
import { jwtValidator } from '../middleware/jws-validator';

const router = express.Router();

router.get('/count', jwtValidator, countUserAccounts);
router.post('/create', jwtValidator, reqUserValidation(userSchemaValidation), createUserAccount);
router.delete('/:accountId', jwtValidator, reqAccountIdValidation(idSchemaValidation), deleteUserAccount);
router.get('/all', jwtValidator, getAllUserAccounts);
router.get('/:accountId', jwtValidator, reqAccountIdValidation(idSchemaValidation), getUserAccount);
router.post('/filter', jwtValidator, reqAccountFilterValidation(userFilterSchemaValidation), getUserAccountByFilter);
router.put('/:accountId', jwtValidator, reqAccountIdValidation(idSchemaValidation), reqUserUpdateValidation(userSchemaValidation), updateUserAccount);

export default router;