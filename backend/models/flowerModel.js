import mongoose from "mongoose";

const flowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  season: { type: String, required: true },
  inout: { type: String, required: true },
  date: { type: Number, required: true },
});

const flowerModel =
  mongoose.models.flower || mongoose.model("flower", flowerSchema);

export default flowerModel;
