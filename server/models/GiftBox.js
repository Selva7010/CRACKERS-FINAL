import mongoose from "mongoose";

const giftBoxSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  offer: Number,
  stock: Number,
  mainImage: String,
  subImages: [String]
});

const giftbox = mongoose.model("GiftBox", giftBoxSchema);

export default giftbox;
