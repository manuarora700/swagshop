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

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
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
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto gap-10">
        <div className="flex items-center justify-center ">
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
        <div className="border-2 border-black rounded-md p-4 shadow-xl">
          <h2 className="text-2xl font-bold">Order History</h2>
        </div>
      </div>
    </>
  );
};

export default Profile;
