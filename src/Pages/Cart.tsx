import React, { useState, useEffect } from "react";
import Tcart from "../Type/Tcart";
import { useDispatch } from "react-redux";
import removeFromCartAsync from "../redux/slice/cartDelete";

type Props = {
  listcart: Tcart[];
};

const Cart = ({ listcart }: Props) => {
  console.log(listcart);

  // Trạng thái đang tải dữ liệu
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Khi component mount xong và dữ liệu đã được lấy về, cập nhật trạng thái loading
    if (listcart.length > 0) {
      setLoading(false);
    }
  }, [listcart]);
  const handleRemove = (cartId: string, productId: string) => {
    dispatch(removeFromCartAsync(cartId, productId));
  };
  return (
    <>
      <div className="mt-[4.5rem]">
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-[80rem] max-w-3xl">
              <header className="text-center">
                <h1 className="text-xl font-bold text-teal-600 sm:text-3xl">
                  Giỏ Hàng
                </h1>
              </header>
              {loading ? (
                <p>Loading...</p> // Hiển thị khi dữ liệu đang được lấy
              ) : listcart.length === 0 ? (
                <p>Giỏ hàng của bạn không có sản phẩm nào</p>
              ) : (
                <div className="mt-8 comments-section w-[100%] mt-[100px] max-h-[450px] overflow-auto scrollbar-hide">
                  {listcart.map((item) => (
                    <ul className="space-y-4 mt-[20px]" key={item._id}>
                      <li className="flex items-center gap-4">
                        <img
                          src={item.product.image}
                          alt=""
                          className="size-16 rounded object-cover w-[200px] h-[200px]"
                        />
                        <div>
                          <h3 className="text-sm text-teal-600">
                            {item.product.name}
                          </h3>
                          <dl className="mt-0.5 space-y-px text-[10px] text-teal-600">
                            <div>
                              <dt className="inline">Size:</dt>
                              <dd className="inline">XXS</dd>
                            </div>
                            <div>
                              <dt className="inline">Color:</dt>
                              <dd className="inline">White</dd>
                            </div>
                          </dl>
                        </div>
                        <div className="flex flex-1 items-center justify-end gap-2">
                          <form>
                            <label htmlFor="Line1Qty" className="sr-only">
                              Quantity
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={item.qty}
                              id="Line1Qty"
                              className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            />
                          </form>
                          <button
                            className="text-gray-600 transition hover:text-teal-600"
                            onClick={() =>
                              handleRemove(item._id, item.product._id)
                            }
                          >
                            <span className="sr-only">Remove item</span>
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
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </li>
                    </ul>
                  ))}
                </div>
              )}
              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-teal-700">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>£250</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>VAT</dt>
                      <dd>£25</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Discount</dt>
                      <dd>-£20</dd>
                    </div>
                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>£200</dd>
                    </div>
                  </dl>
                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="block rounded bg-teal-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-teal-800"
                    >
                      Thanh Toán
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;
