import {
  GET_DELIVERY_COMPANIES_COST_FAIL,
  GET_DELIVERY_COMPANIES_COST_REQUEST,
  GET_DELIVERY_COMPANIES_COST_RESET,
  GET_DELIVERY_COMPANIES_COST_SUCCESS,
  ADD_DELIVERY_COMPANY_COST_FAIL,
  ADD_DELIVERY_COMPANY_COST_REQUEST,
  ADD_DELIVERY_COMPANY_COST_RESET,
  ADD_DELIVERY_COMPANY_COST_SUCCESS,
  DELETE_DELIVERY_COMPANY_COST_FAIL,
  DELETE_DELIVERY_COMPANY_COST_REQUEST,
  DELETE_DELIVERY_COMPANY_COST_RESET,
  DELETE_DELIVERY_COMPANY_COST_SUCCESS,
  UPDATE_DELIVERY_COMPANY_COST_REQUEST,
  UPDATE_DELIVERY_COMPANY_COST_SUCCESS,
  UPDATE_DELIVERY_COMPANY_COST_FAIL,
  HIDE_DELIVERY_COMPANY_COST_FAIL,
  HIDE_DELIVERY_COMPANY_COST_REQUEST,
  HIDE_DELIVERY_COMPANY_COST_SUCCESS,
  SHOW_DELIVERY_COMPANY_COST_FAIL,
  SHOW_DELIVERY_COMPANY_COST_REQUEST,
  SHOW_DELIVERY_COMPANY_COST_SUCCESS,
} from '../constants/deliveryCompaniesCostConstants';

import {
  SET_CURRENT_DELIVERY_COMPANY_COST,
  SET_CURRENT_DELIVERY_COMPANY_COST_RESET,
} from '../constants/deliveryCompaniesCostConstants';
import axios from 'axios';

export const getDeliveryCompaniesCost = () => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_DELIVERY_COMPANIES_COST_REQUEST,
    });

    const { data } = await axios.get(`/api/cost?level=selectM&CityID=1`);

    dispatch({
      type: GET_DELIVERY_COMPANIES_COST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DELIVERY_COMPANIES_COST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDeliveryCompaniesCostByCity = (cityId) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_DELIVERY_COMPANIES_COST_REQUEST,
    });

    const { data } = await axios.get(
      `/api/cost?level=selectCityCosts&CityID=${cityId}`
    );

    dispatch({
      type: GET_DELIVERY_COMPANIES_COST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DELIVERY_COMPANIES_COST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addNewDelievryCompanyCost =
  (cost, cityId, deliveryComapnyId) => async (dispatch) => {
    try {
      dispatch({
        type: ADD_DELIVERY_COMPANY_COST_REQUEST,
      });

      const body = {
        level: 'insert',
        costID: '1',
        CityID: cityId,
        deliveryID: deliveryComapnyId,
        cost: cost,
        notes: '1',
        images: '1',
        state: '1',
      };

      const { data } = await axios.post(`/api/cost`, body);

      dispatch({
        type: ADD_DELIVERY_COMPANY_COST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_DELIVERY_COMPANY_COST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteDeliveryCompanyCost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_DELIVERY_COMPANY_COST_REQUEST,
    });

    const body = {
      level: 'delete',
      costID: id,
      CityID: '6',
      deliveryID: '1',
      cost: '1',
      notes: '1',
      images: '1',
      state: '1',
    };

    const { data } = await axios.post(`/api/cost?level=selectM&CityID=1`, body);

    if (data.table[0].column1 === 'cant delete it') {
      throw new Error('لا يمكن الحذف لوجود معلومات متعلقة فيه');
    }

    dispatch({
      type: DELETE_DELIVERY_COMPANY_COST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DELIVERY_COMPANY_COST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateDeliveryCompanyCost =
  (costID, CityID, deliveryID, cost) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_DELIVERY_COMPANY_COST_REQUEST,
      });

      const body = {
        level: 'update',
        costID: costID,
        CityID: CityID,
        deliveryID: deliveryID,
        cost: cost,
        notes: 'notes',
        images: '1',
      };

      const { data } = await axios.post(`/api/cost`, body);

      dispatch({
        type: UPDATE_DELIVERY_COMPANY_COST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DELIVERY_COMPANY_COST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const setCurrentDeliveryCompanyCost = (dc) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_DELIVERY_COMPANY_COST,
    payload: dc,
  });
};

export const hideDeliveryCompanyCost = (id) => async (dispatch) => {
  try {
    dispatch({ type: HIDE_DELIVERY_COMPANY_COST_REQUEST, payload: id });

    const body = {
      level: 'hide',
      costID: id,
      CityID: 3,
      deliveryID: '11',
      cost: '1',
      notes: '1',
      images: '1',
      state: '1',
    };

    const { data } = await axios.post(`/api/cost`, body);

    dispatch({ type: HIDE_DELIVERY_COMPANY_COST_SUCCESS, payload: id });
  } catch (error) {
    console.error(error);
  }
};
export const showDeliveryCompanyCost = (id) => async (dispatch) => {
  try {
    dispatch({ type: SHOW_DELIVERY_COMPANY_COST_REQUEST, payload: id });

    const body = {
      level: 'show',
      costID: id,
      CityID: 3,
      deliveryID: '11',
      cost: '1',
      notes: '1',
      images: '1',
      state: '1',
    };

    const { data } = await axios.post(`/api/cost`, body);

    dispatch({ type: SHOW_DELIVERY_COMPANY_COST_SUCCESS, payload: id });
  } catch (error) {
    console.error(error);
  }
};

// export const getDeliveryCompaniesCostByCity = (cityId) => async (dispatch) => {
//   try {
//     // loading
//     dispatch({
//       type: GET_DELIVERY_COMPANIES_COST_REQUEST,
//     });

//     const { data } = await axios.get(
//       `/api/cost?level=selectbyCity&CityID=${cityId}`
//     );

//     dispatch({
//       type: GET_DELIVERY_COMPANIES_COST_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_DELIVERY_COMPANIES_COST_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
