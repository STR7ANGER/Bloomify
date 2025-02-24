import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("connected to database");
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/fabvog`);
};

export default connectDB;
