import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

const userRegister = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if email already exists
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Check if phone number already exists
    const phoneExists = await userModel.findOne({ phoneNumber });
    if (phoneExists) {
      return res.status(409).json({
        success: false,
        message: "User with this phone number already exists",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate phone number (ensure it contains only digits)
    if (!validator.isMobilePhone(phoneNumber.toString())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number",
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Validate name (ensure it's not too short)
    if (name.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name is too short",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      cartData: {} 
    });

    const token = createToken(user._id);

    return res.status(201).json({
      success: true,
      token,
      message: "User registered successfully",
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message
    });
  }
};

export { userLogin, userRegister };