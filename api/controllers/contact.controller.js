import Contact from '../models/contact.model.js';
import { incrementCount } from './count.controller.js';


export const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();
    await incrementCount('messages');

    const sendSSEUpdate = req.app.get('sendSSEUpdate');
    if (sendSSEUpdate) {
      sendSSEUpdate({ type: 'messages' });
    }
    res.status(200).json({ success: true, message: 'Contact form submitted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'You are not allowed to see messages' });
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const messages = await Contact.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalMessages = await Contact.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    const lastMonthMessages = await Contact.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      messages,
      totalMessages,
      lastMonthMessages,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'You are not allowed to delete messages' });
  try {
    const message = await Contact.findByIdAndDelete(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json({ message: 'Message has been deleted' });
  } catch (error) {
    next(error);
  }
};