import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";

import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, [dispatch, params]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} />
      ) : (
        <div className="grid grid-cols-3 gap-10 py-20 items-start max-w-7xl mx-auto">
          <div className="relative">
            <img
              src={product.image}
              className="rounded-md shadow-xl z-10"
              alt={product.name}
            />{" "}
          </div>
          <div>
            <h1 className="font-bold text-2xl mb-4">{product.name}</h1>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            <p className="my-2 text-xl font-bold mt-4">${product.price}</p>
            <p className="my-2 text-base font-normal text-gray-800">
              {product.description}
            </p>
          </div>
          <div className="border-2 border-black shadow-[5px_5px_0px_rgb(0,0,0)] rounded-md p-2 divide-y w-3/4">
            <div className="flex flex-row justify-between mb-4">
              <p>Price: </p>
              <p>${product.price} </p>
            </div>
            <div className="flex flex-row justify-between mb-4">
              <p>Status: </p>
              <p>{product.countInStock > 0 ? "In Stock" : "Out of Stock"} </p>
            </div>
            <button
              disabled={product.countInStock === 0}
              className="block mx-auto w-11/12 my-4 font-normal text-sm rounded-md px-4 py-4 bg-gradient-to-r from-black to-[#272727] text-white "
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
