// routes/notification.routes.js
import express from 'express';
const router = express.Router();
import { createNotification, getNotifications, updateNotification, deleteNotification } from '../controllers/notification.controller.js';
import { verifyToken } from '../utills/verifyUser.js';

router.post('/', verifyToken, createNotification);
router.get('/', getNotifications);
router.put('/:id', verifyToken, updateNotification);
router.delete('/:id', verifyToken, deleteNotification);

export default router;
