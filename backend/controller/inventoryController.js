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
      inout,
      quantity,
    } = req.body;

    // Process images from request files
    // Process images from request files
    const image1 = req.files.image1 && req.files?.image1?.[0];
    const image2 = req.files.image2 && req.files?.image2?.[0];
    const image3 = req.files.image3 && req.files?.image3?.[0];
    const image4 = req.files.image4 && req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    if (
      !sellerId ||
      !type ||
      !name ||
      !description ||
      !price ||
      !quantity ||
      images.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All required fields must be provided including at least one image",
      });
    }

    // Validate sellerId
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid seller ID",
      });
    }

    // Check if seller exists
    const seller = await sellerModel.findById(sellerId);
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    // Validate price and quantity
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number",
      });
    }

    if (isNaN(quantity) || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a non-negative number",
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
      quantity: Number(quantity),
      image: imagesURL,
      date: Date.now(),
    };

    // Add specific fields based on product type
    if (type === "flower" || type === "plant") {
      if (!season || !inout) {
        return res.status(400).json({
          success: false,
          message:
            "Season and indoor/outdoor status are required for flowers and plants",
        });
      }

      // Validate season
      const validSeasons = ["summer", "winter", "autumn", "spring"];
      if (!validSeasons.includes(season.toLowerCase())) {
        return res.status(400).json({
          success: false,
          message: "Season must be summer, winter, autumn, or spring",
        });
      }

      // Validate inout
      const validInOut = ["indoor", "outdoor"];
      if (!validInOut.includes(inout.toLowerCase())) {
        return res.status(400).json({
          success: false,
          message: "Indoor/outdoor status must be 'indoor' or 'outdoor'",
        });
      }

      productData.season = season.toLowerCase();
      productData.inout = inout.toLowerCase();
      productModel = flowerModel;
    } else if (type === "art" || type === "tools") {
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Category is required for art and tools",
        });
      }
      productData.category = category;
      productModel = type === "art" ? artModel : toolModel;
    } else {
      return res.status(400).json({
        success: false,
        message:
          "Invalid product type. Must be 'flower', 'plant', 'art', or 'tools'",
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
      product: newProduct,
    });
  } catch (error) {
    console.error("Add item error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding item",
      error: error.message,
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const { productId, type: originalType } = req.params;
    const updates = req.body;

    // Extract the potentially new type from the form data
    const newType = updates.type;

    // Get sellerId from various possible sources, prioritizing req.body.sid
    const sellerId =
      req.body.sid || req.body.sellerId || req.body.userId || req.user?.id;

    if (!productId || !originalType || !sellerId) {
      return res.status(400).json({
        success: false,
        message: "Product ID, original type, and seller ID are required",
      });
    }

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(productId) ||
      !mongoose.Types.ObjectId.isValid(sellerId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID or seller ID",
      });
    }

    // Check if seller exists
    const seller = await sellerModel.findById(sellerId);
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    // Get the appropriate model for the original product type
    const originalProductModel = getModelByType(originalType);
    if (!originalProductModel) {
      return res.status(400).json({
        success: false,
        message: "Invalid original product type",
      });
    }

    // Find product first to check if it exists
    const product = await originalProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Verify seller owns this product
    if (
      product.sellerId &&
      product.sellerId.toString() !== sellerId.toString()
    ) {
      console.log(
        `Access denied: Product ${productId} belongs to seller ${product.sellerId}, not ${sellerId}`
      );
      return res.status(403).json({
        success: false,
        message: "You don't have permission to update this product",
      });
    }

    // Handle type change if requested
    const isTypeChanging = newType && newType !== originalType;
    let targetProductModel = originalProductModel;

    if (isTypeChanging) {
      // Get the model for the new type
      targetProductModel = getModelByType(newType);
      if (!targetProductModel) {
        return res.status(400).json({
          success: false,
          message: "Invalid new product type",
        });
      }
    }

    // Validate updates
    if (updates.price && (isNaN(updates.price) || updates.price <= 0)) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number",
      });
    }

    if (updates.quantity && (isNaN(updates.quantity) || updates.quantity < 0)) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a non-negative number",
      });
    }

    // Handle image updates if files are provided
    if (req.files && Object.keys(req.files).length > 0) {
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];

      const images = [image1, image2, image3, image4].filter(
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

        // Only replace images if new ones are uploaded, otherwise keep existing ones
        updates.image = imagesURL;
      }
    }

    // Type-specific validations
    if (
      newType === "flower" ||
      newType === "plant" ||
      (!newType && (originalType === "flower" || originalType === "plant"))
    ) {
      if (updates.season) {
        const validSeasons = ["summer", "winter", "autumn", "spring"];
        if (!validSeasons.includes(updates.season.toLowerCase())) {
          return res.status(400).json({
            success: false,
            message: "Season must be summer, winter, autumn, or spring",
          });
        }
        updates.season = updates.season.toLowerCase();
      }

      if (updates.inout) {
        const validInOut = ["indoor", "outdoor"];
        if (!validInOut.includes(updates.inout.toLowerCase())) {
          return res.status(400).json({
            success: false,
            message: "Indoor/outdoor status must be 'indoor' or 'outdoor'",
          });
        }
        updates.inout = updates.inout.toLowerCase();
      }
    }

    // Prepare for database operation
    // Remove fields that shouldn't be directly updated
    const cleanUpdates = { ...updates };
    delete cleanUpdates.sid;
    delete cleanUpdates.sellerId;
    delete cleanUpdates.userId;
    delete cleanUpdates._id;
    delete cleanUpdates.type; // We'll handle type change separately

    // Convert price to Number if present
    if (cleanUpdates.price) {
      cleanUpdates.price = Number(cleanUpdates.price);
    }

    // Convert quantity to Number if present
    if (cleanUpdates.quantity) {
      cleanUpdates.quantity = Number(cleanUpdates.quantity);
    }

    let updatedProduct;

    // If type is changing, we need to handle it specially
    if (isTypeChanging) {
      console.log(
        `Changing product ${productId} type from ${originalType} to ${newType} for seller ${sellerId}`
      );

      // Create a new document in the target collection
      const sourceProduct = product.toObject();
      delete sourceProduct._id; // Remove the original ID to let MongoDB generate a new one

      // Create a new product with the merged data from original and updates
      const newProductData = {
        ...sourceProduct,
        ...cleanUpdates,
        sellerId, // Ensure sellerId is set
        type: newType, // Set the new type
      };

      // Create the new product in the target collection
      const newProduct = new targetProductModel(newProductData);
      updatedProduct = await newProduct.save();

      // Delete the old product
      await originalProductModel.findByIdAndDelete(productId);

      // Update seller's inventory arrays
      if (seller.inventory) {
        // Remove from old type array
        if (seller.inventory[originalType]) {
          seller.inventory[originalType] = seller.inventory[
            originalType
          ].filter((id) => id.toString() !== productId.toString());
        }

        // Add to new type array
        if (!seller.inventory[newType]) {
          seller.inventory[newType] = [];
        }
        seller.inventory[newType].push(updatedProduct._id);

        // Save seller
        await seller.save();
      }
    } else {
      // Regular update without type change
      console.log(
        `Updating product ${productId} of type ${originalType} for seller ${sellerId}`
      );

      // Update product
      updatedProduct = await originalProductModel.findByIdAndUpdate(
        productId,
        cleanUpdates,
        { new: true, runValidators: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update item error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating item",
      error: error.message,
    });
  }
};

