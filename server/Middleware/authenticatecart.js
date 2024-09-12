import jwt from "jsonwebtoken";

// Middleware để xác thực token
export const protect = (req, res, next) => {
  let token;

  // Kiểm tra xem có tiêu đề Authorization không và nó bắt đầu bằng "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Tách token ra từ tiêu đề Authorization
      token = req.headers.authorization.split(" ")[1];
      console.log("Token received:", token);

      // Xác thực token bằng cách sử dụng bí mật JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      // Lưu thông tin giải mã vào req.user để sử dụng trong các middleware hoặc route tiếp theo
      req.user = decoded;
      next(); // Gọi hàm tiếp theo trong middleware chain
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    // Nếu không có token hoặc token không hợp lệ
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
