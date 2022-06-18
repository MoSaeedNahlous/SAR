import {
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_RESET,
  GET_PRODUCTS_SUCCESS,
  SET_CURRENT_PRODUCT,
  SET_CURRENT_PRODUCT_RESET,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_RESET,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  HIDE_PRODUCT_SUCCESS,
  HIDE_PRODUCT_REQUEST,
  SHOW_PRODUCT_REQUEST,
  SHOW_PRODUCT_SUCCESS,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_RESET,
  ADD_PRODUCT_TO_ORDER_REQUEST,
  ADD_PRODUCT_TO_ORDER_SUCCESS,
  ADD_PRODUCT_TO_ORDER_FAIL,
  ADD_PRODUCT_TO_ORDER_RESET,
  SET_CURRENT_PRODUCTSIZE,
  SET_CURRENT_PRODUCTSIZE_RESET,
  CHECK_CART_FOR_PRODUCT_REQUEST,
  CHECK_CART_FOR_PRODUCT_SUCCESS,
  CHECK_CART_FOR_PRODUCT_FAIL,
  CHECK_CART_FOR_PRODUCT_RESET,
} from '../constants/productsConstants';

export const getProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.table,
      };

    case GET_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };

    // case HIDE_PRODUCT_REQUEST:
    //      return {
    //          ...state,
    //          loading: true
    //      }

    // case HIDE_PRODUCT_SUCCESS:
    //      return {
    //         loading:false,
    //         products: state.products.map(
    //             (cat) => {
    //                 if (cat.catID == action.payload) {
    //                     cat.cstate = 0
    //                 }
    //                 return cat
    //             }
    //         )
    //     }
    // case SHOW_PRODUCT_REQUEST:
    //      return {
    //          ...state,
    //          loading: true
    //      }

    // case SHOW_PRODUCT_SUCCESS:
    //      return {
    //         loading:false,
    //         EMPS: state.EMPS.map(
    //             (cat) => {
    //                 if (cat.catID == action.payload) {
    //                     cat.cstate = 1
    //                 }
    //                 return cat
    //             }
    //         )
    //     }
    default:
      return state;
  }
};

export const getProductReducer = (
  state = { productData: {}, sizesData: [], productImgs: [] },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return {
        loading: true,
        productData: {},
        sizesData: [],
        productImgs: [],
      };
    case GET_PRODUCT_SUCCESS:
      return {
        loading: false,
        productData: action.payload.table[0],
        sizesData: action.payload.table1,
        productImgs: action.payload.table2,
      };

    case GET_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_PRODUCT_RESET:
      return {
        loading: false,
        error: action.payload,
        productData: {},
        sizesData: [],
        productImgs: [],
      };
    default:
      return state;
  }
};

export const addProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return { loading: true };
    case ADD_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const addProductToOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_ORDER_REQUEST:
      return {
        loading: true,
      };
    case ADD_PRODUCT_TO_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_PRODUCT_TO_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_PRODUCT_TO_ORDER_RESET:
      return {
        loading: false,
        success: '',
        error: '',
      };
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const setCurrentProductReducer = (
  state = { currentProduct: {} },
  action
) => {
  switch (action.type) {
    case SET_CURRENT_PRODUCT:
      return {
        currentProduct: action.payload,
      };
    case SET_CURRENT_PRODUCT_RESET:
      return {
        currentProduct: {},
      };
    default:
      return state;
  }
};

export const setCurrentProductSizeReducer = (
  state = { currentProductSize: '' },
  action
) => {
  switch (action.type) {
    case SET_CURRENT_PRODUCTSIZE:
      return {
        currentProductSize: action.payload,
      };
    case SET_CURRENT_PRODUCTSIZE_RESET:
      return {
        currentProductSize: '',
      };
    default:
      return state;
  }
};

export const checkCartForProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_CART_FOR_PRODUCT_REQUEST:
      return { loading: true };
    case CHECK_CART_FOR_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CHECK_CART_FOR_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CHECK_CART_FOR_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};
