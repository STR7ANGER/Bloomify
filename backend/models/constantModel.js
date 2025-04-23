import mongoose from "mongoose";

const constantSchema = new mongoose.Schema({
  dilivery: { type: Number, default: 20, required: true },
  userFee: { type: Number, default: 20, required: true },
  sellerFee: { type: Number, default: 200, required: true },
  adsFee: { type: Number, default: 2, required: true },
  Symbol: { type: String, default: "$" },
});

const constantModel =
  mongoose.models.constant || mongoose.model("constant", constantSchema);

export default constantModel;
