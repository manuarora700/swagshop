import React, { useEffect, useState } from "react";
import { Link, Navigate, useSearchParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import ErrorWell from "../components/ErrorWell";

import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  //   Calculate prices.
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = addDecimals(
    Number(cart.shippingPrice) + Number(cart.taxPrice) + Number(cart.itemsPrice)
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [success]);

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <CheckoutSteps step1 step2 step3 step4 />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-4xl font-bold my-4">
          ✨ Order Review{" "}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="col-span-2 border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0)] rounded-md bg-white p-8 inline-flex flex-col items-start w-full">
            <div>
              <h4 className="text-2xl font-bold mb-4">Shipping </h4>
              <p className="">
                <strong>Address: </strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-4 mt-4">Payment </h4>
              <p className="">
                <strong>Method: </strong> {cart.paymentMethod}
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-4 mt-4">Order Items </h4>
              {cart.cartItems.length === 0 ? (
                <div>Cart is empty!</div>
              ) : (
                <div className="w-full">
                  {cart.cartItems.map((product) => (
                    <div
                      key={product.name}
                      className="flex flex-row bg-white py-2 px-4 rounded-md shadow space-x-10 items-start justify-between mb-4 w-full"
                    >
                      <img
                        src={product.image}
                        className="w-24 rounded-md"
                        alt="U"
                      />
                      <Link to={`/product/${product.product}`}>
                        <p className="w-32 font-semibold text-base">
                          {product.name}
                        </p>
                      </Link>
                      <p className="w-full font-semibold text-base">
                        ${product.qty} x ${product.price} = $
                        {product.qty * product.price}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="mb-4">
              <h4 className="text-2xl font-bold mb-4 mt-4">Order Summary </h4>
              <p className="mb-2">
                <strong>Items price: </strong> ${cart.itemsPrice}
              </p>
              <p className="mb-2">
                <strong>Shipping: </strong> ${cart.shippingPrice}
              </p>
              <p className="mb-2">
                <strong>Tax: </strong> ${cart.taxPrice}
              </p>
              <p className="bg-red-500 rounded-md text-white px-2 py-2">
                <strong>Total: </strong> ${cart.totalPrice}
              </p>
            </div>
            {error && <ErrorWell message={error} />}
            <button
              type="button"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
              className="block mx-auto w-full my-4 font-normal text-sm rounded-md px-4 py-4 bg-gradient-to-r from-black to-[#272727] text-white "
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
