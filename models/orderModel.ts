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
    type: {
      type: String,
      default: "Cash on delivery",
    },
    value: {
      type: String,
      default: "Not Paid",
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
