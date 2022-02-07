import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";

const Cart = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const productId = params.id;
  const qty = Number(searchParams.get("qty"))
    ? Number(searchParams.get("qty"))
    : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    console.log("remove from cart..", id);
    dispatch(removeFromCart(id));
  };
  const proceedToCheckout = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <div className="cart">
      <h1 className="text-center font-bold text-4xl mt-10 mb-20">
        🛒 Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <h1 className="text-center font-bold my-24 text-4xl">
          Your Cart is Empty. Go buy something!
        </h1>
      ) : (
        <div className="grid grid-cols-3 gap-10 max-w-7xl mx-auto items-start">
          <div className="col-span-2 space-y-4">
            {cartItems.map((product) => (
              <div
                key={product.name}
                className="flex flex-row bg-white py-2 px-4 rounded-md shadow space-x-10 items-start justify-between"
              >
                <img src={product.image} className="w-24 rounded-md" alt="U" />
                <Link to={`/product/${product.product}`}>
                  <p className="w-32 font-semibold text-base">{product.name}</p>
                </Link>
                <p className="w-32 font-semibold text-base">${product.price}</p>
                <select
                  value={product.qty}
                  // type="number"
                  className="border border-black rounded-sm px-4 py-2"
                  onChange={(e) =>
                    dispatch(addToCart(product.product, Number(e.target.value)))
                  }
                >
                  {[...Array(product.countInStock).keys()].map((elem, idx) => {
                    return (
                      <option key={elem + 1} value={elem + 1}>
                        {elem + 1}
                      </option>
                    );
                  })}
                </select>
                <button onClick={() => removeFromCartHandler(product.product)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
          <div className="px-4 py-4 bg-white rounded-md product-card">
            <p className="my-2">
              Subtotal for ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
              ) items
            </p>
            <p className="my-2 font-bold text-2xl">
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </p>
            <button
              onClick={proceedToCheckout}
              disabled={cartItems.length === 0}
              className="block mx-auto w-11/12 my-4 font-normal text-sm rounded-md px-4 py-4 bg-gradient-to-r from-black to-[#272727] text-white "
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
