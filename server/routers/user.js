import express from "express";
import UserControllers from "../controllers/UserControllers.js";
const UserRouters = express.Router();

const userControllers = new UserControllers();
UserRouters.get("/", userControllers.getAllUser);
UserRouters.put("/:userId", userControllers.updateUserProfile);

export default UserRouters;
