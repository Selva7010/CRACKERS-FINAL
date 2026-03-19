

// import mongoose from "mongoose";

// const CrackerSchema = new mongoose.Schema({
//   name: { 
//     type: String, 
//     required: true 
//   },
//   category: { 
//     type: String, 
//     default: "General" 
//   },
//   price: { 
//     type: Number, 
//     required: true 
//   },
//   stock: { 
//     type: Number, 
//     default: 0 
//   },
//   offer: { 
//     type: String, 
//     default: "" 
//   },
//   image: { 
//     type: String, 
//     default: "" 
//   }
// });

// const Cracker =  mongoose.model("Cracker", CrackerSchema);

// export default Cracker;

import mongoose from "mongoose";

const CrackerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: "",
      maxlength: 500
    },

    price: {
      type: Number,
      required: true
    },

    offer: {
      type: Number,
      default: 0
    },

    stock: {
      type: Number,
      default: 0
    },

    image: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const Cracker = mongoose.model("Cracker", CrackerSchema);

export default Cracker;
