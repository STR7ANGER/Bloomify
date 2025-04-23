import mongoose from "mongoose";

const artSchema = new mongoose.Schema({
  sid: { type: String, required: true },
  type: { type: String, default: "art" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type:Array, required: true }, 
  category: { type: String, required: true },
  quantity:{type:Number,required:true},
}, { timestamps: true });

const artModel =
  mongoose.models.art || mongoose.model("art", artSchema);

export default artModel;