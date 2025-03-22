import express from "express";
import {
  adminLogin,
  diliveryFee,
  userFee,
  sellerFee,
  adsFee,
} from "../controller/adminController.js";

const adminRouter = express.Router();

//To login Admin
adminRouter.post("/admin", adminLogin);
//To update dilivery fees
adminRouter.post("/dilivery", diliveryFee);
//To update user fees
adminRouter.post("/user", userFee);
//To updates seller sub fees
adminRouter.post("/seller", sellerFee);
//To update ads fees
adminRouter.post("/ads", adsFee);

export default adminRouter;
