import { Router } from 'express';
import { getAllUsers } from '../controllers/admin.controller.js';

const router = Router();

router.route('/users').get(getAllUsers);

export default router;
