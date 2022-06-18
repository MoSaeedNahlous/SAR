import {
  GET_DELIVERY_COMPANIES_FAIL,
  GET_DELIVERY_COMPANIES_REQUEST,
  GET_DELIVERY_COMPANIES_RESET,
  GET_DELIVERY_COMPANIES_SUCCESS,
  SET_CURRENT_DELIVERY_COMPANY,
  SET_CURRENT_DELIVERY_COMPANY_RESET,
  ADD_DELIVERY_COMPANY_FAIL,
  ADD_DELIVERY_COMPANY_REQUEST,
  ADD_DELIVERY_COMPANY_RESET,
  ADD_DELIVERY_COMPANY_SUCCESS,
  DELETE_DELIVERY_COMPANY_REQUEST,
  DELETE_DELIVERY_COMPANY_SUCCESS,
  DELETE_DELIVERY_COMPANY_FAIL,
  DELETE_DELIVERY_COMPANY_RESET,
  UPDATE_DELIVERY_COMPANY_REQUEST,
  UPDATE_DELIVERY_COMPANY_SUCCESS,
  UPDATE_DELIVERY_COMPANY_FAIL,
  UPDATE_DELIVERY_COMPANY_RESET,
  HIDE_DELIVERY_COMPANY_SUCCESS,
  HIDE_DELIVERY_COMPANY_REQUEST,
  SHOW_DELIVERY_COMPANY_REQUEST,
  SHOW_DELIVERY_COMPANY_SUCCESS,
  GET_DELIVERY_COMPANIES_LIST_RESET,
  GET_DELIVERY_COMPANIES_LIST_REQUEST,
  GET_DELIVERY_COMPANIES_LIST_SUCCESS,
  GET_DELIVERY_COMPANIES_LIST_FAIL,
  GET_DELIVERY_COMPANIES_PAYMENTS_REQUEST,
  GET_DELIVERY_COMPANIES_PAYMENTS_SUCCESS,
  GET_DELIVERY_COMPANIES_PAYMENTS_FAIL,
  GET_DELIVERY_COMPANIES_PAYMENTS_RESET,
  DELETE_DELIVERY_COMPANIES_PAYMENTS_REQUEST,
  DELETE_DELIVERY_COMPANIES_PAYMENTS_SUCCESS,
  DELETE_DELIVERY_COMPANIES_PAYMENTS_FAIL,
  DELETE_DELIVERY_COMPANIES_PAYMENTS_RESET,
  UPDATE_DELIVERY_COMPANIES_PAYMENTS_REQUEST,
  UPDATE_DELIVERY_COMPANIES_PAYMENTS_SUCCESS,
  UPDATE_DELIVERY_COMPANIES_PAYMENTS_FAIL,
  UPDATE_DELIVERY_COMPANIES_PAYMENTS_RESET,
  ADD_DELIVERY_COMPANIES_PAYMENTS_REQUEST,
  ADD_DELIVERY_COMPANIES_PAYMENTS_SUCCESS,
  ADD_DELIVERY_COMPANIES_PAYMENTS_FAIL,
  ADD_DELIVERY_COMPANIES_PAYMENTS_RESET,
} from '../constants/deliveryCompaniesConstants';

export const getDeliveryCompaniesReducer = (
  state = { deliveryCompanies: [] },
  action
) => {
  switch (action.type) {
    case GET_DELIVERY_COMPANIES_REQUEST:
      return {
        loading: true,
        deliveryCompanies: [],
      };

    case GET_DELIVERY_COMPANIES_SUCCESS:
      return {
        loading: false,
        deliveryCompanies: action.payload.table,
      };

    case GET_DELIVERY_COMPANIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case HIDE_DELIVERY_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case HIDE_DELIVERY_COMPANY_SUCCESS:
      return {
        loading: false,
        deliveryCompanies: state.deliveryCompanies.map((DC) => {
          if (DC.deliveryID == action.payload) {
            DC.state = 'notActive';
          }
          return DC;
        }),
      };
    case SHOW_DELIVERY_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SHOW_DELIVERY_COMPANY_SUCCESS:
      return {
        loading: false,
        deliveryCompanies: state.deliveryCompanies.map((DC) => {
          if (DC.deliveryID == action.payload) {
            DC.state = 'active';
          }
          return DC;
        }),
      };
    default:
      return state;
  }
};
export const getDeliveryCompaniesListReducer = (
  state = { deliveryCompaniesList: [] },
  action
) => {
  switch (action.type) {
    case GET_DELIVERY_COMPANIES_LIST_REQUEST:
      return {
        loading: true,
        deliveryCompaniesList: [],
      };

    case GET_DELIVERY_COMPANIES_LIST_SUCCESS:
      return {
        loading: false,
        deliveryCompaniesList: action.payload.table,
      };

    case GET_DELIVERY_COMPANIES_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_DELIVERY_COMPANIES_LIST_RESET:
      return {
        loading: false,
        deliveryCompaniesList: [],
        error: '',
      };

    default:
      return state;
  }
};

