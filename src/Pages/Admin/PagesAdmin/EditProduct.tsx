import React from "react";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import Tshoe from "../../../Type/Tshoe";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import instancs from "../../../apis";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Tcategory from "../../../Type/Tcategory";
type Props = {
  onEdit: (product: Tshoe) => void;
  categories: Tcategory[];
};
const schemaProduct = Joi.object({
  name: Joi.string().required().min(3).max(100),
  brand: Joi.string().required().min(3).max(100),
  size: Joi.string().required(),
  price: Joi.number().required().min(0),
  description: Joi.string().allow(null, ""),
  image: Joi.any().optional(),
  categoryId: Joi.string().required(),
});
const EditProduct = ({ onEdit, categories }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [product, setProducts] = useState<Tshoe | null>(null);
  const [file, setFile] = useState();
  const [sizes, setSizes] = useState<string[]>([]);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { error },
  } = useForm<Tshoe>({
    resolver: joiResolver(schemaProduct),
  });
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await instancs.get(`/post/${id}`);
          setProducts(data.data);
          console.log(data.data);
          // Cập nhật giá trị cho các trường form
          setValue("name", data.data.name);
          setValue("price", data.data.price);
          setValue("brand", data.data.brand);
          setValue("size", data.data.size);
          setValue("description", data.data.description);
          setValue("image", data.data.image);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      })();
    }
  }, [id]);

  const onSubmit = async (data: Tshoe) => {
    data.size = sizes;
    try {
      console.log("Submit data:", data); // Log dữ liệu được gửi đi

      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(
          "http://localhost:3000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Image upload response:", response);

        const baseURL = "http://localhost:3000";
        const imagePath = `${baseURL}${response.data.filePath}`;
        data.image = imagePath;
      }

      if (id !== undefined) {
        // Khi gọi onEdit, chắc chắn rằng dữ liệu sản phẩm mới có categoryId mới
        onEdit({ ...data, _id: id, categoryId: data.categoryId });
      } else {
        onEdit(data);
      }

      setIsFormVisible(false);
      navigate("/admin/listproduct");
    } catch (error) {
      console.error("Lỗi khi xử lý dữ liệu:", error);
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
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                        placeholder="Enter Size"
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
                      {product?.image && (
                        <div className="text-center">
                          <img
                            src={product.image}
                            alt="Product"
                            className="mx-auto mb-4 h-32 w-auto rounded-md object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="categoryId" className="sr-only">
                      Danh Mục
                    </label>
                    <div className="relative">
                      <select
                        id="categoryId"
                        {...register("categoryId", { required: true })}
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
                  <button
                    type="submit"
                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                  >
                    Sửa Sản Phẩm
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

export default EditProduct;
