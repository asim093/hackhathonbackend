import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  user: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
      unique: true, 
      match: [
        /^\d{5}-\d{7}-\d{1}$/,
        "Please enter a valid CNIC (XXXXX-XXXXXXX-X)",
      ], // CNIC format (e.g., 12345-1234567-1)
    },
  },
  loanDetails: {
    category: {
      type: String,
      required: true,
    },
    depositAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    remainingLoan: {
      type: Number,
      required: true,
      min: 0,
    },
    monthlyInstallment: {
      type: Number,
      required: true,
      min: 0,
    },
    loanPeriod: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Loan = mongoose.model("Loan", loanSchema);
