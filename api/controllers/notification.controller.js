import Notification from '../models/notification.model.js';
import { incrementCount } from './count.controller.js';

// ... existing code ...

export const createNotification = async (req, res, next) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Notification message is required' });
  }

  try {
    const newNotification = new Notification({ message });
    const savedNotification = await newNotification.save();
    await incrementCount('notifications');

    const sendSSEUpdate = req.app.get('sendSSEUpdate');
    if (sendSSEUpdate) {
      sendSSEUpdate({ type: 'notifications' });
    }
    res.status(201).json(savedNotification);
  } catch (error) {
    next(error);
  }
};

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

export const updateNotification = async (req, res, next) => {
  const { id } = req.params;
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Notification message is required' });
  }

  try {
    const updatedNotification = await Notification.findByIdAndUpdate(id, { message }, { new: true });
    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json(updatedNotification);
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    next(error);
  }
};
export const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ read: false }, { $set: { read: true } });
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    next(error);
  }
};