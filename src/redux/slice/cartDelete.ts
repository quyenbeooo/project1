import axios from "axios";
import { AppDispatch } from "../store";
import { Deletecart } from "./cartSlice";
import Cookies from "universal-cookie";

const removeFromCartAsync =
  (cartId: string, productId: string) => async (dispatch: AppDispatch) => {
    const cookies = new Cookies();
    const token = cookies.get("token"); // Giả sử token được lưu trong cookie với tên "token"
    console.log(cartId);

    try {
      // Gửi request tới server để xóa sản phẩm khỏi giỏ hàng với token trong header
      await axios.delete(
        `http://localhost:3000/order/remove/${cartId}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Cập nhật Redux state sau khi xóa sản phẩm thành công
      dispatch(Deletecart({ productId, cartId }));
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      // Xử lý lỗi nếu cần
    }
  };

export default removeFromCartAsync;
