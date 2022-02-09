import React, { useEffect, useState } from "react";
import { Link, Navigate, useSearchParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import ErrorWell from "../components/ErrorWell";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState(null);
  if (!shippingAddress) {
    navigate("/shipping");
  }

  useEffect(() => {
    console.log("paymentMethod", paymentMethod);
  }, [paymentMethod]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      setError("Select a payment method man!");
    } else {
      dispatch(savePaymentMethod(paymentMethod));
      navigate("/place-order");
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <CheckoutSteps step1 step2 step3 />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-4xl font-bold my-4">
          💵 Payment Method{" "}
        </h1>

        <form
          onSubmit={onSubmitHandler}
          className="border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0)] rounded-md bg-white p-8 inline-flex flex-col w-1/3"
        >
          <div className="flex flex-row">
            <label
              name="payment"
              htmlFor="payment"
              className={`p-4  hover:bg-gray-400 cursor-pointer rounded-md ${
                paymentMethod === "PayPal"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              PayPal or Credit Card
            </label>
            <input
              type="radio"
              name="payment"
              id="payment"
              hidden
              //   checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              value="PayPal"
            />
          </div>

          <button
            type="submit"
            className="block mx-auto w-full my-4 font-normal text-sm rounded-md px-4 py-4 bg-gradient-to-r from-black to-[#272727] text-white "
          >
            Continue
          </button>
          {error && <ErrorWell message={error} />}
        </form>
      </div>
    </>
  );
};

export default Payment;
