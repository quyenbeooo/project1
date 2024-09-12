import React from "react";
import Tshoe from "../Type/Tshoe";
import Tcategory from "../Type/Tcategory";
import "swiper/swiper-bundle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

type Props = {
  listShoe: Tshoe[];
  categories: Tcategory[];
};

const HomeClient = ({ listShoe }: Props) => {
  return (
    <>
      <section className="mt-[30px]">
        <section className="overflow-hidden rounded-lg shadow-2xl md:grid md:grid-cols-3">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1611510338559-2f463335092c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
            className="h-32 w-full object-cover md:h-full"
          />

          <div
            className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8"
            style={{ padding: "12rem" }}
          >
            <p className="text-teal-600 font-semibold uppercase tracking-widest">
              Run with the pack
            </p>

            <h2 className="mt-6 font-black uppercase">
              <span className="text-teal-600  font-black sm:text-5xl lg:text-6xl">
                {" "}
                Get 20% off{" "}
              </span>

              <span className="mt-2 block text-teal-600 ">
                On your next order over $50
              </span>
            </h2>

            <a
              className="mt-8 inline-block w-full bg-teal-600  py-4 text-sm font-bold uppercase tracking-widest text-white "
              href="#"
            >
              Get Discount
            </a>

            <p className="mt-8 text-xs font-medium uppercase text-teal-600">
              Offer valid until 24th March, 2021 *
            </p>
          </div>
        </section>
      </section>
      <section>
        {/* list Danh mục sản phẩm */}
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <section>
            <div className="reenmx-auto max-w-sc-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
              <header className="text-center">
                <h2 className="text-2xl font-bold text-center text-teal-600 mt-8 mb-4  border-gray-200 py-2">
                  Product Collection
                </h2>

                <p className="mx-auto mt-4 max-w-md text-teal-600">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Itaque praesentium cumque iure dicta incidunt est ipsam,
                  officia dolor fugit natus?
                </p>
              </header>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {listShoe.map((item) => (
                  <li>
                    <a href={`/shoedetail/${item._id}`} className="group block">
                      <img
                        src={item.image}
                        className="h-[350px] w-full object-contain sm:h-[450px]"
                        alt={item.name}
                      />
                      <div className="mt-1.5 p-5">
                        <div className="mt-3 flex justify-between text-sm">
                          <p className="text-gray-900">$ {item.price}</p>
                        </div>
                        <div className="mt-1.5 flex gap-1">
                          <form>
                            <fieldset>
                              <legend className="sr-only">Color</legend>
                            </fieldset>
                            <div className="flex flex-wrap justify-center gap-1">
                              {/* Checkbox labels */}
                            </div>
                          </form>
                        </div>
                        <div className="name-buttons flex justify-center items-center gap-16">
                          <p
                            className="text-xs font-bold text-teal-600"
                            style={{
                              fontSize: "20px",
                              maxWidth: "150px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              height: "22px",
                            }}
                          >
                            {item.name}
                          </p>
                          <button
                            className="flex items-center px-4 py-2 text-white rounded-lg"
                            style={{ background: "rgb(13, 148, 136)" }}
                          >
                            <FontAwesomeIcon icon={faCartShopping} />
                            Mua
                          </button>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default HomeClient;
