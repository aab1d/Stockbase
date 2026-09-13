import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  amount: { type: Number, default: 1 },
  description: { type: String, default: "No description provided" },
  image: { type: String, default: "" },
});

export default mongoose.model("Product", productSchema);
