import React from "react";
import Tcategory from "../../../Type/Tcategory";
import { Link } from "react-router-dom";
type Props = {
  listCategory: Tcategory[];
  onDelCategory: (id: number) => void;
};

const CategoryList = ({ listCategory, onDelCategory }: Props) => {
  // Kiểm tra xem listCategory có được định nghĩa và là một mảng không
  if (!Array.isArray(listCategory)) {
    return <div>Không có danh mục nào</div>;
  }
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="text-center">
              <th className="whitespace-nowrap px-4 py-2 font-medium text-white-900">
                Tên
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-white-900">
                Slug
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-white-900">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center">
            {listCategory.map((category) => {
              if (!category) {
                // Xử lý trường hợp category là undefined
                return (
                  <tr key="undefined">
                    <td
                      colSpan={3}
                      className="whitespace-nowrap px-4 py-2 text-center text-red-500"
                    >
                      Dữ liệu danh mục không hợp lệ
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={category._id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-white-900">
                    {category.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-white-900">
                    {category.slug}
                  </td>
                  <td className="flex justify-center gap-[5px] px-4 py-2">
                    <Link to={`/admin/editcategory/${category._id}`}>
                      <button className="inline-block rounded bg-teal-600 px-4 py-2 text-xs font-medium text-white hover:bg-teal-700">
                        Sửa
                      </button>
                    </Link>
                    <button
                      className="inline-block rounded bg-teal-600 px-4 py-2 text-xs font-medium text-white hover:bg-teal-700"
                      onClick={() => onDelCategory(category._id)}
                    >
                      Xóa
                    </button>
                    <button className="inline-block rounded bg-teal-600 px-4 py-2 text-xs font-medium text-white hover:bg-teal-700">
                      Xem
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoryList;
