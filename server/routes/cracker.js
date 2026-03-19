// const r = require("express").Router();
// const c = require("../controllers/cracker.controller");

// r.post("/", c.addCracker);
// r.get("/", c.getCrackers);

// module.exports = r;


import express from "express";
import {
  addCracker,
  deleteCracker,
  getCrackerById,
  listCrackers,
  updateCracker
} from "../controllers/crackerController.js";

const Cracker = express.Router();

// PUBLIC ROUTES
// GET all crackers
Cracker.get("/", listCrackers);

// GET one cracker by ID
Cracker.get("/:id", getCrackerById);


// ADMIN–PROTECTED ROUTES
// Add new cracker
Cracker.post("/", addCracker);

// Update cracker
Cracker.put("/:id", updateCracker);

// Delete cracker
Cracker.delete("/:id", deleteCracker);

export default Cracker;
