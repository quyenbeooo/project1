import express from "express";
const RouterProduct = express.Router();
import ProductController from "../controllers/posts.js";

const productControllers = new ProductController();
RouterProduct.get("/", productControllers.getPosts);

RouterProduct.post("/", productControllers.createPosts);

RouterProduct.get("/:id", productControllers.DetailShoe);

RouterProduct.put("/:id", productControllers.updatePosts);

RouterProduct.delete("/:id", productControllers.deteleProduct);

RouterProduct.get(
  "/category/:categoryId",
  productControllers.getProductsByCategory
);

export default RouterProduct;
