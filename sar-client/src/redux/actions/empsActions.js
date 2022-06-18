import {
  GET_EMPS_FAIL,
  GET_EMPS_REQUEST,
  GET_EMPS_RESET,
  GET_EMPS_SUCCESS,
  ADD_EMP_FAIL,
  ADD_EMP_REQUEST,
  ADD_EMP_RESET,
  ADD_EMP_SUCCESS,
  DELETE_EMP_FAIL,
  DELETE_EMP_REQUEST,
  DELETE_EMP_RESET,
  DELETE_EMP_SUCCESS,
  UPDATE_EMP_REQUEST,
  UPDATE_EMP_SUCCESS,
  UPDATE_EMP_FAIL,
  HIDE_EMP_REQUEST,
  HIDE_EMP_SUCCESS,
  SHOW_EMP_REQUEST,
  SHOW_EMP_SUCCESS,
  GET_EMPS_LIST_FAIL,
  GET_EMPS_LIST_SUCCESS,
  GET_EMPS_LIST_REQUEST,
  GET_EMPS_ORDER_STATS_REQUEST,
  GET_EMPS_ORDER_STATS_SUCCESS,
  GET_EMPS_ORDER_STATS_FAIL,
  GET_EMPS_COMM_STATS_REQUEST,
  GET_EMPS_COMM_STATS_SUCCESS,
  GET_EMPS_COMM_STATS_FAIL,
  GET_EMPS_ONE_STATS_REQUEST,
  GET_EMPS_ONE_STATS_SUCCESS,
  GET_EMPS_ONE_STATS_FAIL,
  GET_EMPS_PAID_STATS_REQUEST,
  GET_EMPS_PAID_STATS_SUCCESS,
  GET_EMPS_PAID_STATS_FAIL,
  BLOCK_EMP_REQUEST,
  BLOCK_EMP_SUCCESS,
  BLOCK_EMP_FAIL,
  UNBLOCK_EMP_REQUEST,
  UNBLOCK_EMP_SUCCESS,
  UNBLOCK_EMP_FAIL,
  GET_REPORT_LIST_REQUEST,
  GET_REPORT_LIST_SUCCESS,
  GET_REPORT_LIST_FAIL,
  GET_REPORT_TABLE_REQUEST,
  GET_REPORT_TABLE_SUCCESS,
  GET_REPORT_TABLE_FAIL,
  DELETE_REPORT_TABLE_REQUEST,
  DELETE_REPORT_TABLE_SUCCESS,
  DELETE_REPORT_TABLE_FAIL,
  ADD_REPORT_TABLE_REQUEST,
  ADD_REPORT_TABLE_SUCCESS,
  ADD_REPORT_TABLE_FAIL,
  UPDATE_REPORT_TABLE_REQUEST,
  UPDATE_REPORT_TABLE_SUCCESS,
  UPDATE_REPORT_TABLE_FAIL,
} from '../constants/empConstants';

import {
  SET_CURRENT_EMP,
  SET_CURRENT_EMP_RESET,
} from '../constants/empConstants';
import axios from 'axios';

