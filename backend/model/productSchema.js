const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    instock: { type: Boolean, default: true },
  },
  { timestamp: "true" }
);

module.exports = mongoose.model("Product", productSchema);
