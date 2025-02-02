import { Router } from 'express';
import {
    loginUser,
    logoutUser,
    registerUser,
    deleteUser,
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/delete').post(verifyJWT, deleteUser);

export default router;
