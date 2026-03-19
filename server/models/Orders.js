// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     customer_name: {
//       type: String,
//       required: true
//     },
//     customer_mobileNo: {
//       type: String,
//       required: true
//     },
//     customer_address: {
//       type: String,
//       required: true
//     },

//     crackers_list: [
//       {
//         productId: String,
//         name: String,
//         quantity: Number,
//         price: Number,
//         image: String
//       }
//     ],

//     totalPrice: {
//       type: Number,
//       required: true
//     },

//     paymentMethod: {
//       type: String,
//       default: "COD"
//     },

//     status: {
//       type: String,
//       enum: ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"],
//       default: "Pending"
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true
    },
    customer_mobileNo: {
      type: String,
      required: true
    },
    customer_address: {
      type: String,
      required: true
    },

    crackers_list: [
      {
        name: String,
        image: String,
        price: Number,
        quantity: Number
      }
    ],

    totalPrice: {
      type: Number,
      required: true
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Packed",
        "Shipped",
        "Delivered",
        "Cancelled"
      ],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
