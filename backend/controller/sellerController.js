import sellerModel from "../models/sellerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";


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



export { 
  sellerLogin, 
  sellerRegister, 
};