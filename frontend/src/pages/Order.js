import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useSearchParams,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import ErrorWell from "../components/ErrorWell";

import { saveShippingAddress } from "../actions/cartActions";

import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const Order = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const orderId = params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    success: successPay,
    error: errorPay,
  } = orderPay;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    //   Calculate prices.
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    order.shippingPrice = addDecimals(order.itemsPrice > 100 ? 0 : 100);
  }

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      console.log("clientId", clientId);
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
      console.log("effect first level...");
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        console.log("effect second level...");
        setSdkReady(true);
      }
    }

    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
    console.log("effect triggered...");
  }, [dispatch, order, orderId, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
    // navigate("/");
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto"></div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-4xl font-bold my-4">
          🙌🏻 Order Details{" "}
        </h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="w-1/2 mx-auto">
            <ErrorWell message={error} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="col-span-2 border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0)] rounded-md bg-white p-8 inline-flex flex-col items-start w-full">
                <div>
                  <h4 className="text-base font-bold mb-4">
                    Order ID:{" "}
                    <span className="text-base text-semibold">
                      {order._id}{" "}
                    </span>
                  </h4>
                  <h4 className="text-2xl font-bold mb-4">Shipping </h4>
                  {order.isDelivered ? (
                    <div className="rounded-md p-2 bg-green-500 text-white mb-4">
                      Delivered on {order.deliveredAt}.
                    </div>
                  ) : (
                    <div className="rounded-md p-2 bg-red-500 text-white mb-4">
                      Not Delivered yet. Sad!
                    </div>
                  )}
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                  </p>
                  <a href={`mailto:${order.user.email}`}>
                    <strong>Email: </strong> {order.user.email}
                  </a>
                  <p className="">
                    <strong>Address: </strong> {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-4 mt-4">Payment </h4>

                  <p className="">
                    <strong>Method: </strong> {order.paymentMethod}
                  </p>
                  <p>
                    {order.isPaid ? (
                      <div className="rounded-md p-2 bg-green-500 text-white">
                        Paid on {moment(order.paidAt).format("LL")}. Good job!
                      </div>
                    ) : (
                      <div className="rounded-md p-2 bg-red-500 text-white">
                        Not paid bro! Not cool
                      </div>
                    )}
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-4 mt-4">Order Items </h4>
                  {order.orderItems.length === 0 ? (
                    <div>Cart is empty!</div>
                  ) : (
                    <div className="w-full">
                      {order.orderItems.map((product) => (
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
                  <h4 className="text-2xl font-bold mb-4 mt-4">
                    Order Summary{" "}
                  </h4>
                  <p className="mb-2">
                    <strong>Items price: </strong> ${order.itemsPrice}
                  </p>
                  <p className="mb-2">
                    <strong>Shipping: </strong> ${order.shippingPrice}
                  </p>
                  <p className="mb-2">
                    <strong>Tax: </strong> ${order.taxPrice}
                  </p>
                  <p className="bg-red-500 rounded-md text-white px-2 py-2">
                    <strong>Total: </strong> ${order.totalPrice}
                  </p>
                </div>
                {!order.isPaid && (
                  <div>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <div>
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Order;
