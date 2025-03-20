import express from "express";
import {
  addItem,
  updateItem,
  removeItem,
  allItem,
} from "../controller/inventoryController.js";
import authSeller from "../middleware/sellerAuth.js";

const inventoryRouter = express.Router();

//add items to inventory
inventoryRouter.post("/add", authSeller, addItem);

//updates items in the inventory
inventoryRouter.post("/update", authSeller, updateItem);

//remove items from the inevntory
inventoryRouter.post("/remove", authSeller, removeItem);

//get list of all items in the inevntory
inventoryRouter.post("/all", authSeller, allItem);

export default inventoryRouter;
