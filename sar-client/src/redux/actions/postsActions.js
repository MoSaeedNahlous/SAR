import {
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_RESET,
  GET_POSTS_SUCCESS,
} from '../constants/postsConstants';
import axios from 'axios';

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_POSTS_REQUEST,
    });

    // const { data } = await axios.get(
    //   `http://mhmodmj-001-site1.itempurl.com/api/Catgories`
    // );

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
