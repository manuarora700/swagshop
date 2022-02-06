import React from "react";
import { toast } from "react-toastify";

const Message = ({ message = "Something went wrong" }) => {
  const showError = () => {
    toast.error(message, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return <div>{showError()}</div>;
};

export default Message;
