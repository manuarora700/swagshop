import React, { useState, useEffect } from "react";
import { Link, Navigate, useSearchParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { login } from "../actions/userActions";
import ErrorWell from "../components/ErrorWell";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [componentError, setComponentError] = useState("");

  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "/";
  console.log("redirect...", redirect);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    //   Dispatch login here
    dispatch(login(email, password));
    setComponentError(error);
  };

  return (
    <>
      <h1 className="text-center text-4xl font-bold my-4">👋 Sign in</h1>

      {loading && <Loader />}
      <div className="flex items-center justify-center h-96">
        <form
          onSubmit={submitHandler}
          className="border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0)] rounded-md bg-white p-8 inline-flex flex-col w-1/3"
        >
          {error && <ErrorWell message={error} />}
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
          <button
            type="submit"
            className="block mx-auto w-full my-4 font-normal text-sm rounded-md px-4 py-4 bg-gradient-to-r from-black to-[#272727] text-white "
          >
            Sign in
          </button>
          <p className="text-center text-sm">
            New guy?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : `/register`}
              className="font-bold"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
