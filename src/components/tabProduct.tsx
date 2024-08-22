import React from "react";

type Props = {};

const tabProduct = (props: Props) => {
  return (
    <>
      <div>
        <div className="sm:hidden">
          <label htmlFor="Tab" className="sr-only">
            Tab
          </label>

          <select id="Tab" className="w-full rounded-md border-gray-200">
            <option>Settings</option>
            <option>Messages</option>
            <option>Archive</option>
            <option>Notifications</option>
          </select>
        </div>

        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6" aria-label="Tabs">
              <a
                href="#"
                className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Settings
              </a>

              <a
                href="#"
                className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Messages
              </a>

              <a
                href="#"
                className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Archive
              </a>

              <a
                href="#"
                className="shrink-0 border-b-2 border-sky-500 px-1 pb-4 text-sm font-medium text-sky-600"
                aria-current="page"
              >
                Notifications
              </a>
            </nav>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default tabProduct;
