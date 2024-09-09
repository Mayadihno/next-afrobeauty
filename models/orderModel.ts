import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  cartItems: {
    type: Array,
    required: true,
  },
  shippingFee: {
    type: Object,
    required: true,
  },
  userData: {
    type: Object,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Processing",
  },
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    type: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
    default: Date.now(),
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const orderModel =
  mongoose.models?.UserOrder || mongoose.model("UserOrder", orderSchema);
export default orderModel;
