import {
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_RESET,
  GET_CUSTOMERS_SUCCESS,
  SET_CURRENT_CUSTOMER,
  SET_CURRENT_CUSTOMER_RESET,
  ADD_CUSTOMER_FAIL,
  ADD_CUSTOMER_REQUEST,
  ADD_CUSTOMER_RESET,
  ADD_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_RESET,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_RESET,
  BLOCK_CUSTOMER_REQUEST,
  BLOCK_CUSTOMER_SUCCESS,
  BLOCK_CUSTOMER_FAIL,
  BLOCK_CUSTOMER_RESET,
  UNBLOCK_CUSTOMER_REQUEST,
  UNBLOCK_CUSTOMER_SUCCESS,
  UNBLOCK_CUSTOMER_FAIL,
  UNBLOCK_CUSTOMER_RESET,
} from '../constants/customersConstants';

export const getCustomersReducer = (state = { customers: [] }, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_REQUEST:
      return {
        loading: true,
        customers: [],
      };

    case GET_CUSTOMERS_SUCCESS:
      return {
        loading: false,
        customers: action.payload.table,
      };

    case GET_CUSTOMERS_FAIL:
      return { loading: false, error: action.payload };

    case GET_CUSTOMERS_RESET:
      return { loading: false, error: '', customers: [] };

    default:
      return state;
  }
};

export const addCustomerReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CUSTOMER_REQUEST:
      return { loading: true };
    case ADD_CUSTOMER_SUCCESS:
      return {
        loading: false,
        success: true,
        // categories: action.payload.table,
      };
    case ADD_CUSTOMER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_CUSTOMER_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteCustomerReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CUSTOMER_REQUEST:
      return { loading: true };
    case DELETE_CUSTOMER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_CUSTOMER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_CUSTOMER_RESET:
      return {};
    default:
      return state;
  }
};

export const updateCustomerReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CUSTOMER_REQUEST:
      return { loading: true };
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_CUSTOMER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_CUSTOMER_RESET:
      return {};
    default:
      return state;
  }
};

export const setCurrentCustomerReducer = (
  state = { currentCustomer: {} },
  action
) => {
  switch (action.type) {
    case SET_CURRENT_CUSTOMER:
      return {
        currentCustomer: action.payload,
      };
    case SET_CURRENT_CUSTOMER_RESET:
      return {
        currentCustomer: {},
      };
    default:
      return state;
  }
};

export const blockReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOCK_CUSTOMER_REQUEST:
      return { loading: true };
    case BLOCK_CUSTOMER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case BLOCK_CUSTOMER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BLOCK_CUSTOMER_RESET:
      return {};
    default:
      return state;
  }
};

export const unBlockReducer = (state = {}, action) => {
  switch (action.type) {
    case UNBLOCK_CUSTOMER_REQUEST:
      return { loading: true };
    case UNBLOCK_CUSTOMER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UNBLOCK_CUSTOMER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UNBLOCK_CUSTOMER_RESET:
      return {};
    default:
      return state;
  }
};
