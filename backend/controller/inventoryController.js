import sellerModel from "../models/sellerModel.js";
import flowerModel from "../models/flowerModel.js";
import artModel from "../models/artModel.js";
import toolModel from "../models/toolsModel.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

// Helper function to determine which model to use based on product type
const getModelByType = (type) => {
  if (type === "flower" || type === "plant") return flowerModel;
  if (type === "art") return artModel;
  if (type === "tools") return toolModel;
  return null;
};

// Add items in seller inventory
const addItem = async (req, res) => {
  try {
    const { 
      sellerId, 
      type, 
      name, 
      description, 
      price, 
      category, 
      season, 
      inout 
    } = req.body;

    // Process images from request files
    const image1 = req.files.image1 && req.files?.image1?.[0];
    const image2 = req.files.image2 && req.files?.image2?.[0];
    const image3 = req.files.image3 && req.files?.image3?.[0];
    const image4 = req.files.image4 && req.files?.image4?.[0];
    const image5 = req.files.image5 && req.files?.image5?.[0];
    
    const images = [image1, image2, image3, image4, image5].filter(
      (item) => item !== undefined
    );

    if (!sellerId || !type || !name || !description || !price || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided including at least one image"
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

    // Validate price
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number"
      });
    }

    // Upload images to Cloudinary
    let imagesURL = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    let productModel;
    let productData = {
      sid: sellerId,
      type,
      name,
      description,
      price: Number(price),
      image: imagesURL,
      date: Date.now()
    };

    // Add specific fields based on product type
    if (type === "flower" || type === "plant") {
      if (!season || !inout) {
        return res.status(400).json({
          success: false,
          message: "Season and indoor/outdoor status are required for flowers and plants"
        });
      }

      // Validate season
      const validSeasons = ["summer", "winter", "autumn", "spring"];
      if (!validSeasons.includes(season.toLowerCase())) {
        return res.status(400).json({
          success: false,
          message: "Season must be summer, winter, autumn, or spring"
        });
      }

      // Validate inout
      const validInOut = ["indoor", "outdoor"];
      if (!validInOut.includes(inout.toLowerCase())) {
        return res.status(400).json({
          success: false,
          message: "Indoor/outdoor status must be 'indoor' or 'outdoor'"
        });
      }

      productData.season = season.toLowerCase();
      productData.inout = inout.toLowerCase();
      productModel = flowerModel;
    } else if (type === "art" || type === "tools") {
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Category is required for art and tools"
        });
      }
      productData.category = category;
      productModel = type === "art" ? artModel : toolModel;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid product type. Must be 'flower', 'plant', 'art', or 'tools'"
      });
    }

    // Create new product
    const newProduct = await productModel.create(productData);

    // Update seller's inventory
    if (!seller.inventory[type]) {
      seller.inventory[type] = [];
    }
    seller.inventory[type].push(newProduct._id);
    await seller.save();

    return res.status(201).json({
      success: true,
      message: "Item added successfully",
      product: newProduct
    });
  } catch (error) {
    console.error("Add item error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding item",
      error: error.message
    });
  }
};

// Update items in seller inventory
const updateItem = async (req, res) => {
  try {
    const { productId, type } = req.params;
    const updates = req.body;
    const sellerId = req.body.sellerId || req.body.sid;

    if (!productId || !type || !sellerId) {
      return res.status(400).json({
        success: false,
        message: "Product ID, type, and seller ID are required"
      });
    }

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID or seller ID"
      });
    }

    // Check if seller exists and owns this product
    const seller = await sellerModel.findById(sellerId);
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found"
      });
    }

    // Verify seller owns this product
    if (!seller.inventory[type] || !seller.inventory[type].includes(productId)) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to update this product"
      });
    }

    const productModel = getModelByType(type);
    if (!productModel) {
      return res.status(400).json({
        success: false,
        message: "Invalid product type"
      });
    }

    // Find product
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Validate updates
    if (updates.price && (isNaN(updates.price) || updates.price <= 0)) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number"
      });
    }

    // Handle image updates if files are provided
    if (req.files && Object.keys(req.files).length > 0) {
      const image1 = req.files.image1 && req.files?.image1?.[0];
      const image2 = req.files.image2 && req.files?.image2?.[0];
      const image3 = req.files.image3 && req.files?.image3?.[0];
      const image4 = req.files.image4 && req.files?.image4?.[0];
      const image5 = req.files.image5 && req.files?.image5?.[0];
      
      const images = [image1, image2, image3, image4, image5].filter(
        (item) => item !== undefined
      );

      if (images.length > 0) {
        // Upload new images to Cloudinary
        const imagesURL = await Promise.all(
          images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path, {
              resource_type: "image",
            });
            return result.secure_url;
          })
        );
        
        updates.image = imagesURL;
      }
    }

    if (type === "flower" || type === "plant") {
      if (updates.season) {
        const validSeasons = ["summer", "winter", "autumn", "spring"];
        if (!validSeasons.includes(updates.season.toLowerCase())) {
          return res.status(400).json({
            success: false,
            message: "Season must be summer, winter, autumn, or spring"
          });
        }
        updates.season = updates.season.toLowerCase();
      }

      if (updates.inout) {
        const validInOut = ["indoor", "outdoor"];
        if (!validInOut.includes(updates.inout.toLowerCase())) {
          return res.status(400).json({
            success: false,
            message: "Indoor/outdoor status must be 'indoor' or 'outdoor'"
          });
        }
        updates.inout = updates.inout.toLowerCase();
      }
    }

    // Remove fields that shouldn't be updated
    delete updates.sid;
    delete updates.sellerId;
    delete updates.type;
    delete updates._id;

    // Convert price to Number if present
    if (updates.price) {
      updates.price = Number(updates.price);
    }

    // Update product
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updates,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      product: updatedProduct
    });
  } catch (error) {
    console.error("Update item error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating item",
      error: error.message
    });
  }
};

