import express from 'express';
import { submitContact, getMessages, deleteMessage } from '../controllers/contact.controller.js';
import { verifyToken } from '../utills/verifyUser.js';

const router = express.Router();

router.post('/submit', submitContact);
router.get('/messages', verifyToken, getMessages);
router.delete('/delete/:messageId', verifyToken, deleteMessage);

export default router;