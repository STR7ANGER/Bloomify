import express from "express";
import {
  addItem,
  updateItem,
  removeItem,
  allItem,
  singleItem
} from "../controller/inventoryController.js";
import authSeller from "../middleware/sellerAuth.js";
import upload from "../middleware/upload.js";

const inventoryRouter = express.Router();

// Add items to inventory with file upload middleware
inventoryRouter.post("/add", authSeller, upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 }
]), addItem);

// Update items in the inventory with file upload middleware
inventoryRouter.put("/update/:productId/:type", authSeller, upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 }
]), updateItem);

// Remove items from the inventory
inventoryRouter.delete("/remove/:productId/:type", authSeller, removeItem);

// Get list of all items in the inventory
inventoryRouter.get("/all/:sellerId", authSeller, allItem);

// Get single item details
inventoryRouter.get("/item/:productId/:type", singleItem);

export default inventoryRouter;