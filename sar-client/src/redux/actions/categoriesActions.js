import {
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_RESET,
  GET_CATEGORIES_SUCCESS,
} from '../constants/categoriesConstants';
import axios from 'axios';

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CATEGORIES_REQUEST,
    });

    const { data } = await axios.get(
      `http://mhmodmj-001-site1.itempurl.com/api/Catgories`
    );

    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: data.table,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
