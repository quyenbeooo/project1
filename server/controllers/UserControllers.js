import express from "express";
import User from "../models/UserModel.js";

class UserControllers {
  async getAllUser(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async updateUserProfile(req, res) {
    const userId = req.params.userId;
    const {
      username,
      email,
      password,
      confirmPassword,
      dateOfBirth,
      phoneNumber,
      address,
      role,
      imageUrl,
    } = req.body;

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        {
          username,
          email,
          password,
          confirmPassword,
          dateOfBirth,
          phoneNumber,
          address,
          role,
          imageUrl,
        },
        { new: true } // Trả về bản ghi đã cập nhật
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({ message: "User profile updated", user: updatedUser });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update user profile",
        error: error.message,
      });
    }
  }
  async lockAccount(req, res) {
    try {
      const userId = req.params.userId;
      const user = await User.findByIdAndUpdate(
        userId,
        { isLocked: true },
        { new: true }
      );
      res.status(200).json({ message: "Account locked successfully", user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Mở khóa tài khoản
  async unlockAccount(req, res) {
    try {
      const userId = req.params.userId;
      const user = await User.findByIdAndUpdate(
        userId,
        { isLocked: false },
        { new: true }
      );
      res.status(200).json({ message: "Account unlocked successfully", user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default UserControllers;
