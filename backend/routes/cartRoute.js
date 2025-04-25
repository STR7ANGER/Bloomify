import express from "express";
import { addToCart, removeFromCart, updateCart, allCart } from "../controller/cartController.js";
import authUser from "../middleware/userAuth.js";

const router = express.Router();

// Cart routes with authentication middleware
router.post("/add", authUser, addToCart);
router.delete("/:userId/:cartItemId", authUser, removeFromCart);
router.put("/:userId/:cartItemId", authUser, updateCart);
router.get("/:userId", authUser, allCart);

export default router;