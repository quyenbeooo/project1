import React from "react";
import shoeImage from "../image/sp1.webp";
import { Link } from "react-router-dom";
import Tcategory from "../Type/Tcategory";
type Props = {
  categories: Tcategory[];
};

const NewCollections = ({ categories }: Props) => {
  return (
    <>
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-center text-gray-500 text-sm text-teal-600">
            Khám phá thế giới của chúng tôi
          </h2>
          <h1 className="text-center text-3xl font-bold my-4 text-teal-600">
            Danh Mục Sản Phẩm
          </h1>
          <div className="flex justify-center space-x-4">
            {categories.map((category) => (
              <div className="flex-1 max-w-sm">
                <img
                  className="w-full h-auto object-cover"
                  src={shoeImage}
                  alt="Gym Backpack"
                />
                <Link
                  key={category._id}
                  to={`/nike/category/${category._id}`}
                  className="flex justify-center"
                >
                  <button
                    className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-teal-600 hover:border-gray-300 hover:text-gray-700"
                    style={{ fontSize: "20px" }}
                  >
                    {category.name}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewCollections;
