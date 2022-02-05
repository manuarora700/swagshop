import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="relative">
      <div className="absolute bg-red-500 rounded-md z-10 px-2 py-1 text-white font-bold -top-2 -left-2 transform -rotate-2">
        {product.brand}
      </div>
      <div className="rounded-md product-card p-2 group overflow-hidden h-full">
        <div className="p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-md transform group-hover:scale-110 transition duration-[4000ms] ease-in-out"
          />
        </div>

        <div className="px-4">
          <h1 className="my-2 font-semibold text-2xl">{product.name}</h1>
          <p className="my-4 font-normal  text-sm text-gray-600 ">
            {/* {product.rating} ⭐️ from {product.numReviews} reviews */}
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </p>
          <span className="inline-block my-4 font-normal text-xl rounded-md px-4 py-1 bg-gradient-to-r from-black to-[#272727] text-white">
            ${product.price}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
