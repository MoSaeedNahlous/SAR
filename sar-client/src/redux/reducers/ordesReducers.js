import {
  GET_ORDERS_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_RESET,
  GET_ORDERS_SUCCESS,
} from '../constants/ordersConstants';

export const getOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return {
        loading: true,
        orders: [],
      };
    case GET_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.table,
      };

    case GET_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_ORDERS_RESET:
      return {
        loading: false,
        error: '',
        orders:[]
      }

    default:
      return state;
  }
};
