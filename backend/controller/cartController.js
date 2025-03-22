import userModel from "../models/userModel.js";
import flowerModel from "../models/flowerModel.js";
import artModel from "../models/artModel.js";
import toolModel from "../models/toolModel.js";
import mongoose from "mongoose";

// Helper function to determine which model to use based on product type
const getModelByType = (type) => {
  if (type === "flower" || type === "plant") return flowerModel;
  if (type === "art") return artModel;
  if (type === "tools") return toolModel;
  return null;
};

//Add item to user Cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, productType, quantity = 1 } = req.body;

    if (!userId || !productId || !productType) {
      return res.status(400).json({
        success: false,
        message: "User ID, product ID, and product type are required"
      });
    }

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID or product ID"
      });
    }

    // Validate quantity
    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive number"
      });
    }

    // Get user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Get product
    const productModel = getModelByType(productType);
    if (!productModel) {
      return res.status(400).json({
        success: false,
        message: "Invalid product type"
      });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Initialize cartData if empty
    if (!user.cartData) {
      user.cartData = {};
    }

    // Create a cart item entry
    const cartItem = {
      productId,
      productType,
      quantity,
      price: product.price,
      name: product.name,
      image: product.image[0], // Store first image for cart display
      totalPrice: product.price * quantity,
      addedAt: new Date()
    };

    // Generate a unique cart item ID
    const cartItemId = new mongoose.Types.ObjectId().toString();
    
    // Add to cart
    user.cartData[cartItemId] = cartItem;
    
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      cartItemId,
      cartItem
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding item to cart",
      error: error.message
    });
  }
};

//Remove item from user cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, cartItemId } = req.params;

    if (!userId || !cartItemId) {
      return res.status(400).json({
        success: false,
        message: "User ID and cart item ID are required"
      });
    }

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    // Get user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if cart has the item
    if (!user.cartData || !user.cartData[cartItemId]) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart"
      });
    }

    // Remove item from cart
    delete user.cartData[cartItemId];
    
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Item removed from cart successfully"
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while removing item from cart",
      error: error.message
    });
  }
};

//Update the user cart item
const updateCart = async (req, res) => {
  try {
    const { userId, cartItemId } = req.params;
    const { quantity } = req.body;

    if (!userId || !cartItemId) {
      return res.status(400).json({
        success: false,
        message: "User ID and cart item ID are required"
      });
    }

    if (quantity === undefined || isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid quantity is required"
      });
    }

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    // Get user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if cart has the item
    if (!user.cartData || !user.cartData[cartItemId]) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart"
      });
    }

    // Update item quantity
    user.cartData[cartItemId].quantity = quantity;
    user.cartData[cartItemId].totalPrice = user.cartData[cartItemId].price * quantity;
    
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      cartItem: user.cartData[cartItemId]
    });
  } catch (error) {
    console.error("Update cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating cart item",
      error: error.message
    });
  }
};

//Get all cart items of the user
const allCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    // Get user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // If cart is empty
    if (!user.cartData || Object.keys(user.cartData).length === 0) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cartItems: [],
        totalItems: 0,
        totalAmount: 0
      });
    }

    // Prepare cart items for response
    const cartItems = [];
    let totalAmount = 0;

    for (const [itemId, item] of Object.entries(user.cartData)) {
      cartItems.push({
        cartItemId: itemId,
        ...item
      });
      totalAmount += item.totalPrice;
    }

    // Sort by added date (newest first)
    cartItems.sort((a, b) => {
      return new Date(b.addedAt) - new Date(a.addedAt);
    });

    return res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      cartItems,
      totalItems: cartItems.length,
      totalAmount
    });
  } catch (error) {
    console.error("Fetch cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching cart items",
      error: error.message
    });
  }
};

export { addToCart, removeFromCart, updateCart, allCart };