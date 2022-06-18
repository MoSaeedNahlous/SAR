import {
  CHECK_BLOCK,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_RESET,
  LOGIN_SUCCESS,
} from '../constants/authConstants';
import axios from 'axios';

export const managerLogin =
  (username, password, rememberMe) => async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });

      const body = {
        level: 'loginM',
        empName: username,
        password: password,
      };

      const { data } = await axios.post(`/api/Employee`, body);
      if (data.table[0].empId) {
        sessionStorage.setItem('userId', data.table[0].empId);
        sessionStorage.setItem('userType', data.table[0].empType);
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.table[0],
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

export const empLogin = (mobile, password, rememberMe) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const body = {
      level: 'loginEmp',
      mobile1: mobile,
      password: password,
    };

    const { data } = await axios.post(`/api/Employee`, body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.table[0],
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

export const isEmpBlocked = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/Employee?level=checkState&empId=${id}`
    );

    dispatch({
      type: CHECK_BLOCK,
      payload: data.table[0].isBlocked,
    });
  } catch (error) {
    console.log(error);
  }
};