// Remove items from seller inventory
const removeItem = async (req, res) => {
  try {
    const { productId, type } = req.params;
    const sellerId = req.body.sellerId || req.query.sellerId;

    if (!productId || !type || !sellerId) {
      return res.status(400).json({
        success: false,
        message: "Product ID, type, and seller ID are required"
      });
    }

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID or seller ID"
      });
    }

    // Check if seller exists and owns this product
    const seller = await sellerModel.findById(sellerId);
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found"
      });
    }

    // Verify seller owns this product
    if (!seller.inventory[type] || !seller.inventory[type].includes(productId)) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to remove this product"
      });
    }

    const productModel = getModelByType(type);
    if (!productModel) {
      return res.status(400).json({
        success: false,
        message: "Invalid product type"
      });
    }

    // Find the product to get image URLs before deletion
    const product = await productModel.findById(productId);
    if (product && product.image && product.image.length > 0) {
      // Here you could add code to delete images from Cloudinary if needed
      // This would involve extracting public_ids from URLs and calling cloudinary.uploader.destroy
    }

    // Remove product from database
    await productModel.findByIdAndDelete(productId);

    // Remove product from seller's inventory
    seller.inventory[type] = seller.inventory[type].filter(
      (id) => id.toString() !== productId.toString()
    );
    await seller.save();

    return res.status(200).json({
      success: true,
      message: "Item removed successfully"
    });
  } catch (error) {
    console.error("Remove item error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while removing item",
      error: error.message
    });
  }
};

// Get all items in seller inventory
const allItem = async (req, res) => {
  try {
    const sellerId = req.params.sellerId || req.query.sellerId;

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

    const inventory = seller.inventory;
    const result = {
      flower: [],
      plant: [],
      art: [],
      tools: []
    };

    // Fetch flowers and plants
    if (inventory.flower && inventory.flower.length > 0) {
      const flowerItems = await flowerModel.find({
        _id: { $in: inventory.flower }
      });
      
      // Separate flowers and plants based on type field
      flowerItems.forEach(item => {
        if (item.type === 'flower') {
          result.flower.push(item);
        } else if (item.type === 'plant') {
          result.plant.push(item);
        }
      });
    }

    // Fetch art items
    if (inventory.art && inventory.art.length > 0) {
      result.art = await artModel.find({
        _id: { $in: inventory.art }
      });
    }

    // Fetch tools
    if (inventory.tools && inventory.tools.length > 0) {
      result.tools = await toolModel.find({
        _id: { $in: inventory.tools }
      });
    }

    // Count items
    const totalItems = 
      result.flower.length + 
      result.plant.length + 
      result.art.length + 
      result.tools.length;

    return res.status(200).json({
      success: true,
      message: "Inventory fetched successfully",
      count: totalItems,
      inventory: result
    });
  } catch (error) {
    console.error("Fetch inventory error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching inventory",
      error: error.message
    });
  }
};

// Get single item details
const singleItem = async (req, res) => {
  try {
    const { productId, type } = req.params;

    if (!productId || !type) {
      return res.status(400).json({
        success: false,
        message: "Product ID and type are required"
      });
    }

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const productModel = getModelByType(type);
    if (!productModel) {
      return res.status(400).json({
        success: false,
        message: "Invalid product type"
      });
    }

    // Find product
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error("Fetch single item error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching item details",
      error: error.message
    });
  }
};

export { addItem, updateItem, removeItem, allItem, singleItem };