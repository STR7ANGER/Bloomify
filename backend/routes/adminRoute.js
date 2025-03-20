import express from "express";
import { adminLogin } from "../controller/adminController.js";

const adminRouter = express.Router();

//To login Admin
adminRouter.post("/admin", adminLogin);

export default adminRouter;
