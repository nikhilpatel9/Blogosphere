// models/notification.model.js
import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;
