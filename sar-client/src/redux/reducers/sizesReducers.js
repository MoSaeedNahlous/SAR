import {
  ADD_SIZE_FAIL,
  ADD_SIZE_REQUEST,
  ADD_SIZE_RESET,
  ADD_SIZE_SUCCESS,
  DELETE_SIZE_FAIL,
  DELETE_SIZE_REQUEST,
  DELETE_SIZE_RESET,
  DELETE_SIZE_SUCCESS,
  GET_PRODUCT_SIZE_FAIL,
  GET_PRODUCT_SIZE_REQUEST,
  GET_PRODUCT_SIZE_RESET,
  GET_PRODUCT_SIZE_SUCCESS,
  GET_SIZES_FAIL,
  GET_SIZES_REQUEST,
  GET_SIZES_RESET,
  GET_SIZES_SUCCESS,
  GET_SIZES_TABLE_FAIL,
  GET_SIZES_TABLE_REQUEST,
  GET_SIZES_TABLE_RESET,
  GET_SIZES_TABLE_SUCCESS,
  HIDE_SIZE_REQUEST,
  HIDE_SIZE_SUCCESS,
  SET_CURRENT_SIZE,
  SET_CURRENT_SIZE_RESET,
  SHOW_SIZE_REQUEST,
  SHOW_SIZE_SUCCESS,
  UPDATE_SIZE_FAIL,
  UPDATE_SIZE_REQUEST,
  UPDATE_SIZE_RESET,
  UPDATE_SIZE_SUCCESS,
} from '../constants/sizesConstants';

export const getSizesReducer = (state = { sizes: [] }, action) => {
  switch (action.type) {
    case GET_SIZES_REQUEST:
      return {
        loading: true,
        sizes: [],
      };

    case GET_SIZES_SUCCESS:
      return {
        loading: false,
        sizes: action.payload.table,
      };

    case GET_SIZES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case GET_SIZES_RESET:
      return {
        loading: false,
        sizes: [],
      };

    case GET_SIZES_TABLE_REQUEST:
      return {
        loading: true,
        sizes: [],
      };

    case GET_SIZES_TABLE_SUCCESS:
      return {
        loading: false,
        sizes: action.payload.table,
        success: true,
      };

    case GET_SIZES_TABLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case GET_SIZES_TABLE_RESET:
      return {
        loading: false,
        sizes: [],
      };

    case HIDE_SIZE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_SIZE_RESET:
      return {
        sizes: [],
      };

    case HIDE_SIZE_SUCCESS:
      return {
        loading: false,
        sizes: state.sizes.map((size) => {
          if (size.sizeID == action.payload) {
            size.state = 'notActive';
          }
          return size;
        }),
      };
    case SHOW_SIZE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SHOW_SIZE_SUCCESS:
      return {
        loading: false,
        sizes: state.sizes.map((size) => {
          if (size.sizeID == action.payload) {
            size.state = 'active';
          }
          return size;
        }),
      };
    default:
      return state;
  }
};

export const getProductSizeReducer = (state = { sizes: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCT_SIZE_REQUEST:
      return {
        loading: true,
        sizes: [],
      };

    case GET_PRODUCT_SIZE_SUCCESS:
      return {
        loading: false,
        sizes: action.payload.table,
      };

    case GET_PRODUCT_SIZE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case GET_PRODUCT_SIZE_RESET:
      return {
        loading: false,
        sizes: [],
      };

    default:
      return state;
  }
};

export const addSizeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SIZE_REQUEST:
      return { loading: true };
    case ADD_SIZE_SUCCESS:
      return {
        loading: false,
        success: true,
        // categories: action.payload.table,
      };
    case ADD_SIZE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case 'ADD_SIZE_RESET1':
      return {};
    default:
      return state;
  }
};

export const deleteSizeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SIZE_REQUEST:
      return { loading: true };
    case DELETE_SIZE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_SIZE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_SIZE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSizeReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SIZE_REQUEST:
      return { loading: true };
    case UPDATE_SIZE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_SIZE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_SIZE_RESET:
      return {};
    default:
      return state;
  }
};

export const setCurrentSizeReducer = (state = { currentSize: '' }, action) => {
  switch (action.type) {
    case SET_CURRENT_SIZE:
      return {
        currentSize: action.payload,
      };
    case SET_CURRENT_SIZE_RESET:
      return {
        currentSize: '',
      };
    default:
      return state;
  }
};
