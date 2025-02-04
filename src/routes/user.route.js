import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
    loginUser,
    logoutUser,
    registerUser,
    deleteUser,
    changePassword,
    updateUser,
} from '../controllers/user.controller.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/delete').post(verifyJWT, deleteUser);
router.route('/change-password').post(verifyJWT, changePassword);
router.route('/update').post(verifyJWT, updateUser);

export default router;
