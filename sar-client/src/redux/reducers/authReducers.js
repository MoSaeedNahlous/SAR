import { Check } from '@mui/icons-material';
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_RESET,
  LOGIN_SUCCESS,
  LOGOUT,
  CHECK_BLOCK,
} from '../constants/authConstants';

export const loginReducer = (state = { user: '' }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true, user: '' };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        success: true,
      };
    case LOGIN_FAIL:
      return { loading: false, error: action.payload, success: false };
    case LOGIN_RESET:
      return {
        loading: false,
        user: '',
        error: '',
        success: false,
      };
    case LOGOUT:
      return {};
    case CHECK_BLOCK:
      return {
        isBlocked: action.payload,
      };
    default:
      return state;
  }
};

// export const checkBlockReducer = (state = { }, action) => {
//   switch (action.type) {
//     case CHECK_BLOCK_REQUEST:
//       return { loading: true };
//     case CHECK_BLOCK_SUCCESS:
//       return {
//         loading: false,
//         isB: true,
//       };
//     case CHECK_BLOCK_FAIL:
//       return { loading: false, error: action.payload, success: false };
//     case CHECK_BLOCK_RESET:
//       return {
//         loading: false,
//         user: '',
//         error: '',
//         success: false,
//       };
//     default:
//       return state;
//   }
// };
