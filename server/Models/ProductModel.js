import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  pcode: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stocks: {
    type: Number,
    required: true,
  },
});

const ProductModel = mongoose.model("products", ProductSchema);

export default ProductModel;
