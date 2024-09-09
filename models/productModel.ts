import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description"],
  },
  category: [
    {
      _id: false,
      value: { type: String },
      label: { type: String },
    },
  ],
  subcategory: [
    {
      _id: false,
      value: { type: String },
      label: { type: String },
    },
  ],
  price: {
    type: Number,
    required: [true, "Please enter your product original price"],
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product discount price"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter your product stock"],
  },
  sizes: [
    {
      type: String,
    },
  ],
  colors: [
    {
      _id: false,
      value: { type: String },
      label: { type: String },
    },
  ],
  processingTime: {
    _id: false,
    value: { type: String },
    label: { type: String },
  },
  gender: {
    type: String,
    required: [true, "Please enter your product gender"],
  },
  image: [
    {
      type: String,
    },
  ],
  shopId: {
    type: String,
    required: true,
  },
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  shop: {
    type: Object,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const productModel =
  mongoose.models?.Product ?? mongoose.model("Product", productSchema);
