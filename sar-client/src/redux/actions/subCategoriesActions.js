import {
  GET_SUBCATEGORIES_FAIL,
  GET_SUBCATEGORIES_REQUEST,
  GET_SUBCATEGORIES_RESET,
  GET_SUBCATEGORIES_SUCCESS,
} from '../constants/subCategoriesConstants';
import axios from 'axios';

export const getSubCategories = (catId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SUBCATEGORIES_REQUEST,
    });

    const { data } = await axios.get(
      `http://mhmodmj-001-site1.itempurl.com/api/subCategories?level=selectbycat&CatID=${catId}`
    );

    dispatch({
      type: GET_SUBCATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SUBCATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
