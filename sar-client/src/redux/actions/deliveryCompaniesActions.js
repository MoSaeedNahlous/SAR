import {
  GET_DELIVERY_COMPANIES_FAIL,
  GET_DELIVERY_COMPANIES_REQUEST,
  GET_DELIVERY_COMPANIES_RESET,
  GET_DELIVERY_COMPANIES_SUCCESS,
  ADD_DELIVERY_COMPANY_FAIL,
  ADD_DELIVERY_COMPANY_REQUEST,
  ADD_DELIVERY_COMPANY_RESET,
  ADD_DELIVERY_COMPANY_SUCCESS, DELETE_DELIVERY_COMPANY_FAIL,
  DELETE_DELIVERY_COMPANY_REQUEST,
  DELETE_DELIVERY_COMPANY_RESET,
  DELETE_DELIVERY_COMPANY_SUCCESS,
  UPDATE_DELIVERY_COMPANY_REQUEST, UPDATE_DELIVERY_COMPANY_SUCCESS, UPDATE_DELIVERY_COMPANY_FAIL,
   HIDE_DELIVERY_COMPANY_REQUEST, HIDE_DELIVERY_COMPANY_SUCCESS, SHOW_DELIVERY_COMPANY_REQUEST, SHOW_DELIVERY_COMPANY_SUCCESS
} from '../constants/deliveryCompaniesConstants';

import {
  SET_CURRENT_DELIVERY_COMPANY,
  SET_CURRENT_DELIVERY_COMPANY_RESET,

} from '../constants/deliveryCompaniesConstants';
import axios from 'axios';

export const getDeliveryCompanies = () => async (dispatch) => {
  try {
    
    // loading
    dispatch({
      type: GET_DELIVERY_COMPANIES_REQUEST,
    });

    const { data } = await axios.get(
      `http://mhmodmj-001-site1.itempurl.com/api/Delivery?level=selectM`
    );

    dispatch({
      type: GET_DELIVERY_COMPANIES_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: GET_DELIVERY_COMPANIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addNewDeliveryCompany = (name) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_DELIVERY_COMPANY_REQUEST,
    });

    const body = {
    "level": "insert",
    "PName": "1",
    "deliveryID": "6",
    "deliveryName": name,
    "state": "1",
    "notes": "1",
    "images": "1"
}

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/Delivery`,body
    );

    dispatch({
      type: ADD_DELIVERY_COMPANY_SUCCESS,
      payload: data,
    });

  } catch (error) {
    
    dispatch({
      type: ADD_DELIVERY_COMPANY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDeliveryCompany = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_DELIVERY_COMPANY_REQUEST,
    });

    const body = {
    "level": "delete",
    "PName": "1",
    "deliveryID": id,
    "deliveryName": "1",
    "state": "1",
    "notes": "1",
    "images": "1"
}

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/Delivery`,body
    );

    if(data.table[0].column1 === "cant delete it") {
      throw new Error("لا يمكن حذف الشركة لوجود معلومات متعلقة فيه")
    }

    dispatch({
      type: DELETE_DELIVERY_COMPANY_SUCCESS,
      payload: data,
    });


  } catch (error) {
    
    dispatch({
      type: DELETE_DELIVERY_COMPANY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const hideDeliveryCompany = (id) => async (dispatch) => {
  try {
    dispatch({type:HIDE_DELIVERY_COMPANY_REQUEST,payload:id})

    const body = {
    "level": "hide",
    "PName": "1",
    "deliveryID": id,
    "deliveryName": "1",
    "state": "1",
    "notes": "1",
    "images": "1"
}

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/Delivery`,body
    );

    dispatch({type:HIDE_DELIVERY_COMPANY_SUCCESS,payload:id})


  } catch (error) {
    
    console.error(error);
  }
};
export const showDeliveryCompany = (id) => async (dispatch) => {
  try {
    dispatch({type:SHOW_DELIVERY_COMPANY_REQUEST,payload:id})

    const body = {
    "level": "show",
    "PName": "1",
    "deliveryID": id,
    "deliveryName": "1",
    "state": "1",
    "notes": "1",
    "images": "1"
}

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/Delivery`,body
    );
    dispatch({type:SHOW_DELIVERY_COMPANY_SUCCESS,payload:id})


  } catch (error) {
    
    console.error(error);
  }
};

export const updateDeliveryCompany = (id,name) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_DELIVERY_COMPANY_REQUEST,
    });

    const body = {
    "level": "update",
    "PName": "1",
    "deliveryID": id,
    "deliveryName": name,
    "state": "1",
    "notes": "1",
    "images": "1"
}

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/Delivery`,body
    );

    dispatch({
      type: UPDATE_DELIVERY_COMPANY_SUCCESS,
      payload: data,
    });

  } catch (error) {
    
    dispatch({
      type: UPDATE_DELIVERY_COMPANY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setCurrentDeliveryCompany = (deliveryCompany) => async (dispatch) => {
    dispatch({
      type: SET_CURRENT_DELIVERY_COMPANY,
      payload: deliveryCompany,
    });
};

