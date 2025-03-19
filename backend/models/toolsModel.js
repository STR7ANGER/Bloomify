import mongoose from "mongoose";

const toolSchema = new mongoose.Schema({
  sid: {type: String,required:true},
  type:{type: String, default: "tools"},
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
});

const toolModel =
  mongoose.models.tool || mongoose.model("tool", toolSchema);

export default toolModel;
