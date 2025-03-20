import express from "express";
import { userLogin, userRegister } from "../controller/userController.js";

const userRouter = express.Router();

//to register user
userRouter.post("/register", userRegister);

//to login user
userRouter.post("/login", userLogin);

export default userRouter;
