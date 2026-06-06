const express = require('express');
const store = require('../store');

const router = express.Router();

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const order = store.getOrder(id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.json(order);
});

module.exports = router;
