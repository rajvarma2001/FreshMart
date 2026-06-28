import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add product to cart
router.post("/add", protect, addToCart);

// Get user's cart
router.get("/:userId", protect, getCart);

// Update quantity
router.put("/update", protect, updateCartItem);

// Remove item from cart
router.delete("/remove", protect, removeCartItem);

// Clear cart
router.delete("/clear", protect, clearCart);

export default router;