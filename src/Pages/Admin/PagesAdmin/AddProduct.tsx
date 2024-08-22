import React from "react";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import Tshoe from "../../../Type/Tshoe";
import { data } from "autoprefixer";
type Props = {
  onAdd: (product: Tshoe) => void;
};
const schemaProduct = Joi.object({
  name: Joi.string().required().min(3).max(100),
  brand: Joi.string().required().min(3).max(100),
  size: Joi.string().required(),
  price: Joi.number().required().min(0),
  description: Joi.string().allow(null, ""),
  image: Joi.any(),
});
const AddProduct = ({ onAdd }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm<Tshoe>({
    resolver: joiResolver(schemaProduct),
  });
  const onSubmit = (data: Tshoe) => {
    onAdd(data);
  };

  return (
    <>
      <div
        className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8"
        style={{ width: "100%" }}
      >
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Form Thêm Sản Phẩm
          </h1>
          <form
            action="#"
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
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
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="sr-only">
                description
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
                  placeholder="Enter Image"
                  {...register("image", { required: true })}
                />
              </div>
            </div>
            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white "
            >
              Thêm Sản Phẩm
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
