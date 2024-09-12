import React, { useState, useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
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
import AddCategory from "./Pages/Admin/PagesAdmin/AddCategory";
import CategoryList from "./Pages/Admin/PagesAdmin/CategoryList";
import EditCategory from "./Pages/Admin/PagesAdmin/EditCategory";
import Tshoe from "./Type/Tshoe";
import createProduct from "./apis/Shoe";
import Comment from "./Pages/Comment";
import EditProduct from "./Pages/Admin/PagesAdmin/EditProduct";
import instancs from "./apis";
import CategoryNike from "./Pages/CategoryClient/CategoryNike";
import createCategory from "./apis/Category";
import Tcategory from "./Type/Tcategory";
import { toast } from "react-toastify";
import Cart from "./Pages/Cart";
import Tcart from "./Type/Tcart";
import Cookies from "js-cookie";
import "./App.css";
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
  const [cart, setCart] = useState<Tcart[]>([]);
  const [category, setCategory] = useState<Tcategory[]>([]);
  const [user, setUser] = useState<[]>([]);

  // lấy dữ liệu sản phẩm và show ra màn hình
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

  // lấy dữ liệu giỏ hàng và show ra màn hình
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = Cookies.get("token");
        // console.log("Retrieved token:", token);
        // if (!token) throw new Error("Token not found");

        const response = await axios.get(
          "http://localhost:3000/order/allcart",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const allCartItems = response.data.flatMap(
          (cart: { cartItems: Tcart[] }) => cart.cartItems
        );

        setCart(allCartItems);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCartItems();
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
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const responses = await axios.get("http://localhost:3000/category");
        setCategory(
          Array.isArray(responses.data.data) ? responses.data.data : []
        );
      } catch (error) {
        console.error("Error fetching shoes:", error);
      }
    };
    fetchCategory();
  }, []);
  const handleAddProduct = (newShoe: Tshoe) => {
    (async () => {
      const newProduct = await createProduct(newShoe);
      setShoes([...shoes, newProduct]);
      navigate("/admin/listproduct");
      window.location.reload();
    })();
  };
  const handleDeleteProduct = (id: number) => {
    console.log(id);

    (async () => {
      const confirms = confirm("Bạn Chắc muốn xóa sản phẩm chứ?");
      if (confirms) {
        await axios.delete(`http://localhost:3000/post/${id}`);
        setShoes(shoes.filter((item) => item._id !== id && item));
      }
    })();
  };
  const handleEditProduct = async (shoe: Tshoe) => {
    try {
      // Kiểm tra xem id của sản phẩm có hợp lệ không
      if (!shoe._id) {
        console.error("ID sản phẩm không hợp lệ");
        return;
      }

      // Gửi yêu cầu PUT để chỉnh sửa sản phẩm
      const { data } = await instancs.put(`/post/${shoe._id}`, shoe);

      // Kiểm tra dữ liệu trả về
      if (data && data._id) {
        // Cập nhật danh sách sản phẩm nếu thành công
        setShoes(shoes.map((item) => (item._id === data._id ? data : item)));
        navigate("/admin/listproduct");
        window.location.reload();
      } else {
        console.error("Dữ liệu trả về không hợp lệ:", data);
      }
    } catch (error) {
      console.log("loi edit app");
    }
  };
  const handleAddCategory = (NewCategory: Tcategory) => {
    (async () => {
      const newCategory = await createCategory(NewCategory);
      toast.success("Thêm sản phẩm thành công!");
      setCategory([...category, newCategory]);
      navigate("/admin/categorylist");
    })();
  };
  const handleDeleteCategory = (_id: number) => {
    console.log(_id);

    (async () => {
      const confirms = confirm("Bạn Chắc muốn xóa danh mục chứ?");
      if (confirms) {
        await axios.delete(`http://localhost:3000/category/${_id}`);
        setCategory(category.filter((item) => item._id !== _id && item));
      }
    })();
  };
  const handleEditCategory = async (categoryss: Tcategory) => {
    console.log(categoryss);

    try {
      // Kiểm tra xem id của danh mục có hợp lệ không
      if (!categoryss._id) {
        console.error("ID danh mục không hợp lệ");
        return;
      }

      // Gửi yêu cầu PUT để chỉnh sửa danh mục
      const { data } = await instancs.put(
        `/category/${categoryss._id}`,
        { name: categoryss.name, slug: categoryss.slug } // Đảm bảo gửi đúng dữ liệu
      );

      // Kiểm tra dữ liệu trả về
      if (data && data.data && data.data._id) {
        // Cập nhật danh sách sản phẩm nếu thành công
        setCategory(
          category.map((item) =>
            item._id === data.data._id ? data.data : item
          )
        );
        navigate("/admin/categorylist");
      } else {
        console.error("Dữ liệu trả về không hợp lệ:", data);
      }
    } catch (error) {
      console.error("Lỗi khi chỉnh sửa danh mục:", error);
    }
  };

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
                <NewCollections categories={category} />
                <HomeClient listShoe={shoes} categories={category} />
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
                <Comment productId={String(useParams().id)} />
                <Footer />
              </>
            }
          />
          <Route
            path="/nike/category/:categoryId"
            element={
              <>
                <Header />
                <CategoryNike />
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

          <Route
            path="/cart"
            element={
              <LoginLayout>
                <Header />
                <Cart listcart={cart} />
                <Footer />
              </LoginLayout>
            }
          />
          {/* admin */}

          <Route path="/admin" element={<HomeAdmin />}>
            <Route index element={<div>Welcome to Admin Dashboard</div>} />
            <Route path="/admin/list" element={<ListUser listUser={user} />} />
            <Route
              path="/admin/listproduct"
              element={
                <ListProduct listproduct={shoes} ondel={handleDeleteProduct} />
              }
            />
            <Route
              path="/admin/addproduct"
              element={
                <AddProduct onAdd={handleAddProduct} categories={category} />
              }
            />
            <Route
              path="/admin/editproduct/:id"
              element={
                <EditProduct onEdit={handleEditProduct} categories={category} />
              }
            />
            <Route
              path="/admin/category"
              element={<AddCategory onAddCategory={handleAddCategory} />}
            />
            <Route
              path="/admin/categorylist"
              element={
                <CategoryList
                  listCategory={category}
                  onDelCategory={handleDeleteCategory}
                />
              }
            />
            <Route
              path="/admin/editcategory/:id"
              element={<EditCategory onEditCategory={handleEditCategory} />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
