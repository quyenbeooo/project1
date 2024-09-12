import mongoose from "mongoose";
import Order from "../models/OderModel.js";
import Shoe from "../models/PostModel.js";

class OrderControllers {
  async createOrder(req, res) {
    const { productId, qty } = req.body;
    console.log("Received productId:", productId);
    console.log("Received qty:", qty);

    if (!productId || !qty) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin productId hoặc qty" });
    }

    // Tìm sản phẩm theo ID
    const shoe = await Shoe.findById(productId);
    if (!shoe) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    // Lấy ID người dùng từ req.user
    const userId = req.user.id;

    // Tìm giỏ hàng của người dùng
    let cart = await Order.findOne({ user: userId });

    if (cart) {
      // Nếu giỏ hàng tồn tại, kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const itemIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // Nếu sản phẩm đã có, cập nhật số lượng
        cart.cartItems[itemIndex].qty += qty;
      } else {
        // Nếu sản phẩm chưa có, thêm sản phẩm mới vào giỏ hàng
        cart.cartItems.push({ product: productId, qty });
      }
      await cart.save();
      res.status(200).json(cart);
    } else {
      // Nếu giỏ hàng chưa tồn tại, tạo mới với ID người dùng
      cart = new Order({
        user: userId,
        cartItems: [{ product: productId, qty }],
      });

      await cart.save();
      res.status(201).json(cart);
    }
  }
  async getAllcart(req, res) {
    try {
      // Đảm bảo rằng req.user._id có giá trị hợp lệ
      console.log("User ID from request:", req.user.id);

      // Tìm tất cả các đơn hàng liên kết với người dùng đã đăng nhập
      const orders = await Order.find({ user: req.user.id }).populate(
        "cartItems.product",
        "name price image size"
      );

      // Kiểm tra xem có giỏ hàng nào không
      if (!orders.length) {
        return res.status(404).json({ message: "Không có giỏ hàng nào" });
      }

      res.status(200).json(orders);
    } catch (error) {
      console.error("Lỗi server:", error.message);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  }
  async removeFromCart(req, res) {
    const { cartId, productId } = req.params; // Lấy cartId và productId từ URL
    console.log("Cart ID:", cartId);
    console.log("Product ID:", productId);

    // Kiểm tra tính hợp lệ của cartId và productId
    if (
      !mongoose.Types.ObjectId.isValid(cartId) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    try {
      // Tìm giỏ hàng dựa trên cartId
      let cart = await Order.findById(cartId);

      if (!cart) {
        return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
      }

      // Lấy _id của giỏ hàng hiện tại
      const cartIdFromDb = cart._id.toString(); // Đây là ID của giỏ hàng

      // Tìm sản phẩm cần xóa trong giỏ hàng
      const itemIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // Nếu tìm thấy sản phẩm, xóa nó khỏi giỏ hàng
        cart.cartItems.splice(itemIndex, 1);

        // Lưu lại thay đổi sau khi xóa sản phẩm
        await cart.save();
        return res
          .status(200)
          .json({
            message: "Đã xóa sản phẩm khỏi giỏ hàng",
            cartId: cartIdFromDb,
            cart,
          });
      } else {
        return res
          .status(404)
          .json({ message: "Sản phẩm không có trong giỏ hàng" });
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error.message);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  }
}

export default OrderControllers;
