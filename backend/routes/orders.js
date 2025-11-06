const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/CartItem')

// POST /api/orders - create an order
router.post('/', async (req, res) => {
    try {
  const { items, totalAmount } = req.body;
  if (!items || !totalAmount) return res.status(400).json({ error: 'Missing order data' });
  
  
    const order = new Order({ items, totalAmount });
    await order.save();

    const productIds = items.map(i => i.productId);
    await Cart.deleteMany({ productId: { $in: productIds } });

    res.json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// GET /api/orders - get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
    .populate({
        path: 'items.productId',
        select: 'name price imageUrl description', 
      })
    .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
