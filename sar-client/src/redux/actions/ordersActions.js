import {
  GET_ORDERS_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
} from '../constants/ordersConstants';
import axios from 'axios';
export const getOrdersByPhoneNumber = (number) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_ORDERS_REQUEST,
    });

    const body = {
      level: 'selectByPhone',
      PurchaseId: '',
      EmpId: '0',
      mobile1: number,
      state: '',
      deliveryID: '',
      BillID: '',
      date: '',
      pageNumber: 1,
    };

    const { data } = await axios.post(`/api/PurchaseView`, body);

    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrdersById = (id) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_ORDERS_REQUEST,
    });

    const body = {
      level: 'selectById',
      PurchaseId: id,
      EmpId: '0',
      mobile1: '',
      state: '',
      deliveryID: '',
      BillID: '',
      date: '',
      pageNumber: 1,
    };

    const { data } = await axios.post(`/api/PurchaseView`, body);

    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrdersByBill = (bill) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_ORDERS_REQUEST,
    });

    const body = {
      level: 'selectByBill',
      PurchaseId: '',
      EmpId: '0',
      mobile1: '',
      state: '',
      deliveryID: '',
      BillID: bill,
      date: '',
      pageNumber: 1,
    };

    const { data } = await axios.post(`/api/PurchaseView`, body);

    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const filterOrders =
  (state, date, empId, deliveryId) => async (dispatch) => {
    try {
      // loading
      dispatch({
        type: GET_ORDERS_REQUEST,
      });

      const body = {
        level: 'selectByFilter',
        PurchaseId: '',
        EmpId: empId,
        mobile1: '',
        state: state,
        deliveryID: deliveryId,
        BillID: '',
        date: date,
        pageNumber: 1,
      };

      const { data } = await axios.post(`/api/PurchaseView`, body);

      dispatch({
        type: GET_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ORDERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
