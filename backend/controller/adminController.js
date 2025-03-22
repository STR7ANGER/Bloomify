import constantModel from "../models/constantModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Check username
    if (username !== process.env.ADMIN_USERNAME) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: "admin", role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Get current constants
    const constants =
      (await constantModel.findOne()) || (await constantModel.create({}));

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      constants,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during admin login",
      error: error.message,
    });
  }
};

// Update delivery fee
const diliveryFee = async (req, res) => {
  try {
    const { fee } = req.body;

    if (fee === undefined || isNaN(fee) || fee < 0) {
      return res.status(400).json({
        success: false,
        message: "Valid delivery fee is required",
      });
    }

    // Find constants document or create if not exists
    let constants = await constantModel.findOne();
    if (!constants) {
      constants = await constantModel.create({});
    }

    // Update delivery fee
    constants.dilivery = fee;
    await constants.save();

    return res.status(200).json({
      success: true,
      message: "Delivery fee updated successfully",
      fee: constants.dilivery,
      constants,
    });
  } catch (error) {
    console.error("Update delivery fee error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating delivery fee",
      error: error.message,
    });
  }
};

// Update user fee
const userFee = async (req, res) => {
  try {
    const { fee } = req.body;

    if (fee === undefined || isNaN(fee) || fee < 0) {
      return res.status(400).json({
        success: false,
        message: "Valid user fee is required",
      });
    }

    // Find constants document or create if not exists
    let constants = await constantModel.findOne();
    if (!constants) {
      constants = await constantModel.create({});
    }

    // Update user fee
    constants.userFee = fee;
    await constants.save();

    return res.status(200).json({
      success: true,
      message: "User fee updated successfully",
      fee: constants.userFee,
      constants,
    });
  } catch (error) {
    console.error("Update user fee error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating user fee",
      error: error.message,
    });
  }
};

// Update seller fee
const sellerFee = async (req, res) => {
  try {
    const { fee } = req.body;

    if (fee === undefined || isNaN(fee) || fee < 0) {
      return res.status(400).json({
        success: false,
        message: "Valid seller fee is required",
      });
    }

    // Find constants document or create if not exists
    let constants = await constantModel.findOne();
    if (!constants) {
      constants = await constantModel.create({});
    }

    // Update seller fee
    constants.sellerFee = fee;
    await constants.save();

    return res.status(200).json({
      success: true,
      message: "Seller fee updated successfully",
      fee: constants.sellerFee,
      constants,
    });
  } catch (error) {
    console.error("Update seller fee error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating seller fee",
      error: error.message,
    });
  }
};

// Update ads fee
const adsFee = async (req, res) => {
  try {
    const { fee } = req.body;

    if (fee === undefined || isNaN(fee) || fee < 0) {
      return res.status(400).json({
        success: false,
        message: "Valid ads fee is required",
      });
    }

    // Find constants document or create if not exists
    let constants = await constantModel.findOne();
    if (!constants) {
      constants = await constantModel.create({});
    }

    // Update ads fee
    constants.adsFee = fee;
    await constants.save();

    return res.status(200).json({
      success: true,
      message: "Ads fee updated successfully",
      fee: constants.adsFee,
      constants,
    });
  } catch (error) {
    console.error("Update ads fee error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating ads fee",
      error: error.message,
    });
  }
};

// Additional utility function to get all constants
const getAllConstants = async (req, res) => {
  try {
    // Find constants document or create if not exists
    let constants = await constantModel.findOne();
    if (!constants) {
      constants = await constantModel.create({});
    }

    return res.status(200).json({
      success: true,
      message: "Constants fetched successfully",
      constants,
    });
  } catch (error) {
    console.error("Fetch constants error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching constants",
      error: error.message,
    });
  }
};

export { adminLogin, diliveryFee, userFee, sellerFee, adsFee };
