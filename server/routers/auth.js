import express from "express";
import AuthController from "../controllers/AuthController.js";
const authRouter = express.Router();
const authController = new AuthController();
authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);
export default authRouter;
