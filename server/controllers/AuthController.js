import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

class AuthController {
  // đăng kí
  async registerUser(req, res) {
    try {
      const token = await bcrypt.genSalt(10);
      const tokenuser = await bcrypt.hash(req.body.password, token);

      //   Khởi tạo user mới
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: tokenuser,
        confirmPassword: tokenuser,
        dateOfBirth: req.body.dateOfBirth,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        role: req.body.role || "client",
      });

      //   Lưu vào db

      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // đăng nhập

  async loginUser(req, res) {
    try {
      // Tìm người dùng theo username
      const users = await User.findOne({ username: req.body.username });

      // Kiểm tra nếu không tìm thấy người dùng
      if (!users) {
        return res.status(404).json("Wrong Username!");
      }

      // Kiểm tra nếu tài khoản bị khóa
      if (users.isLocked) {
        return res
          .status(403)
          .json("Account is locked. Please contact support.");
      }

      // Kiểm tra mật khẩu
      const valiPassword = await bcrypt.compare(
        req.body.password,
        users.password
      );
      if (!valiPassword) {
        return res.status(404).json("Wrong Password!");
      }

      // Nếu username và mật khẩu đúng, trả về thông tin người dùng
      res.status(200).json(users);
    } catch (error) {
      // Bắt lỗi và trả về thông báo lỗi
      res.status(500).json({ message: "Login failed. Please try again." });
    }
  }
}
export default AuthController;
