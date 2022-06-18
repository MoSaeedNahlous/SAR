import {
  INIT_BILL_FAIL,
  INIT_BILL_REQUEST,
  INIT_BILL_SUCCESS,
  GET_BILL_DETAILS_FAIL,
  GET_BILL_DETAILS_REQUEST,
  GET_BILL_DETAILS_RESET,
  GET_BILL_DETAILS_SUCCESS,
  INIT_BILL_RESET,
  GET_BILL_PRODUCTS_REQUEST,
  GET_BILL_PRODUCTS_SUCCESS,
  GET_BILL_PRODUCTS_FAIL,
  RESTORE_PRODUCT_TO_BILL_REQUEST,
  RESTORE_PRODUCT_TO_BILL_SUCCESS,
  RESTORE_PRODUCT_TO_BILL_FAIL,
  REMOVE_PRODUCT_FROM_BILL_REQUEST,
  REMOVE_PRODUCT_FROM_BILL_SUCCESS,
  REMOVE_PRODUCT_FROM_BILL_FAIL,
  CANCEL_BILL_REQUEST,
  CANCEL_BILL_SUCCESS,
  CANCEL_BILL_FAIL,
  RESTORE_BILL_REQUEST,
  RESTORE_BILL_SUCCESS,
  RESTORE_BILL_FAIL,
  ACCEPT_BILL_REQUEST,
  ACCEPT_BILL_SUCCESS,
  ACCEPT_BILL_FAIL,
  BARCODE_FAIL,
  BARCODE_SUCCESS,
  BARCODE_REQUEST,
  SEND_BILL_SUCCESS,
  SEND_BILL_FAIL,
  SEND_BILL_REQUEST,
  UPDATE_BILL_PRODUCTS_REQUEST,
  UPDATE_BILL_PRODUCTS_SUCCESS,
  UPDATE_BILL_PRODUCTS_FAIL,
} from '../constants/billConstants';
import axios from 'axios';

