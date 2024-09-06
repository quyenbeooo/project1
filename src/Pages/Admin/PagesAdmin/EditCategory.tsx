import React from "react";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Tcategory from "../../../Type/Tcategory";
import { useParams } from "react-router-dom";
type Props = {
  onEditCategory: (category: Tcategory) => void;
};

const schemaProduct = Joi.object({
  name: Joi.string().required().min(3).max(100),
  slug: Joi.string().required().min(3).max(100),
});

const EditCategory = ({ onEditCategory }: Props) => {
  const { id } = useParams();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [category, setCategory] = useState<Tcategory | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Tcategory>({
    resolver: joiResolver(schemaProduct),
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`/category/${id}`);
          if (data) {
            setCategory(data);
            setValue("name", data.name);
            setValue("slug", data.slug);
          } else {
            console.error("Không tìm thấy danh mục với ID này.");
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu danh mục:", error);
        }
      };
      fetchData();
    }
  }, [id, setValue]);

  const onSubmit = (data: Tcategory) => {
    console.log(data);

    if (id !== undefined) {
      onEditCategory({ ...data, _id: id });
      window.location.reload();
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
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
                  Form Thêm Danh Mục
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
                    <label htmlFor="Slug" className="sr-only">
                      Slug
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                        placeholder="Enter Slug"
                        {...register("slug", { required: true })}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                  >
                    Sửa Sản Danh Mục
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

export default EditCategory;
