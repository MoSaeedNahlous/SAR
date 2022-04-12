import {
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_RESET,
  GET_CUSTOMERS_SUCCESS,
  ADD_CUSTOMER_FAIL,
  ADD_CUSTOMER_REQUEST,
  ADD_CUSTOMER_RESET,
  ADD_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_RESET,
  DELETE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_REQUEST, UPDATE_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_FAIL, BLOCK_CUSTOMER_REQUEST, BLOCK_CUSTOMER_SUCCESS, UNBLOCK_CUSTOMER_REQUEST, UNBLOCK_CUSTOMER_SUCCESS, BLOCK_CUSTOMER_FAIL, UNBLOCK_CUSTOMER_FAIL,
} from '../constants/customersConstants';

import {
  SET_CURRENT_CUSTOMER,
  SET_CURRENT_CUSTOMER_RESET,

} from '../constants/customersConstants';
import axios from 'axios';

export const getCustomers = (name) => async (dispatch) => {
  try {
    
    // loading
    dispatch({
      type: GET_CUSTOMERS_REQUEST,
    });

    const { data } = await axios.get(
      name ?
      `http://mhmodmj-001-site1.itempurl.com/api/User?level=selectByName&username=${name}`:
      `http://mhmodmj-001-site1.itempurl.com/api/User?level=selectByEmployeeM&empid=2`
    );

    dispatch({
      type: GET_CUSTOMERS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: GET_CUSTOMERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addNewCustomer = (
    name,
    add1,
    add2,
    mob1,
    mob2,
    cityId,
    notes,
    url
) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CUSTOMER_REQUEST,
    });

      const body = {
            "level": "insert",
            "userId":"12761",
            "username":name,
            "address1":add1,
            "address2":add2,
            "mobile1":mob1,
            "mobile2":mob2,
            "BlockReason":"1",      
            "url":url,
            "notes":notes,
            "CityID":cityId,
            "empId":"2",
            "IsBlocked":"1",
            "state":"1",
            "images":"1",
            "password":"1",
            "gender":"1"
        }

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/User`,body
    );

    dispatch({
      type: ADD_CUSTOMER_SUCCESS,
      payload: data,
    });

  } catch (error) {
    
    dispatch({
      type: ADD_CUSTOMER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCustomer = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CUSTOMER_REQUEST,
    });

    const body = {
            "level":"delete",
      "userId":id,
      "username":"6",
      "address1":"1",
      "address2":"1",
       "mobile1":"1",
      "mobile2":"1",
        "BlockReason":"1",      
        "url":"1",
        "notes":"1",
         "CityID":"1",
        "empId":"2",
        "IsBlocked":"1",
        "state":"1",
           "images":"1",
              "password":"1",
           "gender":"1"
        }

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/User`,body
    );

    if(data.table[0].column1 === "cant delete it") {
      throw new Error("لا يمكن حذف الزبون لوجود معلومات متعلقة فيه")
    }

    dispatch({
      type: DELETE_CUSTOMER_SUCCESS,
      payload: data,
    });


  } catch (error) {
    
    dispatch({
      type: DELETE_CUSTOMER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const blockCustomer = (id) => async (dispatch) => {
  try {
    dispatch({type:BLOCK_CUSTOMER_REQUEST})

    const body = {
            "level":"setBlocked",
      "userId":id,
      "username":"6",
      "address1":"1",
      "address2":"1",
       "mobile1":"1",
      "mobile2":"1",
        "BlockReason":"1",      
        "url":"1",
        "notes":"1",
         "CityID":"1",
        "empId":"2",
        "IsBlocked":"1",
        "state":"1",
           "images":"1",
              "password":"1",
           "gender":"1"
        }

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/User`,body
    );

    dispatch({type:BLOCK_CUSTOMER_SUCCESS})


  } catch (error) {
    
    dispatch({
      type: BLOCK_CUSTOMER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const unBlockCustomer = (id) => async (dispatch) => {
  try {
    dispatch({type:UNBLOCK_CUSTOMER_REQUEST})

    const body = {
            "level":"deBlocked",
      "userId":id,
      "username":"6",
      "address1":"1",
      "address2":"1",
       "mobile1":"1",
      "mobile2":"1",
        "BlockReason":"1",      
        "url":"1",
        "notes":"1",
         "CityID":"1",
        "empId":"2",
        "IsBlocked":"1",
        "state":"1",
           "images":"1",
              "password":"1",
           "gender":"1"
        }

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/User`,body
    );

    dispatch({type:UNBLOCK_CUSTOMER_SUCCESS})


  } catch (error) {
    
    dispatch({
      type: UNBLOCK_CUSTOMER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCustomer = (
    id,
    name,
    add1,
    add2,
    mob1,
    mob2,
    cityId,
    notes,
    url
) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CUSTOMER_REQUEST,
    });

      const body = {
            "level": "update",
            "userId":id,
            "username":name,
            "address1":add1,
            "address2":add2,
            "mobile1":mob1,
            "mobile2":mob2,
            "BlockReason":"1",      
            "url":url,
            "notes":notes,
            "CityID":cityId,
            "empId":"2",
            "IsBlocked":"1",
            "state":"1",
            "images":"1",
            "password":"1",
            "gender":"1"
        }

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/User`,body
    );

    dispatch({
      type: UPDATE_CUSTOMER_SUCCESS,
      payload: data,
    });

  } catch (error) {
    
    dispatch({
      type: UPDATE_CUSTOMER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setCurrentCustomer = (customer) => async (dispatch) => {
    dispatch({
      type: SET_CURRENT_CUSTOMER,
      payload: customer,
    });
};

