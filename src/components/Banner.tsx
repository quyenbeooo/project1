import React from "react";

type Props = {};

const Banner = (props: Props) => {
  return (
    <>
      <section className="relative w-full h-screen">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        >
          <source
            src="https://storage.googleapis.com/teko-gae.appspot.com/media/video/2024/1/26/cf5fedf5-fe5e-4455-afd4-581b1306fc66/Training_SS_24_Strength_global_Launch_GLP_Female_Masthead_d_9ba579436e.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
              Xin Chào
            </h1>

            <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
              Chúc mọi người có một trải nghiệm về sản phẩm của chúng tôi thật
              tốt
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <a
                href="#"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
              >
                Show Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
