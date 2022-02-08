import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ChevronDownIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const logoutHandler = () => {
    console.log("logout handler");
    dispatch(logout());
  };

  return (
    <header className="bg-gay-800 flex flex-row justify-between items-center px-10 py-4 shadow">
      <div className="brand">
        <Link to="/">🤩 Swagshop</Link>
      </div>
      <div className="flex flex-row items-center space-x-4">
        <Link
          to="/cart"
          className="font-bold hover:text-gray-700 tracking-wide"
        >
          🛒 Cart
        </Link>
        {userInfo ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md  hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                {userInfo.name}
                👇🏻
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    <Link
                      to="/profile"
                      className={`bg-blue-500 text-white group flex rounded-md items-center w-full px-2 py-2 text-sm my-2`}
                    >
                      🔨 Profile
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={logoutHandler}
                      className={`bg-blue-500 text-white group flex rounded-md items-center w-full px-2 py-2 text-sm my-2`}
                    >
                      👋 Logout
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <Link
            to="/login"
            className="font-bold hover:text-gray-700 tracking-wide"
          >
            🚀 Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
