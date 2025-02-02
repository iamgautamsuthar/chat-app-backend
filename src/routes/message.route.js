import {
    getMessages,
    deleteMessage,
    editMessage,
} from '../controllers/message.controller.js';
import { Router } from 'express';

const router = Router();

router.route('/get').post(getMessages);
router.route('/delete').post(deleteMessage);
router.route('/edit').post(editMessage);

export default router;
