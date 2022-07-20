import express from 'express';
import { logInUser, logOutUser, registerUser } from '../controllers/auth-controller';

const router = express.Router();

router.post( '/register', registerUser );
router.post( '/login', logInUser );
//router.post( '/signout', logOutUser );

export default router;