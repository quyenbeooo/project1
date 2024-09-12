import axios from "axios";
import { AppDispatch } from "../store";
import { addToCart } from "./cartSlice";
import Tcart from "../../Type/Tcart";
import Cookies from "universal-cookie";

const addToCartAsync = (cartItem: Tcart) => async (dispatch: AppDispatch) => {
  const cookies = new Cookies();
  const token = cookies.get("token"); // Giả sử token được lưu trong cookie với tên "token"
  console.log("Cart item:", cartItem);
  // Chuyển đổi _id thành productId
  const itemToSend = {
    productId: cartItem._id,
    qty: cartItem.qty,
  }; // Kiểm tra giá trị của cartItem
  try {
    // Cập nhật Redux state trước
    dispatch(addToCart(cartItem));

    // Gửi request tới server để lưu giỏ hàng với token trong header
    await axios.post("http://localhost:3000/order/addcart", itemToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    // Xử lý lỗi nếu cần
  }
};
export default addToCartAsync;
