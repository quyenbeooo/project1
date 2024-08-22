import React from "react";
import shoeImage from "../image/sp1.webp";
type Props = {};

const NewCollections = (props: Props) => {
  return (
    <>
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-center text-gray-500 text-sm">
            Khám phá thế giới của chúng tôi
          </h2>
          <h1 className="text-center text-3xl font-bold my-4">
            Bộ sưu tập mới
          </h1>
          <div className="flex justify-center space-x-4">
            <div className="flex-1 max-w-sm">
              <img
                className="w-full h-auto object-cover"
                src={shoeImage}
                alt="Gym Backpack"
              />
              <p className="text-center mt-2 text-black font-bold">Giày Nike</p>
            </div>
            <div className="flex-1 max-w-sm">
              <img
                className="w-full h-auto object-cover"
                src={shoeImage}
                alt="Run Division"
              />
              <p className="text-center mt-2 text-black font-bold">
                Giày Jodan
              </p>
            </div>
            <div className="flex-1 max-w-sm">
              <img
                className="w-full h-auto object-cover"
                src={shoeImage}
                alt="Dri-Fit Sport BC"
              />
              <p className="text-center mt-2 text-black font-bold">Giày YZ</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewCollections;
