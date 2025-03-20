import express from "express";
import {
  addToCart,
  removeFromCart,
  updateCart,
  allCart,
} from "../controller/cartController.js";
import authUser from "../middleware/userAuth.js";

const cartRouter = express.Router();


//add item to user cart
cartRouter.post("/add",authUser, addToCart);

//remove item from user cart
cartRouter.post("/remove",authUser, removeFromCart);

//update items in user cart
cartRouter.post("/update",authUser, updateCart);

//get the list of current user cart
cartRouter.post("/all",authUser, allCart);

export default cartRouter;