export const getEmps = (name) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_EMPS_REQUEST,
    });

    const { data } = await axios.get(
      name
        ? `/api/Employee?level=selectByName&empname=${name}`
        : `/api/Employee`
    );

    dispatch({
      type: GET_EMPS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EMPS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getEmpsList = () => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_EMPS_LIST_REQUEST,
    });

    const { data } = await axios.get(
      '/api/Employee?level=selectNames&empname=t'
    );

    dispatch({
      type: GET_EMPS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EMPS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getEmpsOrderStats = (id) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_EMPS_ORDER_STATS_REQUEST,
    });

    const { data } = await axios.get(
      `/api/statistics?level=EmpOrderStatistic&EmpId=${id}`
    );

    dispatch({
      type: GET_EMPS_ORDER_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EMPS_ORDER_STATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getEmpsOneStats = (id) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_EMPS_ONE_STATS_REQUEST,
    });

    const { data } = await axios.get(
      `/api/statistics?level=EmpStatisticOne&EmpId=${id}`
    );

    dispatch({
      type: GET_EMPS_ONE_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EMPS_ONE_STATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getEmpsCommStats = (id) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_EMPS_COMM_STATS_REQUEST,
    });

    const { data } = await axios.get(
      `/api/statistics?level=EmpCommStatistic&EmpId=${id}`
    );

    dispatch({
      type: GET_EMPS_COMM_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EMPS_COMM_STATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEmpsPaidStats = (id) => async (dispatch) => {
  try {
    // loading
    dispatch({
      type: GET_EMPS_PAID_STATS_REQUEST,
    });

    const { data } = await axios.get(
      `/api/statistics?level=EmpPaidStatistic&EmpId=${id}`
    );

    dispatch({
      type: GET_EMPS_PAID_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EMPS_PAID_STATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addNewEmp =
  (empName, add1, add2, password, notes, mob1, mob2, email) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADD_EMP_REQUEST,
      });

      const body = {
        level: 'insert',
        empId: '1182',
        empName: empName,
        empType: '3',
        password: password,
        BlockReason: '8',
        address2: add2,
        notes: notes,
        totalpaid: '1',
        totalRemain: '1',
        IsBlocked:
          '22222222222222222222dddd222222222222222222222222222222222222222222222',
        mobile1: mob1,
        mobile2: mob2,
        Email: email,
        address1: add1,
        gender: '1789',
        state: '1789',
        images: '1789',
        CityID: '1',
      };

      const { data } = await axios.post(`/api/Employee`, body);

      dispatch({
        type: ADD_EMP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_EMP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteEmp = (empId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_EMP_REQUEST,
    });

    const body = {
      level: 'delete',
      empId: empId,
      empName: 'empName',
      empType: '3',
      password: 'password',
      BlockReason: '8',
      address2: 'add2',
      notes: 'notes',
      totalpaid: '1',
      totalRemain: '1',
      IsBlocked:
        '22222222222222222222dddd222222222222222222222222222222222222222222222',
      mobile1: 'mob1',
      mobile2: 'mob2',
      Email: 'email',
      address1: 'add1',
      gender: '1789',
      state: '1789',
      images: '1789',
      CityID: '1',
    };

    const { data } = await axios.post(`/api/Employee`, body);

    if (data.table[0].column1 === 'cant delete it') {
      throw new Error('لا يمكن الحذف لأن المندوب مرتبط ببيانات أخرى');
    }

    dispatch({
      type: DELETE_EMP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EMP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const hideEmp = (empId) => async (dispatch) => {
//   try {
//     dispatch({type:HIDE_EMP_REQUEST,payload:id})

//     const body = {
//             "level": "hide",
//             "empId": empId,
//             "empName": "empName",
//             "empType": "e",
//             "password": "password",
//             "BlockReason": "",
//             "address2":"add2",
//             "notes": "notes",
//             "totalpaid": "0",
//             "totalRemain": "0",
//             "IsBlocked": "-",
//             "mobile1": "mob1",
//             "mobile2": "mob2",
//             "Email": "email",
//             "address1": "add1",
//             "gender": "",
//             "state": "",
//             "images": "",
//             "CityID": "cityId"
//             }

//     const { data } = await axios.post(
//        `/api/Employee`,body
//     );

//     dispatch({type:HIDE_EMP_SUCCESS,payload:id})

//   } catch (error) {

//     console.error(error);
//   }
// };
// export const showEmp = (empId) => async (dispatch) => {
//   try {
//     dispatch({type:SHOW_EMP_REQUEST,payload:empId})

//     const body = {
//             "level": "show",
//             "empId": empId,
//             "empName": "empName",
//             "empType": "e",
//             "password": "password",
//             "BlockReason": "",
//             "address2":"add2",
//             "notes": "notes",
//             "totalpaid": "0",
//             "totalRemain": "0",
//             "IsBlocked": "-",
//             "mobile1": "mob1",
//             "mobile2": "mob2",
//             "Email": "email",
//             "address1": "add1",
//             "gender": "",
//             "state": "",
//             "images": "",
//             "CityID": "cityId"
//             }

//     const { data } = await axios.post(
//       `/api/Employee`,body
//     );
//     dispatch({type:SHOW_EMP_SUCCESS,payload:id})

//   } catch (error) {

//     console.error(error);
//   }
// };

export const updateEmp =
  (empId, empName, add1, add2, password, notes, mob1, mob2, email) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_EMP_REQUEST,
      });

      const body = {
        level: 'update',
        empId: empId,
        empName: empName,
        empType: '3',
        password: password,
        BlockReason: '8',
        address2: add2,
        notes: notes,
        totalpaid: '1',
        totalRemain: '1',
        IsBlocked:
          '22222222222222222222dddd222222222222222222222222222222222222222222222',
        mobile1: mob1,
        mobile2: mob2,
        Email: email,
        address1: add1,
        gender: '1789',
        state: '1789',
        images: '1789',
        CityID: '1',
      };

      const { data } = await axios.post(`/api/Employee`, body);

      dispatch({
        type: UPDATE_EMP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_EMP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const setCurrentEmp = (emp) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_EMP,
    payload: emp,
  });
};

export const blockEmp = (empId, reason) => async (dispatch) => {
  try {
    dispatch({
      type: BLOCK_EMP_REQUEST,
    });

    const { data } = await axios.get(
      `/api/Employee?level=setBlocked&empId=${empId}&BlockReason=${reason}`
    );

    dispatch({
      type: BLOCK_EMP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOCK_EMP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const unBlockEmp = (empId) => async (dispatch) => {
  try {
    dispatch({
      type: UNBLOCK_EMP_REQUEST,
    });

    const { data } = await axios.get(
      `/api/Employee?level=deBlocked&empId=${empId}`
    );

    dispatch({
      type: UNBLOCK_EMP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UNBLOCK_EMP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getReportList = (empId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_REPORT_LIST_REQUEST,
    });

    const { data } = await axios.get(
      `/api/AcStatement?level=NoReport&empID=${empId}`
    );

    dispatch({
      type: GET_REPORT_LIST_SUCCESS,
      payload: data.table,
    });
  } catch (error) {
    dispatch({
      type: GET_REPORT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getReportTable = (empId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_REPORT_TABLE_REQUEST,
    });

    const { data } = await axios.get(
      `/api/AcStatement?level=AcShow&empID=${empId}`
    );

    dispatch({
      type: GET_REPORT_TABLE_SUCCESS,
      payload: data.table,
    });
  } catch (error) {
    dispatch({
      type: GET_REPORT_TABLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteReportTable = (reportId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_REPORT_TABLE_REQUEST,
    });
    const body = {
      level: 'delete',
      AsID: reportId,
    };

    const { data } = await axios.post(`/api/AcStatement`, body);

    dispatch({
      type: DELETE_REPORT_TABLE_SUCCESS,
      payload: data.table,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REPORT_TABLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addReportTable =
  (
    purId,
    empId,
    discount,
    payoff,
    purchComm,
    delivComm,
    note,
    noteDis,
    notePayoff
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADD_REPORT_TABLE_REQUEST,
      });
      const body = {
        level: 'insert',
        AsID: '0',
        PurchaseId: purId,
        empID: empId,
        discount: discount,
        payoff: payoff,
        purchaseComm: purchComm,
        DeliveryComm: delivComm,
        note: note,
        notedis: noteDis,
        notepayoff: notePayoff,
      };

      const { data } = await axios.post(`/api/AcStatement`, body);

      dispatch({
        type: ADD_REPORT_TABLE_SUCCESS,
        payload: data.table,
      });
    } catch (error) {
      dispatch({
        type: ADD_REPORT_TABLE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateReportTable =
  (
    reportId,
    purId,
    empId,
    discount,
    payoff,
    purchComm,
    delivComm,
    note,
    noteDis,
    notePayoff
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_REPORT_TABLE_REQUEST,
      });
      const body = {
        level: 'update',
        AsID: reportId,
        PurchaseId: purId,
        empID: empId,
        discount: discount,
        payoff: payoff,
        purchaseComm: purchComm,
        DeliveryComm: delivComm,
        note: note,
        notedis: noteDis,
        notepayoff: notePayoff,
      };

      const { data } = await axios.post(`/api/AcStatement`, body);

      dispatch({
        type: UPDATE_REPORT_TABLE_SUCCESS,
        payload: data.table,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_REPORT_TABLE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
