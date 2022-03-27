import {
  GET_SUBCATEGORIES_FAIL,
  GET_SUBCATEGORIES_REQUEST,
  GET_SUBCATEGORIES_RESET,
  GET_SUBCATEGORIES_SUCCESS,
  SET_CURRENT_SUBCATEGORY,
} from '../constants/subCategoriesConstants';
import axios from 'axios';

export const getSubCategories = (catId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SUBCATEGORIES_REQUEST,
    });

    const { data } = catId ? await axios.get(
      `http://mhmodmj-001-site1.itempurl.com/api/subCategories?level=selectbycat&CatID=${catId}`
    ) : await axios.get(
      `http://mhmodmj-001-site1.itempurl.com/api/subCategories?level=select&CatID=${1}`
    )

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

export const setCurrentSubCategory = (subCategory) => async (dispatch) => {
    dispatch({
      type: SET_CURRENT_SUBCATEGORY,
      payload: subCategory,
    });
};
