import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import contactRoutes from './routes/contact.route.js';
import notificationRoutes from './routes/notification.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import countRoutes from './routes/count.route.js';
import { setupSSE } from './controllers/count.controller.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', countRoutes);

// Add SSE endpoint
app.get('/api/admin/count-updates', setupSSE);

app.use(express.static(path.join(__dirname, '/clint/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'clint', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});