const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// GET /api/cart - get all cart items with product details and total price
router.get('/', async (req, res) => {
  try {
    const items = await CartItem.find().populate('productId');
    let total = 0;

    const detailedItems = items.map(item => {
      const product = item.productId;
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      return { id: item._id, product, quantity: item.quantity, itemTotal };
    });

    res.json({ items: detailedItems, total });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart - add or update product quantity
router.post('/', async (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty) {
    return res.status(400).json({ error: 'productId and qty required' });
  }

  try {
    let cartItem = await CartItem.findOne({ productId });

    if (cartItem) {
      cartItem.quantity += qty;
    } else {
      cartItem = new CartItem({ productId, quantity: qty });
    }

    await cartItem.save();
    res.json({ message: 'Added to cart', cartItem });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// PUT /api/cart/:id - update cart item quantity
router.put('/:id', async (req, res) => {
  const { qty } = req.body;
  try {
    const cartItem = await CartItem.findById(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    cartItem.quantity = qty;
    await cartItem.save();
    res.json({ message: 'Cart updated', cartItem });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// DELETE /api/cart/:id - remove cart item
router.delete('/:id', async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json({ message: 'Removed from cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
});

module.exports = router;
