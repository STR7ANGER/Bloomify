import express from "express";
import {
  placeOrder,
  userOrder,
  allOrder,
  orderStatus,
} from "../controller/orderController.js";
import authUser from "../middleware/userAuth.js";
import authSeller from "../middleware/sellerAuth.js";

const orderRouter = express.Router();

//user
//user place order
orderRouter.post("/place", authUser,placeOrder);
//get list or user orders
orderRouter.post("/userOrder", authUser,userOrder);


//seller
orderRouter.post("/all", authSeller,allOrder);
orderRouter.post("/status", authSeller,orderStatus);

export default orderRouter;
