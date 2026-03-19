import express from "express";
import { Login, Register } from "../controllers/AuthController.js";



const Auth = express.Router();

Auth.post("/register", Register);
Auth.post("/login", Login);


export default Auth;
