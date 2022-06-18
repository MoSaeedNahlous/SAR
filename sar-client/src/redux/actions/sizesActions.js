import {
  ADD_SIZE_FAIL,
  ADD_SIZE_REQUEST,
  ADD_SIZE_SUCCESS,
  DELETE_SIZE_FAIL,
  DELETE_SIZE_REQUEST,
  DELETE_SIZE_SUCCESS,
  GET_PRODUCT_SIZE_FAIL,
  GET_PRODUCT_SIZE_REQUEST,
  GET_PRODUCT_SIZE_SUCCESS,
  GET_SIZES_FAIL,
  GET_SIZES_REQUEST,
  GET_SIZES_SUCCESS,
  GET_SIZES_TABLE_FAIL,
  GET_SIZES_TABLE_REQUEST,
  GET_SIZES_TABLE_SUCCESS,
  HIDE_SIZE_REQUEST,
  HIDE_SIZE_SUCCESS,
  SET_CURRENT_SIZE,
  SHOW_SIZE_REQUEST,
  SHOW_SIZE_SUCCESS,
  UPDATE_SIZE_FAIL,
  UPDATE_SIZE_REQUEST,
  UPDATE_SIZE_SUCCESS,
} from '../constants/sizesConstants';
import axios from 'axios';

export const getSizes = (subCatId) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_SIZES_REQUEST,
    });

    const { data } = await axios.get(
      `/api/size?level=selectBySubcatM&SubCatID=${subCatId}`
    );

    dispatch({
      type: GET_SIZES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SIZES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductSize = (productId) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_PRODUCT_SIZE_REQUEST,
    });

    const { data } = await axios.get(
      `/api/products?level=selectOnlysize&PID=${productId}`
    );

    dispatch({
      type: GET_PRODUCT_SIZE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_SIZE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSizesTable = (subCatId, pcode) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_SIZES_TABLE_REQUEST,
    });

    const { data } = await axios.get(
      `/api/Products?level=QuanTable&PCode=${pcode}&subCatID=${subCatId}`
    );

    if (data.table[0].column1 == 'الباركود مستخدم مسبقا') {
      throw new Error('الرمز مستخدم سابقاً');
    }

    dispatch({
      type: GET_SIZES_TABLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SIZES_TABLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addNewSize = (name, catId, subCatId) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_SIZE_REQUEST,
    });

    const body = {
      level: 'insert',
      SizeID: '434',
      SizeName: name,
      CatID: catId,
      SubCatID: subCatId,
      notes: '1',
      state: '2',
    };

    const { data } = await axios.post(`/api/size`, body);

    dispatch({
      type: ADD_SIZE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_SIZE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSize = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SIZE_REQUEST,
    });

    const body = {
      level: 'delete',
      SizeID: id,
      SizeName: '',
      CatID: '',
      SubCatID: '',
      notes: '1',
      state: '2',
    };

    const { data } = await axios.post(`/api/size`, body);

    dispatch({
      type: DELETE_SIZE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SIZE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const hideSize = (id) => async (dispatch) => {
  try {
    dispatch({ type: HIDE_SIZE_REQUEST, payload: id });

    const body = {
      level: 'hide',
      SizeID: id,
      SizeName: '3',
      CatID: '1',
      SubCatID: '2',
      notes: '1',
      state: '2',
    };

    const { data } = await axios.post(`/api/size`, body);

    dispatch({ type: HIDE_SIZE_SUCCESS, payload: id });
  } catch (error) {
    console.error(error);
  }
};

export const showSize = (id) => async (dispatch) => {
  try {
    dispatch({ type: SHOW_SIZE_REQUEST, payload: id });

    const body = {
      level: 'show',
      SizeID: id,
      SizeName: '3',
      CatID: '1',
      SubCatID: '2',
      notes: '1',
      state: '2',
    };

    const { data } = await axios.post(`/api/size`, body);
    dispatch({ type: SHOW_SIZE_SUCCESS, payload: id });
  } catch (error) {
    console.error(error);
  }
};

export const updateSize =
  (id, name, state, catId, subCatId) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SIZE_REQUEST,
      });

      const body = {
        level: 'update',
        SizeID: id,
        SizeName: name,
        CatID: catId,
        SubCatID: subCatId,
        notes: '1',
        state: state,
      };

      const { data } = await axios.post(`/api/size`, body);

      dispatch({
        type: UPDATE_SIZE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SIZE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const setCurrentSize = (size) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_SIZE,
    payload: size,
  });
};
