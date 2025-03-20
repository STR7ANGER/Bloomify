import express from "express";
import { sellerLogin, sellerRegister } from "../controller/sellerController.js";

const sellerRouter = express.Router();

//to register seller
sellerRouter.post("/register", sellerRegister);

//to login seller
sellerRouter.post("/login", sellerLogin);

export default sellerRouter;
