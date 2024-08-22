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
      const users = await User.findOne({ username: req.body.username });
      if (!users) {
        res.status(404).json("Wrong Username!");
      }
      const valiPassword = await bcrypt.compare(
        req.body.password,
        users.password
      );
      if (!valiPassword) {
        res.status(404).json("Wrong Username!");
      }
      if (users && valiPassword) {
        res.status(200).json(users);
      }
    } catch (error) {}
  }
}
export default AuthController;
