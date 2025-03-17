import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comapnyEmail: { type: String, required: true, unique: true },
    companyNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true },    
    companyName: {type: String, required: true},
    companyAddress: {type:Object, required:true},
    upi:{type:String,required:true},
    inventory: {type: Object,default:{}},
  },
  { minimize: false }
);

const sellerModel = mongoose.models.seller || mongoose.model("seller", sellerSchema);

export default sellerModel;
