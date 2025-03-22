import mongoose from "mongoose";

const flowerSchema = new mongoose.Schema({
  sid: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: [String], required: true }, // Array of URL strings
  season: { type: String, required: true },
  inout: { type: String, required: true },
}, { timestamps: true });

const flowerModel =
  mongoose.models.flower || mongoose.model("flower", flowerSchema);

export default flowerModel;