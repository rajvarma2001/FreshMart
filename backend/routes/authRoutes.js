import express from "express";

import {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getProfile,
  updateProfile,
  changePassword,
   getUserById,
  updateUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();


// Register Route
router.post("/register", registerUser);


// Login Route
router.post("/login", loginUser);


// Profile Route
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Admin Route
router.get("/users", protect, adminOnly, getAllUsers);
router.delete(  "/users/:id",  protect,  adminOnly,  deleteUser );

//update user
router.get(  "/users/:id",  protect,  adminOnly,  getUserById);

router.put( "/users/:id",  protect,  adminOnly, updateUser);
router.put(  "/change-password",  protect,  changePassword);


export default router;