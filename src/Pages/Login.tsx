import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../ConText/AppContext";

const Login = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(username, password);
      console.log("Đăng nhập thành công, userData:", userData);
      console.log(
        "Username set in sessionStorage:",
        sessionStorage.getItem("username")
      );

      alert("Đăng nhập thành công");
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error.message);
      alert(
        error.response?.data?.message ||
          "Tài Khoản của bạn đã bị khóa vui lòng liên hệ bên suport để được hỗ trợ"
      );
    }
  };

  return (
    <>
      <section className="relative flex items-center justify-center h-screen p-20">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Đăng Nhập</h1>
            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
              nulla eaque error neque ipsa culpa autem, at itaque nostrum!
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            action="#"
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Tên Đăng Nhập
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Tên Đăng Nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mật Khẩu
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                Đăng Nhập
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
