import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_RESET,
    LOGIN_SUCCESS
} from '../constants/authConstants';
import axios from 'axios';

export const login = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    // const { data } = await axios.get(
    //   `http://mhmodmj-001-site1.itempurl.com/api/Catgories`
    // );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.table,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