export const initBill =
  (userId, empId, address, mobile, url) => async (dispatch) => {
    try {
      // loading
      dispatch({
        type: INIT_BILL_REQUEST,
      });

      const body = {
        level: 'insert',
        UserId: userId,
        EmpId: 1,
        mobile1: mobile,
        url: url,
        CityID: '1',
        address: address,
      };

      const { data } = await axios.post(`/api/Purchase`, body);

      dispatch({
        type: INIT_BILL_SUCCESS,
        payload: data,
      });
      localStorage.setItem(
        'currentBillId',
        JSON.stringify(data.table[0].column2)
      );
    } catch (error) {
      dispatch({
        type: INIT_BILL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getBillDetails = (billId) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_BILL_DETAILS_REQUEST,
    });

    const body = {
      level: 'selectOne',
      PurchaseId: billId,
    };

    const { data } = await axios.post(`/api/PurchaseView`, body);

    dispatch({
      type: GET_BILL_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BILL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getBillProducts = (billId) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_BILL_PRODUCTS_REQUEST,
    });

    const { data } = await axios.get(
      `/api/subPurchase?level=selectByPurchaseID&Purid=${billId}&quanid=0`
    );

    dispatch({
      type: GET_BILL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BILL_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeProductFromBill = (productId) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: REMOVE_PRODUCT_FROM_BILL_REQUEST,
    });

    const body = {
      level: 'delete',
      purid: '',
      subPurId: productId,
    };

    const { data } = await axios.post(`/api/subPurchase`, body);

    dispatch({
      type: REMOVE_PRODUCT_FROM_BILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_PRODUCT_FROM_BILL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const restoreProductToBill = (productId) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: RESTORE_PRODUCT_TO_BILL_REQUEST,
    });

    const body = {
      level: 'restore',
      purid: '',
      subPurId: productId,
    };

    const { data } = await axios.post(`/api/subPurchase`, body);

    dispatch({
      type: RESTORE_PRODUCT_TO_BILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESTORE_PRODUCT_TO_BILL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cancelBill = (billId) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: CANCEL_BILL_REQUEST,
    });

    const body = {
      level: 'cancel',
      PurchaseId: billId,
    };

    const { data } = await axios.post(`/api/Purchase`, body);

    dispatch({
      type: CANCEL_BILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CANCEL_BILL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const restoreBill = (billId) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: RESTORE_BILL_REQUEST,
    });

    const body = {
      level: 'restore',
      PurchaseId: billId,
    };

    const { data } = await axios.post(`/api/Purchase`, body);

    dispatch({
      type: RESTORE_BILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESTORE_BILL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const acceptBill =
  (
    billId,
    empId,
    address,
    mobile1,
    mobile2,
    url,
    deliveryCost,
    sellPrice,
    prodPrice,
    notes,
    deliveryId,
    billID,
    cityId,
    arr
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_BILL_PRODUCTS_REQUEST,
      });

      const body1 = {
        products: arr,
        purid: billId,
      };

      const { data } = await axios.post(`/api/SubPurchaseUpdate`, body1);
      console.log(data);

      if (data.table[0].quanAllow) {
        throw new Error(
          `خطأ في المنتج رقم ${data.table[0].num} لايمكن إضافة كمية أكبر من ${data.table[0].quanAllow}`
        );
      }
      dispatch({
        type: UPDATE_BILL_PRODUCTS_SUCCESS,
        payload: data,
      });

      try {
        // loading
        dispatch({
          type: ACCEPT_BILL_REQUEST,
        });

        const body = {
          level: 'acceptOrder',
          PurchaseId: billId,
          EmpId: empId,
          address: address,
          mobile1: mobile1,
          mobile2: mobile2,
          url: url,
          state: '',
          DeliveryCost: deliveryCost,
          selPrice: sellPrice,
          prodPrice: prodPrice,
          note: notes,
          deliveryID: deliveryId,
          BillID: billID,
          CityID: cityId,
        };

        const { data } = await axios.post(`/api/Purchase`, body);

        dispatch({
          type: ACCEPT_BILL_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: ACCEPT_BILL_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_BILL_PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const barcodeInsert = (billId, code) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: BARCODE_REQUEST,
    });

    const body = {
      level: 'insert',
      purid: billId,
      code: code,
    };

    const { data } = await axios.post(`/api/subPurchaseByCode`, body);

    if (data.table[0].column1 == -2) {
      throw new Error('الباركود المدخل خاطئ');
    }
    if (data.table[0].column1 == -3) {
      throw new Error('المادة  غير موجودة في الطلبية');
    }
    if (data.table[0].column1 == -4) {
      throw new Error('المادة محذوفة');
    }
    if (data.table[0].column1 == -6) {
      throw new Error('المادة مخرجة سابقا');
    }
    if (data.table[0].column1 == -7) {
      throw new Error('القيم المدخلة غير صحيحة');
    }
    if (data.table[0].column1 == -1) {
      throw new Error('حدث خطأ ما');
    }
    if (data.table[0].column1 > 0) {
      throw new Error(
        `${data.table[0].column1} لايوجد كمية كافية في المستودع , الكمية المتوافرة هي `
      );
    }

    dispatch({
      type: BARCODE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BARCODE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const barcodeOutput = (billId, code) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: BARCODE_REQUEST,
    });

    const body = {
      level: 'output',
      purid: billId,
      code: code,
    };

    const { data } = await axios.post(`/api/subPurchaseByCode`, body);

    if (data.table[0].column1 == -2) {
      throw new Error('الباركود المدخل خاطئ');
    }
    if (data.table[0].column1 == -3) {
      throw new Error('المادة  غير موجودة في الطلبية');
    }
    if (data.table[0].column1 == -4) {
      throw new Error('المادة محذوفة');
    }
    if (data.table[0].column1 == -6) {
      throw new Error('المادة مخرجة سابقا');
    }
    if (data.table[0].column1 == -7) {
      throw new Error('القيم المدخلة غير صحيحة');
    }
    if (data.table[0].column1 == -1) {
      throw new Error('حدث خطأ ما');
    }
    if (data.table[0].column1 > 0) {
      throw new Error(
        `${data.table[0].column1} لايوجد كمية كافية في المستودع , الكمية المتوافرة هي `
      );
    }

    dispatch({
      type: BARCODE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BARCODE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const barcodeDelete = (billId, code) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: BARCODE_REQUEST,
    });

    const body = {
      level: 'delete',
      purid: billId,
      code: code,
    };

    const { data } = await axios.post(`/api/subPurchaseByCode`, body);

    if (data.table[0].column1 == -2) {
      throw new Error('الباركود المدخل خاطئ');
    }
    if (data.table[0].column1 == -3) {
      throw new Error('المادة  غير موجودة في الطلبية');
    }
    if (data.table[0].column1 == -4) {
      throw new Error('المادة محذوفة');
    }
    if (data.table[0].column1 == -6) {
      throw new Error('المادة مخرجة سابقا');
    }
    if (data.table[0].column1 == -7) {
      throw new Error('القيم المدخلة غير صحيحة');
    }
    if (data.table[0].column1 == -1) {
      throw new Error('حدث خطأ ما');
    }
    if (data.table[0].column1 > 0) {
      throw new Error(
        `${data.table[0].column1} لايوجد كمية كافية في المستودع , الكمية المتوافرة هي `
      );
    }

    dispatch({
      type: BARCODE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BARCODE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendBill =
  (
    billId,
    empId,
    address,
    mobile1,
    mobile2,
    url,
    deliveryCost,
    sellPrice,
    prodPrice,
    notes,
    deliveryId,
    billID,
    cityId,
    arr
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_BILL_PRODUCTS_REQUEST,
      });

      const body1 = {
        products: arr,
        purid: billId,
      };

      const { data } = await axios.post(`/api/SubPurchaseUpdate`, body1);

      if (data.table[0].quanAllow) {
        throw new Error(
          `خطأ في المنتج رقم ${data.table[0].num} لايمكن إضافة كمية أكبر من ${data.table[0].quanAllow}`
        );
      }

      dispatch({
        type: UPDATE_BILL_PRODUCTS_SUCCESS,
        payload: data,
      });

      try {
        // loading
        dispatch({
          type: SEND_BILL_REQUEST,
        });

        const body = {
          level: 'send',
          PurchaseId: billId,
          EmpId: empId,
          address: address,
          mobile1: mobile1,
          mobile2: mobile2,
          url: url,
          state: '',
          DeliveryCost: deliveryCost,
          selPrice: sellPrice,
          ProdPrice: prodPrice,
          note: notes,
          deliveryID: deliveryId,
          BillID: billID,
          CityID: cityId,
        };

        const { data } = await axios.post(`/api/Purchase`, body);

        dispatch({
          type: SEND_BILL_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: SEND_BILL_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_BILL_PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateBillProducts = (products, billId) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: UPDATE_BILL_PRODUCTS_REQUEST,
    });

    const body = {
      products: products,
      purid: billId,
    };

    const { data } = await axios.post(`/api/SubPurchaseUpdate`, body);

    dispatch({
      type: UPDATE_BILL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BILL_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const acceptBillGrid = (id) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: ACCEPT_BILL_REQUEST,
    });

    const body = {
      level: 'acceptGV',
      PurchaseId: id,
    };

    const { data } = await axios.post(`/api/Purchase`, body);

    dispatch({
      type: ACCEPT_BILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACCEPT_BILL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
