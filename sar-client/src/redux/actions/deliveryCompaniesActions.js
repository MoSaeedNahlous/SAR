import {
  GET_DELIVERY_COMPANIES_SUCCESS,
  GET_DELIVERY_COMPANIES_REQUEST,
  GET_DELIVERY_COMPANIES_RESET,
  GET_DELIVERY_COMPANIES_SUCCESS,
} from '../constants/deliveryCompaniesConstants';
import axios from 'axios';

export const getdeliveryCompanies = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DELIVERY_COMPANIES_REQUEST,
    });

    // const { data } = await axios.get(
    //   `http://mhmodmj-001-site1.itempurl.com/api/Catgories`
    // );

    dispatch({
      type: GET_DELIVERY_COMPANIES_SUCCESS,
      payload: data.table,
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