export const addDeliveryCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DELIVERY_COMPANY_REQUEST:
      return { loading: true };
    case ADD_DELIVERY_COMPANY_SUCCESS:
      return {
        loading: false,
        success: true,
        // categories: action.payload.table,
      };
    case ADD_DELIVERY_COMPANY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_DELIVERY_COMPANY_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteDeliveryCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DELIVERY_COMPANY_REQUEST:
      return { loading: true };
    case DELETE_DELIVERY_COMPANY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_DELIVERY_COMPANY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_DELIVERY_COMPANY_RESET:
      return {};
    default:
      return state;
  }
};

export const updateDeliveryCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DELIVERY_COMPANY_REQUEST:
      return { loading: true };
    case UPDATE_DELIVERY_COMPANY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_DELIVERY_COMPANY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_DELIVERY_COMPANY_RESET:
      return {};
    default:
      return state;
  }
};

export const setCurrentDeliveryCompanyReducer = (
  state = { currentDeliveryCompany: {} },
  action
) => {
  switch (action.type) {
    case SET_CURRENT_DELIVERY_COMPANY:
      return {
        currentDeliveryCompany: action.payload,
      };
    case SET_CURRENT_DELIVERY_COMPANY_RESET:
      return {
        currentDeliveryCompany: {},
      };
    default:
      return state;
  }
};

export const getDeliveryCompaniesPaymentsReducer = (
  state = { deliveryCompaniesPayments: [] },
  action
) => {
  switch (action.type) {
    case GET_DELIVERY_COMPANIES_PAYMENTS_REQUEST:
      return {
        loading: true,
        deliveryCompaniesPayments: [],
      };

    case GET_DELIVERY_COMPANIES_PAYMENTS_SUCCESS:
      return {
        loading: false,
        deliveryCompaniesPayments: action.payload.table,
      };

    case GET_DELIVERY_COMPANIES_PAYMENTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_DELIVERY_COMPANIES_PAYMENTS_RESET:
      return {
        loading: false,
        deliveryCompaniesPayments: [],
        error: '',
      };

    default:
      return state;
  }
};

export const deleteDeliveryCompaniesPaymentsReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DELIVERY_COMPANIES_PAYMENTS_REQUEST:
      return {
        loading: true,
      };

    case DELETE_DELIVERY_COMPANIES_PAYMENTS_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case DELETE_DELIVERY_COMPANIES_PAYMENTS_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: '',
      };
    case DELETE_DELIVERY_COMPANIES_PAYMENTS_RESET:
      return {
        loading: false,
        success: '',
        error: '',
      };

    default:
      return state;
  }
};

export const updateDeliveryCompaniesPaymentsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DELIVERY_COMPANIES_PAYMENTS_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_DELIVERY_COMPANIES_PAYMENTS_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case UPDATE_DELIVERY_COMPANIES_PAYMENTS_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: '',
      };
    case UPDATE_DELIVERY_COMPANIES_PAYMENTS_RESET:
      return {
        loading: false,
        success: '',
        error: '',
      };

    default:
      return state;
  }
};

export const addDeliveryCompaniesPaymentsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DELIVERY_COMPANIES_PAYMENTS_REQUEST:
      return {
        loading: true,
      };
    case ADD_DELIVERY_COMPANIES_PAYMENTS_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ADD_DELIVERY_COMPANIES_PAYMENTS_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: '',
      };
    case ADD_DELIVERY_COMPANIES_PAYMENTS_RESET:
      return {
        loading: false,
        success: '',
        error: '',
      };

    default:
      return state;
  }
};
