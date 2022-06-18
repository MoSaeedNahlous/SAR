import {
  GET_BILL_DETAILS_FAIL,
  GET_BILL_DETAILS_REQUEST,
  GET_BILL_DETAILS_RESET,
  GET_BILL_DETAILS_SUCCESS,
  INIT_BILL_FAIL,
  INIT_BILL_REQUEST,
  INIT_BILL_RESET,
  INIT_BILL_SUCCESS,
  GET_BILL_PRODUCTS_FAIL,
  GET_BILL_PRODUCTS_REQUEST,
  GET_BILL_PRODUCTS_RESET,
  GET_BILL_PRODUCTS_SUCCESS,
  REMOVE_PRODUCT_FROM_BILL_REQUEST,
  REMOVE_PRODUCT_FROM_BILL_SUCCESS,
  REMOVE_PRODUCT_FROM_BILL_FAIL,
  REMOVE_PRODUCT_FROM_BILL_RESET,
  RESTORE_PRODUCT_TO_BILL_REQUEST,
  RESTORE_PRODUCT_TO_BILL_SUCCESS,
  RESTORE_PRODUCT_TO_BILL_FAIL,
  RESTORE_PRODUCT_TO_BILL_RESET,
  CANCEL_BILL_REQUEST,
  CANCEL_BILL_SUCCESS,
  CANCEL_BILL_FAIL,
  CANCEL_BILL_RESET,
  RESTORE_BILL_REQUEST,
  RESTORE_BILL_SUCCESS,
  RESTORE_BILL_FAIL,
  RESTORE_BILL_RESET,
  ACCEPT_BILL_REQUEST,
  ACCEPT_BILL_SUCCESS,
  ACCEPT_BILL_RESET,
  ACCEPT_BILL_FAIL,
  BARCODE_REQUEST,
  BARCODE_SUCCESS,
  BARCODE_FAIL,
  BARCODE_RESET,
  SEND_BILL_REQUEST,
  SEND_BILL_SUCCESS,
  SEND_BILL_FAIL,
  SEND_BILL_RESET,
  UPDATE_BILL_PRODUCTS_REQUEST,
  UPDATE_BILL_PRODUCTS_SUCCESS,
  UPDATE_BILL_PRODUCTS_FAIL,
  UPDATE_BILL_PRODUCTS_RESET,
} from '../constants/billConstants';

export const initBillReducer = (state = { bill: '' }, action) => {
  switch (action.type) {
    case INIT_BILL_REQUEST:
      return {
        loading: true,
        bill: '',
      };
    case INIT_BILL_SUCCESS:
      // const localBill1 = {
      //   id: action.payload.table[0].column2,
      // };
      // localStorage.setItem('localBill', JSON.stringify(localBill1));
      return {
        loading: false,
        bill: action.payload.table[0].column2,
      };

    case INIT_BILL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case INIT_BILL_RESET:
      return {
        loading: false,
        error: '',
        bill: '',
      };

    default:
      return state;
  }
};

export const getBillDetailsReducer = (state = { billDetails: '' }, action) => {
  switch (action.type) {
    case GET_BILL_DETAILS_REQUEST:
      return {
        loading: true,
        billDetails: '',
      };
    case GET_BILL_DETAILS_SUCCESS:
      return {
        loading: false,
        billDetails: action.payload.table[0],
      };

    case GET_BILL_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case GET_BILL_DETAILS_RESET:
      return {
        loading: false,
        error: '',
        billDetails: '',
      };

    default:
      return state;
  }
};

export const getBillProductsReducer = (
  state = { billProducts: '' },
  action
) => {
  switch (action.type) {
    case GET_BILL_PRODUCTS_REQUEST:
      return {
        loading: true,
        billProducts: '',
      };
    case GET_BILL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        billProducts: action.payload.table,
      };

    case GET_BILL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case GET_BILL_PRODUCTS_RESET:
      return {
        loading: false,
        error: '',
        billProducts: '',
      };

    default:
      return state;
  }
};

export const removeProductFromBillReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT_FROM_BILL_REQUEST:
      return {
        loading: true,
      };
    case REMOVE_PRODUCT_FROM_BILL_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case REMOVE_PRODUCT_FROM_BILL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case REMOVE_PRODUCT_FROM_BILL_RESET:
      return {
        loading: false,
        error: '',
        success: '',
      };

    default:
      return state;
  }
};

export const restoreProductToBillReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTORE_PRODUCT_TO_BILL_REQUEST:
      return {
        loading: true,
      };
    case RESTORE_PRODUCT_TO_BILL_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case RESTORE_PRODUCT_TO_BILL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case RESTORE_PRODUCT_TO_BILL_RESET:
      return {
        loading: false,
        error: '',
        success: '',
      };

    default:
      return state;
  }
};

export const cancelBillReducer = (state = {}, action) => {
  switch (action.type) {
    case CANCEL_BILL_REQUEST:
      return {
        loading: true,
      };
    case CANCEL_BILL_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case CANCEL_BILL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CANCEL_BILL_RESET:
      return {
        loading: false,
        error: '',
        success: '',
      };

    default:
      return state;
  }
};

export const restoreBillReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTORE_BILL_REQUEST:
      return {
        loading: true,
      };
    case RESTORE_BILL_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case RESTORE_BILL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case RESTORE_BILL_RESET:
      return {
        loading: false,
        error: '',
        success: '',
      };

    default:
      return state;
  }
};

export const acceptBillReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCEPT_BILL_REQUEST:
      return {
        loading: true,
      };
    case ACCEPT_BILL_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ACCEPT_BILL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ACCEPT_BILL_RESET:
      return {
        loading: false,
        error: '',
        success: '',
      };

    default:
      return state;
  }
};

export const barcodeReducer = (state = {}, action) => {
  switch (action.type) {
    case BARCODE_REQUEST:
      return {
        loading: true,
      };
    case BARCODE_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };

    case BARCODE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case BARCODE_RESET:
      return {
        loading: false,
        error: '',
        success: '',
      };

    default:
      return state;
  }
};

export const sendBillReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_BILL_REQUEST:
      return {
        loading: true,
      };

    case SEND_BILL_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case SEND_BILL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case SEND_BILL_RESET:
      return {
        loading: false,
        error: '',
        success: '',
      };

    default:
      return state;
  }
};

export const updateBillProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BILL_PRODUCTS_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_BILL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case UPDATE_BILL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case UPDATE_BILL_PRODUCTS_RESET:
      return {
        loading: false,
        error: '',
        success: '',
      };

    default:
      return state;
  }
};
