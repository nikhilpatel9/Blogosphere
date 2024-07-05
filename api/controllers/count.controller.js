import Count from '../models/count.model.js';

export const getNewCounts = async (req, res, next) => {
  try {
    const counts = await Count.find();
    const countsObject = counts.reduce((acc, curr) => {
      acc[curr.type] = curr.count;
      return acc;
    }, {});
    res.json(countsObject);
  } catch (error) {
    next(error);
  }
};

export const incrementCount = async (type) => {
  try {
    await Count.findOneAndUpdate(
      { type },
      { $inc: { count: 1 } },
      { upsert: true }
    );
  } catch (error) {
    console.error(`Error incrementing count for ${type}:`, error);
  }
};

export const resetCount = async (req, res, next) => {
  const { type } = req.params;
  try {
    await Count.findOneAndUpdate({ type }, { count: 0 }, { upsert: true });
    res.json({ message: `Count reset for ${type}` });
  } catch (error) {
    next(error);
  }
};

export const setupSSE = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Store the sendEvent function for use in other parts of your application
  req.app.set('sendSSEUpdate', sendEvent);

  // Handle client disconnect
  req.on('close', () => {
    // Clean up any resources if needed
  });
};