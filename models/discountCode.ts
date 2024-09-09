const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  couponName: {
    type: String,
    required: [true, "Please enter your coupoun code name"],
    unique: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const discountCodeModel =
  mongoose.models?.DiscountCode ??
  mongoose.model("DiscountCode", discountSchema);
