import {
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_RESET,
  GET_POSTS_SUCCESS,
  SET_CURRENT_POST,
} from '../constants/postsConstants';
import axios from 'axios';

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_POSTS_REQUEST,
    });

    const { data } = await axios.get(`/api/Post`);

    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: data.table,
    });
  } catch (error) {
    dispatch({
      type: GET_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setCurrentPost = (post) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_POST,
    payload: post,
  });
};
