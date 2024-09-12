import React from "react";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import Tshoe from "../../../Type/Tshoe";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Tcategory from "../../../Type/Tcategory";
type Props = {
  onAdd: (product: Tshoe) => void;
  categories: Tcategory[];
};
const schemaProduct = Joi.object({
  name: Joi.string().required().min(3).max(100),
  brand: Joi.string().required().min(3).max(100),
  size: Joi.string().required(),
  price: Joi.number().required().min(0),
  description: Joi.string().allow(null, ""),
  image: Joi.any(),
  category: Joi.string().required(),
});
const AddProduct = ({ onAdd, categories }: Props) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [file, setFile] = useState();
  const [sizes, setSizes] = useState<string[]>([]);
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm<Tshoe>({
    resolver: joiResolver(schemaProduct),
  });
  const onSubmit = async (data: Tshoe) => {
    data.size = sizes;
    console.log("Selected category:", data.category);
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        // Gửi yêu cầu tải lên hình ảnh đến server
        const response = await axios.post(
          "http://localhost:3000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);

        // Cập nhật đường dẫn ảnh để hiển thị đúng
        const baseURL = "http://localhost:3000"; // Thay đổi baseURL theo cấu hình của bạn
        const imagePath = `${baseURL}${response.data.filePath}`;

        // Thêm đường dẫn hình ảnh vào dữ liệu sản phẩm
        data.image = imagePath;

        // Gửi dữ liệu sản phẩm với đường dẫn hình ảnh đến hàm onAdd
        const result = await axios.post("http://localhost:3000/post", {
          ...data, // Thêm tất cả các trường vào yêu cầu
          category: data.category, // Đảm bảo categoryId là ObjectId
          image: imagePath, // Đảm bảo rằng hình ảnh được gửi đúng
        });
        console.log(result);
        if (result) {
          onAdd(result.data);
          setIsFormVisible(false); // Ẩn form sau khi thêm
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Lỗi khi gửi yêu cầu:", error.response?.data);
        } else {
          console.error("Lỗi không phải do Axios:", error);
        }
      }
    } else {
      // Nếu không có hình ảnh, gửi dữ liệu sản phẩm mà không có hình ảnh
      try {
        const result = await axios.post("http://localhost:3000/post", {
          ...data,
          category: data.category, // Đảm bảo categoryId là ObjectId
        });
        console.log(result.data);

        if (result) {
          onAdd(result.data);
          setIsFormVisible(false); // Ẩn form sau khi thêm
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Lỗi khi gửi yêu cầu:", error.response?.data);
        } else {
          console.error("Lỗi không phải do Axios:", error);
        }
      }
    }
  };

  const handleFile = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Lấy giá trị từ input
    const input = e.target.value;

    // Chia chuỗi thành mảng bằng dấu phẩy và loại bỏ khoảng trắng
    const sizeArray = input
      .split(",")
      .map((size) => size.trim())
      .filter((size) => size); // Loại bỏ các giá trị rỗng
    console.log("Size Array:", sizeArray);
    // Cập nhật state hoặc dữ liệu gửi đi
    setSizes(sizeArray); // Giả sử bạn có state `sizes`
  };

  return (
    <>
      <div className="p-6 flex justify-center items-center relative">
        {!isFormVisible && (
          <button
            onClick={toggleFormVisibility}
            className="text-white rounded hover:bg-blue-600 w-[15%] h-[170px] text-[100px]"
            style={{ backgroundRepeat: "no-repeat", border: "dashed" }}
          >
            +
          </button>
        )}

        {isFormVisible && (
          <>
            {/* Nền mờ */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm transition-opacity duration-300"
              onClick={toggleFormVisibility}
            ></div>

            {/* Form */}
            <div
              className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 fixed z-10 transition-transform transform translate-y-0 opacity-100 scale-100"
              style={{ width: "100%", marginRight: "145px" }}
            >
              <div className="mx-auto max-w-lg bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                  Form Thêm Sản Phẩm
                </h1>
                <button
                  onClick={toggleFormVisibility}
                  className="absolute top-[52px] right-[380px] text-gray-500 hover:text-gray-700"
                  style={{ fontSize: "25px" }}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
                <form
                  action="#"
                  className="mt-6 space-y-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <p className="text-center text-lg font-medium">
                    Admin Hãy Thêm Sản Phẩm Vào WebSite Đi
                  </p>

                  <div>
                    <label htmlFor="Name" className="sr-only">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                        placeholder="Enter Name"
                        {...register("name", { required: true })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="Price" className="sr-only">
                      Price
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                        placeholder="Enter Price"
                        {...register("price", { required: true })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="Brand" className="sr-only">
                      Brand
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                        placeholder="Enter Brand"
                        {...register("brand", { required: true })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="Size" className="sr-only">
                      Size
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Nhập các size, ví dụ: S,M,L"
                        className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm text-black"
                        {...register("size", { required: true })}
                        onChange={handleSizeChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="sr-only">
                      Description
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                        placeholder="Enter description"
                        {...register("description", { required: true })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="categoryId" className="sr-only">
                      Danh Mục
                    </label>
                    <div className="relative">
                      <select
                        id="categoryId"
                        {...register("category", { required: true })}
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                      >
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="Image" className="sr-only">
                      Image
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm bg-white text-black"
                        {...register("image", { required: true })}
                        onChange={handleFile}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                  >
                    Thêm Sản Phẩm
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AddProduct;
