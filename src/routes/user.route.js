import { Router } from 'express';
import {
    loginUser,
    logoutUser,
    registerUser,
    deleteUser,
    changePassword,
    updateUser,
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/delete').post(verifyJWT, deleteUser);
router.route('/change-password').post(verifyJWT, changePassword);
router.route('/update').post(verifyJWT, updateUser);

export default router;
