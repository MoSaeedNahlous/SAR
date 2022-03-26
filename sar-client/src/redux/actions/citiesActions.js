import {
  GET_CITIES_FAIL,
  GET_CITIES_REQUEST,
  GET_CITIES_RESET,
  GET_CITIES_SUCCESS,
} from '../constants/citiesConstants';
import axios from 'axios';

export const getcities = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CITIES_REQUEST,
    });

    // const { data } = await axios.get(
    //   `http://mhmodmj-001-site1.itempurl.com/api/Catgories`
    // );

    dispatch({
      type: GET_CITIES_SUCCESS,
      payload: data.table,
    });
  } catch (error) {
    dispatch({
      type: GET_CITIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
