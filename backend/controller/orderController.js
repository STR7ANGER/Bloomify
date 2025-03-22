import userModel from "../models/userModel.js";
import sellerModel from "../models/sellerModel.js";
import orderModel from "../models/orderModel.js";
import mongoose from "mongoose";

// Place a new order
const placeOrder = async (req, res) => {
  try {
    const { 
      uid, 
      sid, 
      items, 
      amount, 
      address, 
      paymentMethod,
      payment = false
    } = req.body;

    // Validate required fields
    if (!uid || !sid || !items || !amount || !address || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(uid) || !mongoose.Types.ObjectId.isValid(sid)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID or seller ID"
      });
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items must be a non-empty array"
      });
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a positive number"
      });
    }

    // Check if user exists
    const user = await userModel.findById(uid);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if seller exists
    const seller = await sellerModel.findById(sid);
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found"
      });
    }

    // Create new order
    const newOrder = await orderModel.create({
      uid,
      sid,
      items,
      amount,
      address,
      paymentMethod,
      payment,
      date: Date.now(),
      status: "Order Placed"
    });

    // Clear user's cart if needed (optional, depends on your app flow)
    if (req.body.clearCart && user.cartData) {
      // Filter only items from this seller
      const remainingCartItems = {};
      
      for (const [itemId, item] of Object.entries(user.cartData)) {
        const orderItemIds = items.map(orderItem => orderItem.productId?.toString());
        if (!orderItemIds.includes(item.productId?.toString())) {
          remainingCartItems[itemId] = item;
        }
      }
      
      user.cartData = remainingCartItems;
      await user.save();
    }

    // Update seller's orders list if you have one in your schema
    if (seller.orders) {
      seller.orders.push(newOrder._id);
      await seller.save();
    }

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder
    });
  } catch (error) {
    console.error("Place order error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while placing order",
      error: error.message
    });
  }
};

// Get all orders for a specific user
const userOrder = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Find all orders for this user
    const orders = await orderModel.find({ uid: userId })
      .sort({ date: -1 }); // Sort by date, newest first

    if (orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No orders found for this user",
        orders: []
      });
    }

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error("Fetch user orders error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching user orders",
      error: error.message
    });
  }
};

// Get all orders for a specific seller
const allOrder = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { status } = req.query; // Optional filter by status

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller ID is required"
      });
    }

    // Validate sellerId
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid seller ID"
      });
    }

    // Check if seller exists
    const seller = await sellerModel.findById(sellerId);
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found"
      });
    }

    // Create query
    const query = { sid: sellerId };
    
    // Add status filter if provided
    if (status) {
      query.status = status;
    }

    // Find all orders for this seller
    const orders = await orderModel.find(query)
      .sort({ date: -1 }); // Sort by date, newest first

    if (orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: status 
          ? `No orders with status '${status}' found for this seller` 
          : "No orders found for this seller",
        orders: []
      });
    }

    // For each order, get user details
    const ordersWithUserDetails = await Promise.all(
      orders.map(async (order) => {
        const user = await userModel.findById(order.uid, 'name email phone');
        return {
          ...order.toObject(),
          userDetails: user || { name: "Unknown User" }
        };
      })
    );

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      count: orders.length,
      orders: ordersWithUserDetails
    });
  } catch (error) {
    console.error("Fetch seller orders error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching seller orders",
      error: error.message
    });
  }
};

// Update order status
const orderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, payment } = req.body;
    const updateBy = req.body.sellerId || req.body.userId; // To track who updated

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required"
      });
    }

    // Validate orderId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID"
      });
    }

    // Find the order
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // Check permissions
    if (updateBy) {
      // Only the order's seller or buyer should be able to update it
      if (order.sid.toString() !== updateBy && order.uid.toString() !== updateBy) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to update this order"
        });
      }
    }

    // Check valid status transitions
    const validStatuses = [
      "Order Placed", 
      "Processing", 
      "Shipped", 
      "Out for Delivery", 
      "Delivered", 
      "Cancelled"
    ];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`
      });
    }

    // Update fields
    const updates = {};
    if (status) updates.status = status;
    if (payment !== undefined) updates.payment = Boolean(payment);

    // Update the order
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      updates,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder
    });
  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating order status",
      error: error.message
    });
  }
};

export { placeOrder, userOrder, allOrder, orderStatus };