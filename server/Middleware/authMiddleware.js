// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id, // Đảm bảo bao gồm _id của người dùng
      username: user.username, // Hoặc bất kỳ thông tin nào khác bạn muốn thêm
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // Ví dụ: Token hết hạn sau 1 giờ
    }
  );
};

// Middleware khác có thể nằm ở đây
