import {
  GET_TARGETS_FAIL,
  GET_TARGETS_REQUEST,
  GET_TARGETS_RESET,
  GET_TARGETS_SUCCESS,
  ADD_TARGET_FAIL,
  ADD_TARGET_REQUEST,
  ADD_TARGET_RESET,
  ADD_TARGET_SUCCESS,
  DELETE_TARGET_FAIL,
  DELETE_TARGET_REQUEST,
  DELETE_TARGET_RESET,
  DELETE_TARGET_SUCCESS,
  UPDATE_TARGET_REQUEST,
  UPDATE_TARGET_SUCCESS,
  UPDATE_TARGET_FAIL,
  HIDE_TARGET_REQUEST,
  HIDE_TARGET_SUCCESS,
  SHOW_TARGET_REQUEST,
  SHOW_TARGET_SUCCESS,
} from '../constants/targetsConstants';

import {
  SET_CURRENT_TARGET,
  SET_CURRENT_TARGET_RESET,
} from '../constants/targetsConstants';
import axios from 'axios';

export const getTargets = () => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_TARGETS_REQUEST,
    });

    const { data } = await axios.get(
      `http://mhmodmj-001-site1.itempurl.com/api/Followed`
    );

    dispatch({
      type: GET_TARGETS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TARGETS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addNewTarget = (name) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_TARGET_REQUEST,
    });

    const body = {
      level: 'insert',
      FollowedID: '15',
      FollowedName: name,
      state: '1',
      notes: '1',
      images: '1',
    };

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/Followed`,
      body
    );

    dispatch({
      type: ADD_TARGET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_TARGET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTarget = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_TARGET_REQUEST,
    });

    const body = {
      level: 'delete',
      FollowedID: id,
      FollowedName: 'name',
      state: '1',
      notes: '1',
      images: '1',
    };

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/Followed`,
      body
    );

    if (data.table[0].column1 === 'cant delete it') {
      throw new Error('لا يمكن حذف المخصص لوجود معلومات متعلقة فيه');
    }

    dispatch({
      type: DELETE_TARGET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TARGET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const hideCategory = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: HIDE_TARGET_REQUEST, payload: id });

//     const body = {
//       level: 'hide',
//       CatID: id,
//       notes: '1',
//       state: '1',
//       images: '1',
//     };

//     const { data } = await axios.post(
//       `http://mhmodmj-001-site1.itempurl.com/api/categories`,
//       body
//     );

//     dispatch({ type: HIDE_TARGET_SUCCESS, payload: id });
//   } catch (error) {
//     console.error(error);
//   }
// };
// export const showCategory = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: SHOW_TARGET_REQUEST, payload: id });

//     const body = {
//       level: 'show',
//       CatID: id,
//       notes: '1',
//       state: '1',
//       images: '1',
//     };

//     const { data } = await axios.post(
//       `http://mhmodmj-001-site1.itempurl.com/api/categories`,
//       body
//     );
//     dispatch({ type: SHOW_TARGET_SUCCESS, payload: id });
//   } catch (error) {
//     console.error(error);
//   }
// };

export const updateTarget = (id, name) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_TARGET_REQUEST,
    });

    const body = {
      level: 'update',
      FollowedID: id,
      FollowedName: name,
      state: '1',
      notes: '1',
      images: '1',
    };

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/Followed`,
      body
    );

    dispatch({
      type: UPDATE_TARGET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TARGET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setCurrentTarget = (target) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_TARGET,
    payload: target,
  });
};
