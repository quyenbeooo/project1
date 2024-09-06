import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Tshoe from "../../Type/Tshoe";
import { useParams } from "react-router-dom";

const CategoryNike = () => {
  const { categoryId } = useParams();
  console.log(categoryId);

  const [products, setProducts] = useState<Tshoe[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/post/category/${categoryId}`
        );
        setProducts(response.data.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);
  useEffect(() => {
    console.log(products); // Kiểm tra sản phẩm có được lưu vào state không
  }, [products]);
  return (
    <>
      <section>
        <div className="mt-[4.5rem]">
          <div className="custom-gradient mt-[4.5rem] h-[100px] text-black-600 pt-[35px]">
            <span className="text-2xl font-bold ml-[140px] text-teal-900 ">
              Sản Phẩm
            </span>
          </div>
        </div>
        <main className="w-full flex justify-center mt-[50px] gap-[40px]">
          <div className="search_category_sum h-auto " style={{ width: "65%" }}>
            <div className="relative">
              <label htmlFor="Search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                id="Search"
                placeholder="Search for..."
                className="w-full rounded-md border border-gray-300 py-2.5 pl-3 pr-10 shadow-sm sm:text-sm"
              />
              <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-700"
                >
                  <span className="sr-only">Search</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </span>
            </div>
            <div className="category_nike mt-[50px] flex flex-wrap gap-[78px]">
              {products.length > 0 ? (
                products.map((product) => (
                  <div className="w-[28%]" key={product._id}>
                    <a
                      href={`/shoedetail/${product._id}`}
                      className="group relative block overflow-hidden"
                    >
                      <img
                        src={product.image}
                        className="h-64 w-[275px] object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                        alt={product.name}
                      />
                      <div className="relative border border-gray-100 bg-white p-6">
                        <h3 className="mt-4 text-lg font-medium text-gray-900 truncate">
                          {product.name}
                        </h3>
                        <p className="mt-1.5 text-sm text-gray-700">
                          ${product.price}
                        </p>
                        <form className="mt-4">
                          <button className="block w-full rounded bg-teal-600 p-4 text-sm font-medium transition hover:scale-105">
                            Add to Cart
                          </button>
                        </form>
                      </div>
                    </a>
                  </div>
                ))
              ) : (
                <p>Không có sản phẩm nào</p>
              )}
            </div>
          </div>
          {/* phần fake option */}
          <div className="sidebars space-y-10" style={{ width: "30%" }}>
            <div className="border-gray-200 bg-white">
              <span className="text-sm font-medium"> Thương Hiệu </span>
              <ul className="space-y-1 border-t border-gray-200 p-4">
                <li>
                  <label
                    htmlFor="FilterInStock"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterInStock"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      Nike (5+){" "}
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterPreOrder"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterPreOrder"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      Jodan (3+){" "}
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterOutOfStock"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterOutOfStock"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      Adidas (10+){" "}
                    </span>
                  </label>
                </li>
              </ul>
            </div>
            <div className="border-gray-200 bg-white">
              <span className="text-sm font-medium"> Kiểu Dáng </span>
              <ul className="space-y-1 border-t border-gray-200 p-4">
                <li>
                  <label
                    htmlFor="FilterInStock"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterInStock"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      Trẻ Trung (5+){" "}
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterPreOrder"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterPreOrder"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      Trưởng Thành (3+){" "}
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterOutOfStock"
                    className="inline-flex items-center gap-2"
                  ></label>
                </li>
              </ul>
            </div>
            <div className="border-gray-200 bg-white">
              <span className="text-sm font-medium"> Mặt Hàng </span>
              <ul className="space-y-1 border-t border-gray-200 p-4">
                <li>
                  <label
                    htmlFor="FilterInStock"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterInStock"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      Oder (5+){" "}
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterPreOrder"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterPreOrder"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      Có Sẵn (3+){" "}
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterOutOfStock"
                    className="inline-flex items-center gap-2"
                  ></label>
                </li>
              </ul>
            </div>
            <div className="border-gray-200 bg-white">
              <span className="text-sm font-medium"> Xuất Sứ </span>
              <ul className="space-y-1 border-t border-gray-200 p-4">
                <li>
                  <label
                    htmlFor="FilterInStock"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterInStock"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      Việt Nam (5+){" "}
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterPreOrder"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterPreOrder"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      Mỹ (3+){" "}
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterPreOrder"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterPreOrder"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      Hàn Quốc (3+){" "}
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterPreOrder"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterPreOrder"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      Nhật Bản (3+){" "}
                    </span>
                  </label>
                </li>
              </ul>
            </div>
            <div className=" buttons">
              <a
                className="w-full group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                href="#"
              >
                <span className="absolute inset-0 translate-x-0 translate-y-0 bg-teal-600 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"></span>

                <span className="text-center relative block border border-teal-600 bg-white px-8 py-3 text-teal-600">
                  {" "}
                  Áp Dụng{" "}
                </span>
              </a>
            </div>
          </div>
          {/* hết phần fake option */}
        </main>
      </section>
    </>
  );
};

export default CategoryNike;
