import React from "react";
import Sidebar from "./ComponentsAdmin/Sidebar";
import HeaderAdmin from "./ComponentsAdmin/HeaderAdmin";
import "./AppAdmin.css";
import { Outlet } from "react-router-dom";
type Props = {};

const HomeAdmin = (props: Props) => {
  return (
    <>
      <div className="app-container ">
        <Sidebar />
        <main className="main-content">
          <HeaderAdmin />
          <div className="content">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default HomeAdmin;
