import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_RESET,
    LOGIN_SUCCESS
} from '../constants/authConstants';
import axios from 'axios';

export const login = (password,mobile1) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const body ={
      "level": "loginEmployee",
      "password": password,
      "mobile1": mobile1
    }

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/Employee`
    );

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
