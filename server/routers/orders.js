import express from "express";
import OrderControllers from "../controllers/OderController.js";
import { protect } from "../Middleware/authenticatecart.js";

const RouterOrder = express.Router();

const ordercontroller = new OrderControllers();

RouterOrder.get("/allcart", protect, ordercontroller.getAllcart);
RouterOrder.post("/addcart", protect, ordercontroller.createOrder);
RouterOrder.delete(
  "/remove/:cartId/:productId",
  protect,
  ordercontroller.removeFromCart
);

export default RouterOrder;
