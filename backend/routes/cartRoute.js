import express from "express";
import {
  addToCart,
  updateCart,
  removeFromCart,
  getUserCart,
  clearCart
} from "../controller/cartController.js";
import authUser from "../middleware/userAuth.js";

const router = express.Router();

// Cart routes with authentication middleware
router.post("/add", authUser, addToCart);
router.put("/update", authUser, updateCart);
router.delete("/remove", authUser, removeFromCart);
router.get("/:userId", authUser, getUserCart);
router.delete("/clear/:userId", authUser, clearCart);

export default router;