import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  avatar: {
    type: String,
    default: "https://i.ibb.co/4pDNDk1/defualt.png",
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  phone: {
    required: true,
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: `${process.env.JWT_EXPIRES}`,
  });
};

export const UserModel =
  mongoose.models?.UserModel ?? mongoose.model("UserModel", userSchema);
