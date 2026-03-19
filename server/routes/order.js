// import express from "express";
// import {
//   createOrder,
//   getOrderById,
//   getAllOrders,
//   updateOrderStatus,
// } from "../controllers/order.controller.js";

// const router = express.Router();

// router.post("/", createOrder);
// router.get("/", getAllOrders);       // admin
// router.get("/:id", getOrderById);    // user
// router.put("/:id/status", updateOrderStatus);

// export default router;

import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus
} from "../controllers/orderController.js";

const Order = express.Router();

/* USER */
Order.post("/", createOrder);
Order.get("/", getAllOrders);
Order.get("/:id", getOrderById);
Order.delete("/:id", deleteOrder);

/* ADMIN */
Order.put("/:id/status", updateOrderStatus);

export default Order;
