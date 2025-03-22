import sellerModel from "../models/sellerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import constantModel from "../models/constantModel.js";
import advertisementModel from "../models/advertisementModel.js"; // Assuming this model exists

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

// To Register Seller
const sellerRegister = async (req, res) => {
  // Existing code left unchanged
  try {
    const {
      name,
      comapnyEmail,
      companyNumber,
      password,
      companyName,
      companyAddress,
      upi,
    } = req.body;

    // Check if all required fields are provided
    if (
      !name ||
      !comapnyEmail ||
      !companyNumber ||
      !password ||
      !companyName ||
      !companyAddress ||
      !upi
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if email already exists
    const emailExists = await sellerModel.findOne({ comapnyEmail });
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "Company with this email already exists",
      });
    }

    // Check if company number already exists
    const numberExists = await sellerModel.findOne({ companyNumber });
    if (numberExists) {
      return res.status(409).json({
        success: false,
        message: "Company with this number already exists",
      });
    }

    // Validate email
    if (!validator.isEmail(comapnyEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate company number
    if (!validator.isMobilePhone(companyNumber.toString())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid company phone number",
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Validate company name
    if (companyName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Company name is too short",
      });
    }

    // Validate UPI
    if (!upi || upi.length < 4) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid UPI ID",
      });
    }

    // Check if companyAddress has required fields
    if (
      !companyAddress.street ||
      !companyAddress.city ||
      !companyAddress.state ||
      !companyAddress.pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "Complete company address is required",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create seller record
    const seller = await sellerModel.create({
      name,
      comapnyEmail,
      companyNumber,
      password: hashedPassword,
      companyName,
      companyAddress,
      upi,
      inventory: {},
    });

    // Generate token
    const token = createToken(seller._id);

    return res.status(201).json({
      success: true,
      token,
      message: "Seller registered successfully",
      sellerId: seller._id.toString(),
      name: seller.name,
      companyName: seller.companyName,
      comapnyEmail: seller.comapnyEmail,
      companyNumber: seller.companyNumber,
    });
  } catch (error) {
    console.error("Seller registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during seller registration",
      error: error.message,
    });
  }
};

// To Login Seller
const sellerLogin = async (req, res) => {
  // Existing code left unchanged
  try {
    const { comapnyEmail, password } = req.body;

    if (!comapnyEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find seller by email
    const seller = await sellerModel.findOne({ comapnyEmail });

    if (!seller) {
      return res.status(401).json({
        success: false,
        message: "Seller not found",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = createToken(seller._id);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      sellerId: seller._id.toString(),
      name: seller.name,
      companyName: seller.companyName,
      comapnyEmail: seller.comapnyEmail,
      companyNumber: seller.companyNumber,
    });
  } catch (error) {
    console.error("Seller login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during seller login",
      error: error.message,
    });
  }
};

// Create Advertisement
const createAdvertisement = async (req, res) => {
  try {
    const { sellerId, productId, duration } = req.body;
    const image = req.files?.image && req.files.image[0];

    // Validate required fields
    if (!sellerId || !productId || !duration || !image) {
      return res.status(400).json({
        success: false,
        message: "Seller ID, Product ID, duration, and image are required"
      });
    }

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid seller ID"
      });
    }

    // Verify seller exists
    const seller = await sellerModel.findById(sellerId);
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found"
      });
    }

    // Validate duration is a positive number
    if (isNaN(duration) || parseInt(duration) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Duration must be a positive number of days"
      });
    }

    // Get the advertisement fee per day from constants
    const constants = await constantModel.findOne();
    if (!constants) {
      return res.status(500).json({
        success: false,
        message: "Cannot retrieve advertisement fee configuration"
      });
    }

    const adsFee = constants.adsFee;
    const durationDays = parseInt(duration);
    const totalPayment = adsFee * durationDays;

    // Upload image to Cloudinary
    let imageURL;
    try {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });
      imageURL = result.secure_url;
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error uploading advertisement image",
        error: error.message
      });
    }

    // Create advertisement record
    const advertisement = await advertisementModel.create({
      sid: sellerId,
      pid: productId,
      duration: durationDays,
      payment: totalPayment,
      image: [imageURL], // Store as array to match schema
      startDate: new Date(),
      endDate: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000),
      status: "active"
    });

    return res.status(201).json({
      success: true,
      message: "Advertisement created successfully",
      advertisement: {
        id: advertisement._id,
        sellerId: advertisement.sid,
        productId: advertisement.pid,
        duration: advertisement.duration,
        payment: advertisement.payment,
        image: advertisement.image[0],
        startDate: advertisement.startDate,
        endDate: advertisement.endDate,
        status: advertisement.status
      }
    });
  } catch (error) {
    console.error("Create advertisement error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating advertisement",
      error: error.message
    });
  }
};

// Get seller's advertisements
const getSellerAdvertisements = async (req, res) => {
  try {
    const { sellerId } = req.params;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller ID is required"
      });
    }

    // Validate seller ID
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

    // Get all advertisements for the seller
    const advertisements = await advertisementModel.find({ sid: sellerId });

    return res.status(200).json({
      success: true,
      count: advertisements.length,
      advertisements
    });
  } catch (error) {
    console.error("Get seller advertisements error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching advertisements",
      error: error.message
    });
  }
};

// Update advertisement status
const updateAdvertisementStatus = async (req, res) => {
  try {
    const { advertisementId } = req.params;
    const { status } = req.body;

    if (!advertisementId || !status) {
      return res.status(400).json({
        success: false,
        message: "Advertisement ID and status are required"
      });
    }

    // Validate advertisement ID
    if (!mongoose.Types.ObjectId.isValid(advertisementId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid advertisement ID"
      });
    }

    // Validate status
    const validStatuses = ["active", "inactive", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be one of: active, inactive, completed"
      });
    }

    // Update advertisement
    const updatedAdvertisement = await advertisementModel.findByIdAndUpdate(
      advertisementId,
      { status },
      { new: true }
    );

    if (!updatedAdvertisement) {
      return res.status(404).json({
        success: false,
        message: "Advertisement not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Advertisement status updated successfully",
      advertisement: updatedAdvertisement
    });
  } catch (error) {
    console.error("Update advertisement status error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating advertisement status",
      error: error.message
    });
  }
};

// Get all active advertisements
const getAllActiveAdvertisements = async (req, res) => {
  try {
    // Get current date
    const currentDate = new Date();

    // Find all active advertisements that haven't expired
    const advertisements = await advertisementModel.find({
      status: "active",
      endDate: { $gte: currentDate }
    });

    return res.status(200).json({
      success: true,
      count: advertisements.length,
      advertisements
    });
  } catch (error) {
    console.error("Get active advertisements error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching active advertisements",
      error: error.message
    });
  }
};

export { 
  sellerLogin, 
  sellerRegister, 
  createAdvertisement, 
  getSellerAdvertisements, 
  updateAdvertisementStatus, 
  getAllActiveAdvertisements 
};