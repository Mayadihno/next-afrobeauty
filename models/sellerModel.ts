import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: [true, "Please enter your shop name!"],
  },
  fullName: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your shop email!"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  shopAddress: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  accountType: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "seller",
  },
  phone: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const sellerModel =
  mongoose.models?.SellerModel ?? mongoose.model("SellerModel", sellerSchema);
