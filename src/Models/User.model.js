import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, required: true },
  token: { type: String, default: "" },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  otp: {
    value: { type: String },
    expireAt: { type: Date },
    verified: { type: Boolean, default: "false" },
  },
});

export const Usermodle = mongoose.model("User", Userschema);
