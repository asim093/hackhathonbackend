import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  maximumloan: { type: String, required: true }, 
  Loanperiod: { type: String, required: true }, 
  subcategories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" }, 
  ],
});

export default mongoose.model("Category", CategorySchema);
