import mongoose from "mongoose";

const toolSchema = new mongoose.Schema({
  sid: { type: String, required: true },
  pid: { type: String, default: "tools" },
  duration: { type: Number, required: "ture" },
  payment: { type: Number, required: "true" },
  image: { type: Array, required: true },
});

const toolModel = mongoose.models.tool || mongoose.model("tool", toolSchema);

export default toolModel;