const removeItem = async (req, res) => {
  try {
    const { productId, type } = req.params;

    // Get sellerId from various possible sources, prioritizing req.body.sid
    const sellerId =
      req.body.sid || req.body.sellerId || req.body.userId || req.user?.id;

    if (!productId || !type || !sellerId) {
      return res.status(400).json({
        success: false,
        message: "Product ID, type, and seller ID are required",
      });
    }

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(productId) ||
      !mongoose.Types.ObjectId.isValid(sellerId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID or seller ID",
      });
    }

    // Check if seller exists
    const seller = await sellerModel.findById(sellerId);
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    // Get the product model based on type
    const productModel = getModelByType(type);
    if (!productModel) {
      return res.status(400).json({
        success: false,
        message: "Invalid product type",
      });
    }

    // Find the product first
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Verify seller owns this product
    if (
      product.sellerId &&
      product.sellerId.toString() !== sellerId.toString()
    ) {
      console.log(
        `Access denied: Product ${productId} belongs to seller ${product.sellerId}, not ${sellerId}`
      );
      return res.status(403).json({
        success: false,
        message: "You don't have permission to remove this product",
      });
    }

    // Additional inventory check (as a secondary verification)
    const inventoryType = type.toLowerCase();
    const productInInventory =
      seller.inventory &&
      seller.inventory[inventoryType] &&
      seller.inventory[inventoryType].some(
        (id) => id.toString() === productId.toString()
      );

    if (!productInInventory) {
      console.log(
        `Product ${productId} not found in seller ${sellerId}'s inventory`
      );
      // Don't fail here, just log the inconsistency
    }

    // If product has images, delete them from Cloudinary
    if (product.image && product.image.length > 0) {
      try {
        await Promise.all(
          product.image.map(async (imgUrl) => {
            // Extract public_id from Cloudinary URL
            const publicId = imgUrl.split("/").pop().split(".")[0];
            if (publicId) {
              await cloudinary.uploader.destroy(publicId);
            }
          })
        );
        console.log(`Deleted ${product.image.length} image(s) from Cloudinary`);
      } catch (cloudinaryError) {
        console.error(
          "Error deleting images from Cloudinary:",
          cloudinaryError
        );
        // Continue with product deletion even if image deletion fails
      }
    }

    // Remove product from database
    await productModel.findByIdAndDelete(productId);
    console.log(`Deleted product ${productId} of type ${type}`);

    // Remove product from seller's inventory
    if (seller.inventory && seller.inventory[inventoryType]) {
      seller.inventory[inventoryType] = seller.inventory[inventoryType].filter(
        (id) => id.toString() !== productId.toString()
      );
      await seller.save();
      console.log(
        `Removed product ${productId} from seller ${sellerId}'s inventory`
      );
    }

    return res.status(200).json({
      success: true,
      message: "Item removed successfully",
    });
  } catch (error) {
    console.error("Remove item error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while removing item",
      error: error.message,
    });
  }
};

// Get all items in seller inventory
const allItem = async (req, res) => {
  try {
    const sellerId =
      req.params.sellerId || req.query.sellerId || req.body.userId;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller ID is required",
      });
    }

    // Validate sellerId
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid seller ID",
      });
    }

    // Check if seller exists
    const seller = await sellerModel.findById(sellerId);
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    const result = {
      flower: [],
      plant: [],
      art: [],
      tools: [],
    };

    // CHANGE: Directly query each model by sid field instead of using inventory arrays
    // Get all flowers and plants for this seller
    const flowerItems = await flowerModel.find({ sid: sellerId });

    // Separate flowers and plants based on type field
    flowerItems.forEach((item) => {
      if (item.type === "flower") {
        result.flower.push(item);
      } else if (item.type === "plant") {
        result.plant.push(item);
      }
    });

    // Get all art items for this seller
    result.art = await artModel.find({ sid: sellerId });

    // Get all tools for this seller
    result.tools = await toolModel.find({ sid: sellerId });

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
      inventory: result,
    });
  } catch (error) {
    console.error("Fetch inventory error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching inventory",
      error: error.message,
    });
  }
};

export { addItem, updateItem, removeItem, allItem };
