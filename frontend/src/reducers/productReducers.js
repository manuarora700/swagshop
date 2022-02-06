import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
} from "../constants/productConstants";

const productListInitialState = {
  products: [],
};

const productDetailsInitialState = {
  product: {},
  reviews: [],
};

export const productListReducer = (state = productListInitialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST: {
      return { loading: true, products: [] };
    }
    case PRODUCT_LIST_SUCCESS: {
      return {
        loading: false,
        products: action.payload,
      };
    }
    case PRODUCT_LIST_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const productDetailsReducer = (
  state = productDetailsInitialState,
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST: {
      return { loading: true, ...state };
    }
    case PRODUCT_DETAILS_SUCCESS: {
      return {
        loading: false,
        product: action.payload,
      };
    }
    case PRODUCT_DETAILS_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
