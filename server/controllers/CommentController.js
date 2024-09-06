import Comment from "../models/CommentModel.js";
import jwt from "jsonwebtoken"; // Để xác thực token JWT
class CommentController {
  async getComments(req, res) {
    try {
      const { productId } = req.params;
      const comments = await Comment.find({ productId }).populate(
        "userId",
        "username"
      ); // Tùy chỉnh để populate thông tin người dùng
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async createComment(req, res) {
    try {
      const { userId, productId, content } = req.body;
      if (!userId || !productId || !content) {
        return res
          .status(400)
          .json({ error: "userId, productId, and content are required" });
      }

      // Kiểm tra tính hợp lệ của token và xác thực người dùng
      const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header
      if (!token) {
        return res.status(401).json({ error: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded || decoded.id !== userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Kiểm tra xem người dùng có tồn tại không
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).json({ error: "User not found" });
      }

      // Tạo bình luận
      const comment = await Comment.create({ userId, productId, content });

      res.status(201).json({
        message: "Comment created successfully",
        data: comment,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
export default CommentController;
