const express = require('express');
const store = require('./store');
const ordersRouter = require('./routes/orders');

function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/setup', (req, res) => {
    const state = req.body.state;

    switch (state) {
      case 'an order with id 1 exists':
        store.reset();
        store.seedOrder();
        break;
      case 'order 1 does not exist':
        store.reset();
        break;
      default:
        return res.status(500).json({ error: `Unknown provider state: ${state}` });
    }

    res.status(200).end();
  });

  app.use('/orders', ordersRouter);

  return app;
}

module.exports = { createApp };
