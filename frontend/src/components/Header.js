import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-gay-800 flex flex-row justify-between items-center px-10 py-4 shadow">
      <div className="brand ">🤩 Swagshop</div>
      <div className="flex flex-row items-center space-x-4">
        <Link
          to="/cart"
          className="font-bold hover:text-gray-700 tracking-wide"
        >
          🛒 Cart
        </Link>
        <Link
          to="/login"
          className="font-bold hover:text-gray-700 tracking-wide"
        >
          🚀 Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
