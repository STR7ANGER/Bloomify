import flowerModel from "../models/flowerModel.js";
import artModel from "../models/artModel.js";
import toolModel from "../models/toolsModel.js";

const allItems = async (req, res) => {
  try {
    const result = {
      flower: [],
      plant: [],
      art: [],
      tools: [],
    };

    // Get all flowers and plants
    const flowerItems = await flowerModel.find({});

    // Separate flowers and plants based on type field
    flowerItems.forEach((item) => {
      if (item.type === "flower") {
        result.flower.push(item);
      } else if (item.type === "plant") {
        result.plant.push(item);
      }
    });

    // Get all art items
    result.art = await artModel.find({});

    // Get all tools
    result.tools = await toolModel.find({});

    // Count items
    const totalItems =
      result.flower.length +
      result.plant.length +
      result.art.length +
      result.tools.length;

    return res.status(200).json({
      success: true,
      message: "All inventory items fetched successfully",
      count: totalItems,
      inventory: result,
    });
  } catch (error) {
    console.error("Fetch all inventory error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching inventory",
      error: error.message,
    });
  }
};

// Get product details by ID and type
const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const { type } = req.query;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    let product;

    // Select the appropriate model based on product type
    switch (type) {
      case "flower":
      case "plant":
        product = await flowerModel.findById(productId);
        break;
      case "art":
        product = await artModel.findById(productId);
        break;
      case "tools":
        product = await toolModel.findById(productId);
        break;
      default:
        // If type is not provided, try finding in all models
        product =
          (await flowerModel.findById(productId)) ||
          (await artModel.findById(productId)) ||
          (await toolModel.findById(productId));
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product details fetched successfully",
      product,
    });
  } catch (error) {
    console.error("Get product details error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching product details",
      error: error.message,
    });
  }
};

export { allItems, getProductDetails };
