import React from "react";
const Sidebar = () => {
  return (
    <>
      <div className="sidebar bg-teal-600">
        <div className="sidebar_logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>view-dashboard</title>
            <path
              d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z"
              className="logo__img"
            />
          </svg>
          <a href="/">
            <p className="logo_txt">Dashboard</p>
          </a>
        </div>
        <ul>
          <a href="/admin">
            <li>Home</li>
          </a>
          <a href="/admin/list">
            <li>Danh Sách User</li>
          </a>
          <a href="/admin/listproduct">
            <li>Danh Sách Sản Phẩm</li>
          </a>
          <a href="/admin/addproduct">
            <li>Thêm Sản Phẩm</li>
          </a>
          <a href="/admin/category">
            <li>Thêm Danh Mục</li>
          </a>
          <a href="/admin/categorylist">
            <li>Danh Sách Danh Mục</li>
          </a>
          <li>Settings</li>
          <li>Support</li>
          <li>Privacy</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
