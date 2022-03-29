import {
  DELETE_SUBCATEGORY_FAIL,
  DELETE_SUBCATEGORY_REQUEST,
  DELETE_SUBCATEGORY_SUCCESS,
  GET_SUBCATEGORIES_FAIL,
  GET_SUBCATEGORIES_REQUEST,
  GET_SUBCATEGORIES_RESET,
  GET_SUBCATEGORIES_SUCCESS,
  SET_CURRENT_SUBCATEGORY,
  ADD_SUBCATEGORY_FAIL,
  ADD_SUBCATEGORY_REQUEST,
  ADD_SUBCATEGORY_RESET,
  ADD_SUBCATEGORY_SUCCESS, DELETE_SUBCATEGORY_RESET,
  SET_CURRENT_SUBCATEGORY_RESET,
  UPDATE_SUBCATEGORY_FAIL,
  UPDATE_SUBCATEGORY_REQUEST,
  UPDATE_SUBCATEGORY_RESET,
  UPDATE_SUBCATEGORY_SUCCESS
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

export const addNewSubCategory = (catId,name) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_SUBCATEGORY_REQUEST,
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
      type: ADD_SUBCATEGORY_SUCCESS,
      payload: data,
    });

  } catch (error) {
    
    dispatch({
      type: ADD_SUBCATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSubCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SUBCATEGORY_REQUEST,
    });

    const body = { 
          "level":"delete",
          "CatID":id,
         "notes":"1",
         "state":"1",
          "images":"1"
      }

    // const { data } = await axios.post(
    //   `http://mhmodmj-001-site1.itempurl.com/api/categories`,body
    // );

    dispatch({
      type: DELETE_SUBCATEGORY_SUCCESS,
      payload: data,
    });

  } catch (error) {
    
    dispatch({
      type: DELETE_SUBCATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSubCategory = (catId,name) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_SUBCATEGORY_REQUEST,
    });

    const body = { 
          "level":"update",
      "CatID": catId,
          "CatName":name,
         "notes":"1",
         "state":"1",
          "images":"1"
      }

    // const { data } = await axios.post(
    //   `http://mhmodmj-001-site1.itempurl.com/api/categories`,body
    // );

    dispatch({
      type: UPDATE_SUBCATEGORY_SUCCESS,
      payload: data,
    });

  } catch (error) {
    
    dispatch({
      type: UPDATE_SUBCATEGORY_FAIL,
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
