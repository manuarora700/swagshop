import {
  CART_ADD_ITEMS,
  CART_REMOVE_ITEMS,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

const cartInitialState = {
  cartItems: [],
  shippingAddress: {},
};
export const cartReducers = (state = cartInitialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEMS: {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    }
    case CART_REMOVE_ITEMS: {
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    }
    case CART_SAVE_SHIPPING_ADDRESS: {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
