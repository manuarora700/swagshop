import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_MY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

const orderCreateInitialState = {};
export const orderCreateReducer = (state = orderCreateInitialState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST: {
      return { loading: true };
    }
    case ORDER_CREATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    }
    case ORDER_CREATE_FAIL: {
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

const orderDetailsInitialState = {
  orderItems: [],
  shippingAddress: {},
  loading: true,
};
export const orderDetailsReducer = (
  state = orderDetailsInitialState,
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST: {
      return { ...state, loading: true };
    }
    case ORDER_DETAILS_SUCCESS: {
      return {
        loading: false,
        order: action.payload,
      };
    }
    case ORDER_DETAILS_FAIL: {
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

const orderPayInitialState = {};
export const orderPayReducer = (state = orderPayInitialState, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST: {
      return { loading: true };
    }
    case ORDER_PAY_SUCCESS: {
      return {
        loading: false,
        success: true,
      };
    }
    case ORDER_PAY_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    case ORDER_PAY_RESET: {
      return {};
    }

    default: {
      return state;
    }
  }
};

const orderListMyInitialState = {
  orders: [],
};
export const orderListMyReducer = (state = orderListMyInitialState, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST: {
      return { loading: true };
    }
    case ORDER_LIST_MY_SUCCESS: {
      console.log("order list my success...reducer", action.payload);
      return {
        loading: false,
        orders: action.payload,
      };
    }
    case ORDER_LIST_MY_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    case ORDER_LIST_MY_RESET: {
      return { orders: [] };
    }

    default: {
      return state;
    }
  }
};
