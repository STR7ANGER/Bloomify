import userModel from "../models/userModel.js";
import flowerModel from "../models/flowerModel.js";
import artModel from "../models/artModel.js";
import toolModel from "../models/toolsModel.js";
import mongoose from "mongoose";

// Helper function to determine which model to use based on product type
const getModelByType = (type) => {
  if (type === "flower" || type === "plant") return flowerModel;
  if (type === "art") return artModel;
  if (type === "tools") return toolModel;
  return null;
};

// Add item to user Cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, productType, quantity = 1 } = req.body;

    if (!userId || !productId || !productType) {
      return res.status(400).json({
        success: false,
        message: "User ID, product ID, and product type are required",
      });
    }

    // Validate user ID and product ID
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID or product ID",
      });
    }

    // Get product details to validate and use in cart
    const productModel = getModelByType(productType);
    if (!productModel) {
      return res.status(400).json({
        success: false,
        message: "Invalid product type",
      });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if product is in stock
    if (product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Only ${product.quantity} items available.`,
      });
    }

    // Update user's cart with the product
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          [`cartData.${productId}.${productType}`]: parseInt(quantity),
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Failed to update cart",
      });
    }

    res.status(200).json({
      success: true,
      message: "Added To Cart",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding to cart",
      error: error.message,
    });
  }
};

// Update cart item quantity
const updateCart = async (req, res) => {
  try {
    const { userId, productId, productType, quantity } = req.body;

    if (!userId || !productId || !productType || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "User ID, product ID, product type, and quantity are required",
      });
    }

    // Validate quantity
    if (isNaN(quantity) || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a non-negative number",
      });
    }

    // Get product to check stock
    const productModel = getModelByType(productType);
    if (!productModel) {
      return res.status(400).json({
        success: false,
        message: "Invalid product type",
      });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check stock if increasing quantity
    if (quantity > 0 && product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Only ${product.quantity} items available.`,
      });
    }

    // If quantity is 0, remove the item
    let updateOperation;
    if (quantity === 0) {
      updateOperation = {
        $unset: {
          [`cartData.${productId}.${productType}`]: ""
        }
      };
      
      // Check if this is the last productType for this productId
      const user = await userModel.findById(userId);
      if (user && 
          user.cartData && 
          user.cartData[productId] && 
          Object.keys(user.cartData[productId]).length === 1 &&
          user.cartData[productId][productType] !== undefined) {
        // If this is the last product type, remove the entire productId entry
        updateOperation = {
          $unset: {
            [`cartData.${productId}`]: ""
          }
        };
      }
    } else {
      // Update quantity
      updateOperation = {
        $set: {
          [`cartData.${productId}.${productType}`]: parseInt(quantity)
        }
      };
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      updateOperation,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Cart Updated",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating cart",
      error: error.message,
    });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId, productType } = req.body;

    if (!userId || !productId || !productType) {
      return res.status(400).json({
        success: false,
        message: "User ID, product ID and product type are required",
      });
    }

    // Check if this is the last productType for this productId
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let updateOperation;
    if (user.cartData && 
        user.cartData[productId] && 
        Object.keys(user.cartData[productId]).length === 1 &&
        user.cartData[productId][productType] !== undefined) {
      // If this is the last product type, remove the entire productId entry
      updateOperation = {
        $unset: {
          [`cartData.${productId}`]: ""
        }
      };
    } else {
      // Remove just this productType
      updateOperation = {
        $unset: {
          [`cartData.${productId}.${productType}`]: ""
        }
      };
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      updateOperation,
      { new: true }
    );

    res.json({
      success: true,
      message: "Item removed from cart",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while removing item from cart",
      error: error.message,
    });
  }
};

// Get user's cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If cart is empty
    if (!user.cartData || Object.keys(user.cartData).length === 0) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cartData: {},
        cartItems: [],
        totalItems: 0,
      });
    }

    // Fetch product details for each item in cart
    const cartItems = [];
    let totalItems = 0;

    for (const [productId, productTypes] of Object.entries(user.cartData)) {
      for (const [productType, quantity] of Object.entries(productTypes)) {
        totalItems += quantity;
        
        // Get product model based on type
        const productModel = getModelByType(productType);
        if (productModel) {
          try {
            const product = await productModel.findById(productId);
            if (product) {
              cartItems.push({
                productId,
                productType,
                quantity,
                name: product.name,
                price: product.price,
                image: product.image && product.image.length > 0 ? product.image[0] : "",
                totalPrice: product.price * quantity,
                inStock: product.quantity >= quantity
              });
            } else {
              // Product no longer exists but still in cart
              cartItems.push({
                productId,
                productType,
                quantity,
                name: "Product no longer available",
                price: 0,
                image: "",
                totalPrice: 0,
                inStock: false
              });
            }
          } catch (err) {
            console.error(`Error fetching product details: ${err}`);
          }
        }
      }
    }

    res.json({
      success: true,
      message: "Cart fetched successfully",
      cartData: user.cartData,
      cartItems,
      totalItems
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching cart",
      error: error.message,
    });
  }
};

// Clear user's cart
const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: { cartData: {} } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Cart cleared successfully",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while clearing cart",
      error: error.message,
    });
  }
};

export { addToCart, updateCart, removeFromCart, getUserCart, clearCart };