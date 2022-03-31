import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_RESET,
    LOGIN_SUCCESS,
    LOGOUT,
} from '../constants/authConstants'

export const loginReducer = (state = { user: {} }, action) => {
    switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true, user: {} };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.payload.table,
      };
    case LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT:
      return {}
    default:
      return state
  }
}

