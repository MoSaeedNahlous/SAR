import {
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_RESET,
  GET_PRODUCTS_SUCCESS,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_RESET,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  HIDE_PRODUCT_REQUEST,
  HIDE_PRODUCT_SUCCESS,
  SHOW_PRODUCT_REQUEST,
  SHOW_PRODUCT_SUCCESS,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  ADD_PRODUCT_TO_ORDER_REQUEST,
  ADD_PRODUCT_TO_ORDER_SUCCESS,
  ADD_PRODUCT_TO_ORDER_FAIL,
  CHECK_CART_FOR_PRODUCT_REQUEST,
  CHECK_CART_FOR_PRODUCT_SUCCESS,
  CHECK_CART_FOR_PRODUCT_FAIL,
} from '../constants/productsConstants';

import {
  SET_CURRENT_PRODUCT,
  SET_CURRENT_PRODUCT_RESET,
} from '../constants/productsConstants';
import axios from 'axios';

export const getProducts =
  (method, search, subCatId, edit) => async (dispatch) => {
    try {
      // loading
      dispatch({
        type: GET_PRODUCTS_REQUEST,
      });

      if (method) {
        const { data } = await axios.get(
          method === 'pCode'
            ? `/api/Products?level=selectByPCode&PID=1&SubCatID&SizeName&PCode=${search}`
            : `/api/Products?level=selectBysize&PID=1&SubCatID&SizeName=${search}&PCode`
        );
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: data,
        });
      } else if (subCatId) {
        const { data } = await axios.get(
          edit
            ? `/api/Products?level=selectBySubcatM&PID=1&SubCatID=${subCatId}&SizeName&PCode`
            : `/api/Products?level=selectBySubcat&PID=1&SubCatID=${subCatId}&SizeName&PCode`
        );
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: data,
        });
      } else {
        const { data } = await axios.get(
          `/api/Products?level=selectM&PID=1&SubCatID&SizeName&PCode=a22`
        );
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getProductManager = (pid, showAllSizes) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_PRODUCT_REQUEST,
    });

    const { data } = await axios.get(
      showAllSizes
        ? `/api/products?level=SelectDetailsM&PID=${pid}`
        : `/api/products?level=SelectDetails&PID=${pid}`
    );

    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProducts0 = () => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_PRODUCTS_REQUEST,
    });

    const { data } = await axios.get(
      `/api/Products?level=selectNoQuantity&PID=0`
    );

    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductDefault = (pid) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_PRODUCT_REQUEST,
    });

    const { data: data1 } = await axios.get(
      `/api/products?level=selectOnlysize&PID=${pid}`
    );

    const { data } = await axios.get(
      `/api/Products?level=SelectPro&PID=${pid}&SizeName=${data1.table[0].sizeID}`
    );

    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addProductToOrder =
  (orderId, quan, hprice, sprice, quanId) => async (dispatch) => {
    try {
      dispatch({
        type: ADD_PRODUCT_TO_ORDER_REQUEST,
      });

      const body = {
        level: 'insert',
        purid: orderId,
        subPurId: '',
        quOrdered: quan,
        Hprice: hprice,
        Sprice: sprice,
        state: '',
        note: '',
        quOutput: '',
        quanid: quanId,
      };

      const { data } = await axios.post('/api/subPurchase', body);

      dispatch({
        type: ADD_PRODUCT_TO_ORDER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ADD_PRODUCT_TO_ORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteProduct = (pid) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const body = {
      level: 'delete',
      PID: pid,
    };

    const { data } = await axios.post(`/api/Products`, body);

    if (data.table[0].column1 === 'Cannot delete it!') {
      throw new Error('لا يمكن حذف المنتج لوجود طلبيات متعلقة به!');
    }
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct =
  (pName, PrdSizeQuantID, Quantity, PPrice, PSelPrice, notes) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PRODUCT_REQUEST,
      });

      const body = {
        level: 'updateAll',
        PName: pName,
        PrdSizeQuantID: PrdSizeQuantID,
        Quantity: Quantity,
        PPrice: PPrice,
        PSelPrice: PSelPrice,
        notes: notes,
      };

      const { data } = await axios.post(`/api/ProductsQuantity`, body);

      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const checkCartForProduct = (purId, quanId) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: CHECK_CART_FOR_PRODUCT_REQUEST,
    });

    const { data } = await axios.get(
      `/api/subPurchase?level=checkPro&purid=${purId}&quanid=${quanId}`
    );

    if (data.table[0].column1 == 'المادة مضافة') {
      throw new Error('المادة مضافة مسبقا للطلبية الحالية');
    }

    if (data.table[0].column1 == 'المادة محذوفة') {
      throw new Error('المادة محذوفة');
    }

    dispatch({
      type: CHECK_CART_FOR_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHECK_CART_FOR_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addProduct =
  (arr, name, catId, subCatId, targetId, code, note, img1, img2, img3) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADD_PRODUCT_REQUEST,
      });

      const body = {
        table: arr,
        PID: '0',
        PName: name,
        CatID: catId,
        SubCatID: subCatId,
        FollowedID: targetId,
        notes: note,
        PCode: code,
        state: '',
      };

      const { data } = await axios.post('/api/insertprod', body);

      const pId = data.table[0].column2;

      const formData = new FormData();
      if (img1) {
        formData.append('feils', img1);
      }
      if (img2) {
        formData.append('feils', img2);
      }
      if (img3) {
        formData.append('feils', img3);
      }
      formData.append('pid', pId);
      formData.append('pic_num', 0);

      const { data2 } = await axios.post('/imageinsert', formData);

      dispatch({
        type: ADD_PRODUCT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ADD_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
