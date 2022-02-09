import React, { useState } from "react";
import { Link, Navigate, useSearchParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import ErrorWell from "../components/ErrorWell";

import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let data = {
      address,
      city,
      postalCode,
      country,
    };
    dispatch(saveShippingAddress(data));
    navigate("/payment");
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <CheckoutSteps step1 step2 />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-4xl font-bold my-4">🛳 Shipping </h1>

        <form
          onSubmit={onSubmitHandler}
          className="border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0)] rounded-md bg-white p-8 inline-flex flex-col w-1/3"
        >
          <label htmlFor="address" className="text-gray-600 font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            placeholder="420/69 Park Avenue Street"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            name="address"
            id="address"
            required
            className="border rounded-sm border-black px-2 py-2 mb-4 focus:outline-none focus:ring-2 ring-black text-gray-700 text-sm"
          />

          <label htmlFor="city" className="text-gray-600 font-bold mb-2">
            City
          </label>
          <input
            type="text"
            placeholder="420/69 Park Avenue Street"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            name="city"
            id="city"
            required
            className="border rounded-sm border-black px-2 py-2 mb-4 focus:outline-none focus:ring-2 ring-black text-gray-700 text-sm"
          />

          <label htmlFor="postalCode" className="text-gray-600 font-bold mb-2">
            Postal Code
          </label>
          <input
            type="text"
            placeholder="420/69 Park Avenue Street"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            name="postalCode"
            id="postalCode"
            required
            className="border rounded-sm border-black px-2 py-2 mb-4 focus:outline-none focus:ring-2 ring-black text-gray-700 text-sm"
          />
          <label htmlFor="country" className="text-gray-600 font-bold mb-2">
            Country
          </label>
          <input
            type="text"
            placeholder="420/69 Park Avenue Street"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            name="country"
            id="country"
            required
            className="border rounded-sm border-black px-2 py-2 mb-4 focus:outline-none focus:ring-2 ring-black text-gray-700 text-sm"
          />
          <button
            type="submit"
            className="block mx-auto w-full my-4 font-normal text-sm rounded-md px-4 py-4 bg-gradient-to-r from-black to-[#272727] text-white "
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default Shipping;
