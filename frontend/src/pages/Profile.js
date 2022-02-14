import React, { useState, useEffect } from "react";
import { Link, Navigate, useSearchParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  getUserDetails,
  register,
  updateUserProfile,
} from "../actions/userActions";
import ErrorWell from "../components/ErrorWell";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { toast } from "react-toastify";
import { listMyOrders } from "../actions/orderActions";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { success } = useSelector((state) => state.userUpdateProfile);

  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = useSelector((state) => state.orderListMy);
  console.log("orders...", orders);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, dispatch, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    //   Dispatch login here

    // Dispatch register
    console.log("password", "confirmPassword", password, confirmPassword);
    if (!name || !email) {
      setMessage("Fill all the fields you lazy little man!");
    } else if (password !== confirmPassword) {
      setMessage("Passwords donot match!");
    } else {
      // Dispatch here
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      );
      toast.success("🚀 Updated Successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <h1 className="text-center text-4xl font-bold my-14">👑 User Profile</h1>

      {loading && <Loader />}
      <div className="grid grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto gap-10">
        <div className="flex items-start justify-center col-span-1">
          <form
            onSubmit={submitHandler}
            className="border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0)] rounded-md bg-white p-8 inline-flex flex-col w-full"
          >
            {error && <ErrorWell message={error} />}
            <label htmlFor="name" className="text-gray-600 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Manu Arora"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              id="name"
              className="border rounded-sm border-black px-2 py-2 mb-4 focus:outline-none focus:ring-2 ring-black text-gray-700 text-sm"
            />
            <label htmlFor="email" className="text-gray-600 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="manu@manuarora.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
              className="border rounded-sm border-black px-2 py-2 mb-4 focus:outline-none focus:ring-2 ring-black text-gray-700 text-sm"
            />
            <label htmlFor="password" className="text-gray-600 font-bold mb-2">
              Password
            </label>
            <input
              type="text"
              value={password}
              name="password"
              id="password"
              placeholder="paajisexy123"
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-sm border-black px-2 py-2 mb-4 focus:outline-none focus:ring-2 ring-black text-gray-700 text-sm"
            />
            <label
              htmlFor="confirmPassword"
              className="text-gray-600 font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="text"
              value={confirmPassword}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="paajisexy123"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border rounded-sm border-black px-2 py-2 mb-4 focus:outline-none focus:ring-2 ring-black text-gray-700 text-sm"
            />
            {message && <ErrorWell message={message} />}
            <button
              type="submit"
              className="block mx-auto w-full my-4 font-normal text-sm rounded-md px-4 py-4 bg-gradient-to-r from-black to-[#272727] text-white "
            >
              Save Details
            </button>
          </form>
        </div>
        <div className="border-2 border-black rounded-md p-4 shadow-xl col-span-2">
          <h2 className="text-2xl font-bold">Order History</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <ErrorWell message={errorOrders} />
          ) : (
            <div>
              <div className="flex flex-row items-center justify-start px-2 py-4 rounded-md bg-green-500 text-white shadow mb-4 mt-4">
                <p className="text-xs px-2 w-[33%]">Order ID</p>
                <p className="text-xs px-2 w-[20%]">Created At</p>
                <p className="text-xs px-2 w-[10%]">Price</p>
                <p className="text-xs px-2 w-[15%]">Paid At</p>
                <p className="text-xs px-2 w-[20%]">Delivered At</p>
              </div>
              {orders.map((order) => (
                <Link to={`/order/${order._id}`} key={order._id}>
                  <div className="flex flex-row items-center justify-start px-2 py-4 rounded-md bg-white shadow mb-4 ">
                    <p className="text-xs px-2 w-[33%]">{order._id}</p>
                    <p className="text-xs px-2 w-[20%]">
                      {order.createdAt.substr(0, 10)}
                    </p>
                    <p className="text-xs px-2 w-[10%]">${order.totalPrice}</p>
                    <p className="text-xs px-2 w-[15%]">
                      {order.isPaid ? (
                        <span className="bg-green-500 p-2 rounded-md text-white">
                          {order.paidAt?.substr(0, 10)}
                        </span>
                      ) : (
                        <span className="bg-red-500 p-2 rounded-md text-white">
                          Not Paid
                        </span>
                      )}
                    </p>
                    <p className="text-xs px-2 w-[20%]">
                      {order.isDelivered ? (
                        <span className="bg-green-500 p-2 rounded-md text-white">
                          {order.deliveredAt.substr(0, 10)}
                        </span>
                      ) : (
                        <span className="bg-red-500 p-2 rounded-md text-white">
                          Not Delivered
                        </span>
                      )}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
