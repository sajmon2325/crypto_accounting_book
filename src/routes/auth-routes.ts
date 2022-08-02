import express from 'express';
import { logInUser, logOutUser } from '../controllers/auth-controller';
import { createUserAccount } from '../controllers/user-account-controller';
import { userSchemaValidation } from '../validation/schemas/user-schema';
import { reqLoginValidation } from '../validation/user-login-validation';
import { reqUserValidation } from '../validation/user-validation';
import { userLoginSchemaValidation } from '../validation/schemas/user-login-schema';

const router = express.Router();

router.post( '/register', reqUserValidation(userSchemaValidation), createUserAccount );
router.post( '/login', reqLoginValidation(userLoginSchemaValidation), logInUser );
router.post( '/signout', logOutUser );

export default router;