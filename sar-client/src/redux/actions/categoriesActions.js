import {
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_RESET,
  GET_CATEGORIES_SUCCESS,
  ADD_CATEGORY_FAIL,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_RESET,
  ADD_CATEGORY_SUCCESS
} from '../constants/categoriesConstants';

import {
  SET_CURRENT_CATEGORY,
  SET_CURRENT_CATEGORY_RESET,

} from '../constants/categoriesConstants';
import axios from 'axios';

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CATEGORIES_REQUEST,
    });

    const { data } = await axios.get(
      `http://mhmodmj-001-site1.itempurl.com/api/categories`
    );

    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: data,
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

export const addNewCategory = (name) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CATEGORY_REQUEST,
    });

    const body = { 
          "level":"insert",
          "CatID":"5",
          "CatName":name,
         "notes":"1",
         "state":"1",
          "images":"1"
      }

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/categories`,body
    );

    dispatch({
      type: ADD_CATEGORY_SUCCESS,
      payload: data,
    });

  } catch (error) {
    
    dispatch({
      type: ADD_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setCurrentCategory = (category) => async (dispatch) => {
    dispatch({
      type: SET_CURRENT_CATEGORY,
      payload: category,
    });
};
