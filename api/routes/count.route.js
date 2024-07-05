import express from 'express';
import { getNewCounts, resetCount, setupSSE } from '../controllers/count.controller.js';

const router = express.Router();

router.get('/new-counts', getNewCounts);
router.post('/reset-count/:type', resetCount);
router.get('/count-updates', setupSSE);

export default router;