// Header.tsx
import React, { useState } from "react";
import { useAuth } from "../ConText/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartFlatbed } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";

const Header: React.FC = () => {
  const { user, setUser, logout } = useAuth();

  const cookies = new Cookies();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    cookies.remove("token");
    logout();
    setUser(null);
    navigate("/");
  };

  return (
    <header className="bg-white fixed w-full z-10 top-0 shadow">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="#">
              <div className="text-5xl font-bold text-sm">DEV</div>
            </a>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    Trang Chủ
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    Loại
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    Lịch Sử
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    Dịch Vụ
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    Dự Án
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4 relative">
            {user ? (
              <div className="flex items-center gap-4 relative">
                <img
                  src=""
                  alt="Ảnh Đại Diện Người Dùng"
                  className="w-10 h-10 rounded-full"
                />
                <button
                  onClick={handleMenuToggle}
                  className="text-black-500 transition hover:text-gray-500/75 focus:outline-none font-bold capitalize"
                >
                  {user.username}
                </button>
                {isMenuOpen && (
                  <div
                    tabIndex={0}
                    onBlur={() => setIsMenuOpen(false)}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
                    style={{
                      marginTop: "190px",
                      marginRight: "-183px",
                      width: "310px",
                    }}
                  >
                    <ul>
                      <li>
                        <Link to={`/profile/${user._id}`}>
                          <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Hồ Sơ
                          </button>
                        </Link>
                      </li>
                      <li>
                        <a
                          href="/settings"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Cài Đặt
                        </a>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Đăng Xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="sm:flex sm:gap-4">
                <a
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  href="/login"
                >
                  Đăng Nhập
                </a>
                <div className="hidden sm:flex">
                  <a
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                    href="/register"
                  >
                    Đăng Ký
                  </a>
                </div>
              </div>
            )}

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <div className="carts cursor-pointer relative">
              <ul>
                <li>
                  <a href="/cart">
                    <FontAwesomeIcon
                      icon={faCartFlatbed}
                      style={{ color: "#63E6BE", fontSize: "20px" }}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
