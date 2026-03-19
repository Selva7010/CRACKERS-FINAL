import express from "express";
import { adminLogin, adminRegister } from "../controllers/adminController.js";


const Admin = express.Router();

Admin.post("/register", adminRegister);
Admin.post("/login", adminLogin);

export default Admin;
