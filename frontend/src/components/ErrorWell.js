import React from "react";

const ErrorWell = ({ message }) => {
  return (
    <div className="rounded-md w-full bg-red-500 text-white p-2 mb-4">
      <p className="text-white text-center">{message}</p>
    </div>
  );
};

export default ErrorWell;
