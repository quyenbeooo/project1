import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import NewCollections from "./components/NewCollections";
import HomeClient from "./Pages/HomeClient";
import ShoeDetail from "./Pages/ShoeDetail";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProFile from "./Pages/Profile";
import axios from "axios";
import { AuthProvider } from "./ConText/AppContext";
import HomeAdmin from "./Pages/Admin/HomeAdmin";
import ListUser from "./Pages/Admin/PagesAdmin/ListUser";
import ListProduct from "./Pages/Admin/PagesAdmin/ListProduct";
import AddProduct from "./Pages/Admin/PagesAdmin/AddProduct";
import Tshoe from "./Type/Tshoe";
import createProduct from "./apis/Shoe";
const LoginLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

function App() {
  const navigate = useNavigate();
  const [shoes, setShoes] = useState<Tshoe[]>([]);
  const [user, setUser] = useState<[]>([]);
  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const responses = await axios.get("http://localhost:3000/post");
        setShoes(Array.isArray(responses.data.data) ? responses.data.data : []);
      } catch (error) {
        console.error("Error fetching shoes:", error);
      }
    };
    fetchShoes();
  }, []);
  // Dữ liệu admin
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const datauser = await axios.get("http://localhost:3000/user");
        setUser(datauser.data);
        // console.log(datauser);
      } catch (error) {
        console.log("loi lay data user", error);
      }
    };
    fetchUser();
  }, []);
  const handleAddProduct = (newShoe: Tshoe) => {
    (async () => {
      const newProduct = await createProduct(newShoe);
      setShoes([...shoes, newProduct]);
      navigate("/admin/listproduct");
    })();
  };

  // const handleSave = async (updatedUser: User) => {
  //   try {
  //     // Gọi API để lưu thông tin người dùng
  //     const response = await instancs.put(
  //       `/user/${updatedUser._id}`,
  //       updatedUser
  //     );
  //     console.log("Profile updated:", response.data.user);
  //     // Xử lý các hành động khác nếu cần
  //   } catch (error) {
  //     console.error("Failed to update profile:", error);
  //   }
  // };

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Banner />
                <HomeClient listShoe={shoes} />
                <NewCollections />
                <Footer />
              </>
            }
          />
          <Route
            path="/shoedetail/:id"
            element={
              <>
                <Header />
                <ShoeDetail />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <LoginLayout>
                <Login />
              </LoginLayout>
            }
          />
          <Route
            path="/register"
            element={
              <LoginLayout>
                <Register />
              </LoginLayout>
            }
          />

          <Route
            path="/profile/:id"
            element={
              <LoginLayout>
                <ProFile />
              </LoginLayout>
            }
          />
          {/* admin */}

          <Route path="/admin" element={<HomeAdmin />}>
            <Route index element={<div>Welcome to Admin Dashboard</div>} />
            <Route path="/admin/list" element={<ListUser listUser={user} />} />
            <Route
              path="/admin/listproduct"
              element={<ListProduct listproduct={shoes} />}
            />
            <Route
              path="/admin/addproduct"
              element={<AddProduct onAdd={handleAddProduct} />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
