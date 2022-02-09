import React from "react";

import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex flex-row space-x-4 my-4">
      <div>
        {step1 ? (
          <Link to="/login">Sign in &rarr;</Link>
        ) : (
          <p className="text-gray-400">Sign in </p>
        )}
      </div>
      <div>
        {step2 ? (
          <Link to="/shipping">Shipping &rarr;</Link>
        ) : (
          <p className="text-gray-400">Shipping </p>
        )}
      </div>
      <div>
        {step3 ? (
          <Link to="/payment">Payment &rarr;</Link>
        ) : (
          <p className="text-gray-400">Payment </p>
        )}
      </div>
      <div>
        {step3 ? (
          <Link to="/place-order">Place Order &rarr;</Link>
        ) : (
          <p className="text-gray-400">Place Order </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
