import express from "express";
import {
  addGiftBox,
  getGiftBoxes,
  getGiftBox,
  editGiftBox,
  deleteGiftBox,
} from "../controllers/giftboxController.js";

const Giftbox = express.Router();

// CREATE
Giftbox.post("/", addGiftBox);

// READ ALL
Giftbox.get("/", getGiftBoxes);

// READ ONE
Giftbox.get("/:id", getGiftBox);

// UPDATE
Giftbox.put("/:id", editGiftBox);

// DELETE
Giftbox.delete("/:id", deleteGiftBox);

export default Giftbox;
