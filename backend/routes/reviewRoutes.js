import express from "express";
import {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Review
router.post("/", protect, addReview);

// Get Reviews for a Product
router.get("/:productId", getProductReviews);

// Update Review
router.put("/:reviewId", protect, updateReview);

// Delete Review
router.delete("/:reviewId", protect, deleteReview);

export default router;