import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Liên kết với bảng User
      required: true,
      ref: "User",
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId, // Liên kết với bảng (Tshoe)
          required: true,
          ref: "Shoe",
        },
        qty: { type: Number, required: true }, // Số lượng sản phẩm
      },
    ],
  },
  {
    timestamps: true, // Tự động tạo thời gian thêm và chỉnh sửa
  }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
