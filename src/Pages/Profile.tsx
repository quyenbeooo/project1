import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../ConText/AppContext";
import User from "../Type/Tuser";

const Profile = () => {
  const { user, setUser } = useAuth();
  // const [selectedImage, setSelectedImage] = useState(null);
  console.log(user);

  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm<User>();
  const [formData, setFormData] = useState({
    _id: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirthDay: "",
    dateOfBirthMonth: "",
    dateOfBirthYear: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        _id: user._id || "",
        username: user.username || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        dateOfBirthDay: user.dateOfBirth || "",
        dateOfBirthMonth: user.dateOfBirth || "",
        dateOfBirthYear: user.dateOfBirth || "",
        dateOfBirth: user.dateOfBirth || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/user/${user._id}`,
        formData
      );
      setUser(response.data.user);
      alert("Cập nhật hồ sơ thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật hồ sơ:", error);
      alert("Cập nhật hồ sơ thất bại.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 mt-10 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Hồ Sơ Của Tôi</h2>
      <p className="mb-6 text-gray-600">
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tên đăng nhập */}
          <div>
            <label className="block text-gray-700">Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Upload File */}
          <div className="text-center">
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src=""
              alt="Profile"
            />
            <input
              type="file"
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
            />
            Chọn Ảnh
            <p className="mt-2 text-sm text-gray-600">
              Dung lượng file tối đa 1 MB
            </p>
            <p className="text-sm text-gray-600">Định dạng: JPEG, PNG</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              readOnly
              value={formData.email}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          {/* Số Điện Thoại */}
          <div>
            <label className="block text-gray-700">Số điện thoại</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Địa chỉ */}
          <div>
            <label className="block text-gray-700">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* ngày sinh */}
          <div className="md:col-span-2">
            <label className="block text-gray-700">Ngày sinh</label>
            <div className="mt-2 flex space-x-4">
              <select
                name="dateOfBirthDay"
                value={formData.dateOfBirthDay}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                name="dateOfBirthMonth"
                value={formData.dateOfBirthMonth}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {[
                  "Tháng 1",
                  "Tháng 2",
                  "Tháng 3",
                  "Tháng 4",
                  "Tháng 5",
                  "Tháng 6",
                  "Tháng 7",
                  "Tháng 8",
                  "Tháng 9",
                  "Tháng 10",
                  "Tháng 11",
                  "Tháng 12",
                ].map((month, index) => (
                  <option key={index + 1} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                name="dateOfBirthYear"
                value={formData.dateOfBirthYear}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={2024 - i} value={2024 - i}>
                    {2024 - i}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Lưu
        </button>
      </form>
    </div>
  );
};

export default Profile;
