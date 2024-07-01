import express from 'express';
const router = express.Router();
import { createNotification, getNotifications, updateNotification, deleteNotification, markAllAsRead } from '../controllers/notification.controller.js';
import { verifyToken } from '../utills/verifyUser.js';

router.post('/create', verifyToken, createNotification);
router.get('/getNotifications', getNotifications);
router.put('/update/:id', verifyToken, updateNotification);
router.delete('/delete/:id', verifyToken, deleteNotification);
router.post('/markAllAsRead', markAllAsRead);


export default router;
