import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "10m" },
});

export const tokenModel =
  mongoose.models?.TokenModel ?? mongoose.model("TokenModel", tokenSchema);
