import React from "react";
import Tshoe from "../../../Type/Tshoe";
import { Link } from "react-router-dom";
type Props = {
  listproduct: Tshoe[];
  ondel: (id: number) => void;
};

const ListProduct = ({ listproduct, ondel }: Props) => {
  return (
    <>
      <div
        className="rounded-lg  border-gray-200"
        style={{ padding: "30px", width: "1300px" }}
      >
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  Image
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  Brand
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  Size
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  Category
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody
              className="divide-y divide-gray-200"
              style={{ textAlign: "center" }}
            >
              {listproduct &&
                listproduct.map((item) => {
                  if (!item) return null;

                  return (
                    <tr key={item._id}>
                      <td className="whitespace-nowrap px-4 py-2 text-white">
                        {item._id}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-white">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-white">
                        {item.price}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-white">
                        <img
                          src={item.image}
                          className="h-16 w-16 object-cover"
                        />
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-white">
                        {item.brand}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-white">
                        {item.size}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-white">
                        {item.categoryId?.name || "No Category"}
                      </td>
                      <td
                        className="whitespace-nowrap px-4 py-2 text-white"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div className="action-buttons">
                          <Link to={`/admin/editproduct/${item._id}`}>
                            <button
                              className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
                              style={{ borderRadius: "5px", padding: "5px" }}
                            >
                              Edit
                            </button>
                          </Link>
                          <button
                            className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600"
                            style={{ borderRadius: "5px", padding: "5px" }}
                          >
                            View
                          </button>
                          <button
                            className="inline-block px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                            style={{ borderRadius: "5px", padding: "5px" }}
                            onClick={() => ondel(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
          <ol className="flex justify-end gap-1 text-xs font-medium">
            <li>
              <a
                href="#"
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                1
              </a>
            </li>

            <li className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
              2
            </li>

            <li>
              <a
                href="#"
                className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                3
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                4
              </a>
            </li>

            <li>
              <a
                href="#"
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default ListProduct;
