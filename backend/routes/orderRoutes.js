import express from "express";
import {
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} from "../controllers/orderController.js";

const router = express.Router();

// Place Order
router.post("/place", placeOrder);

// Get All Orders of a User
router.get("/user/:userId", getUserOrders);

// Get Single Order
router.get("/", getAllOrders);
router.get("/:id", getOrderById);

// Update Order Status (Admin)
router.put("/:id/status", updateOrderStatus);

export default router;