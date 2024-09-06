import express from "express";
const RouterCategory = express.Router();
import CategoryControllers from "../controllers/CategoryController.js";

const categoryControllers = new CategoryControllers();
RouterCategory.get("/", categoryControllers.getAll);

RouterCategory.get("/:id", categoryControllers.getDetail);

RouterCategory.post("/", categoryControllers.createCategory);

RouterCategory.put("/:id", categoryControllers.updateCategory);

RouterCategory.delete("/:id", categoryControllers.deleteCategory);

export default RouterCategory;
