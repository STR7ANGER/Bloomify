import express from "express";
import { allItems, getProductDetails } from "../controller/ProductController.js";

const productRoute = express.Router();

productRoute.get("/all", allItems);
productRoute.get("/details/:productId", getProductDetails);

export default productRoute;