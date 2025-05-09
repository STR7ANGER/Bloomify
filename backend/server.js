import express from "express";
import cors from "cors";
import "dotenv/config";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";
import cartRouter from "./routes/cartRoute.js";
import inventoryRouter from "./routes/inventoryRoute.js";
import orderRouter from "./routes/orderRouter.js";
import sellerRouter from "./routes/sellerRoute.js";
import userRouter from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";

// App config
const app = express();
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/cart", cartRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/order", orderRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log("Server started on Port: " + port));
