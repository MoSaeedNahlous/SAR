import {
  GET_EMPS_FAIL,
  GET_EMPS_REQUEST,
  GET_EMPS_RESET,
  GET_EMPS_SUCCESS,
  SET_CURRENT_EMP,
  SET_CURRENT_EMP_RESET,
  ADD_EMP_FAIL,
  ADD_EMP_REQUEST,
  ADD_EMP_RESET,
  ADD_EMP_SUCCESS,
  DELETE_EMP_REQUEST,
  DELETE_EMP_SUCCESS,
  DELETE_EMP_FAIL,
  DELETE_EMP_RESET,
  UPDATE_EMP_REQUEST,
  UPDATE_EMP_SUCCESS,
  UPDATE_EMP_FAIL,
  UPDATE_EMP_RESET,
  HIDE_EMP_SUCCESS,
  HIDE_EMP_REQUEST,
  SHOW_EMP_REQUEST,
  SHOW_EMP_SUCCESS,
  GET_EMPS_LIST_RESET,
  GET_EMPS_LIST_REQUEST,
  GET_EMPS_LIST_SUCCESS,
  GET_EMPS_LIST_FAIL,
  GET_EMPS_ORDER_STATS_REQUEST,
  GET_EMPS_ORDER_STATS_SUCCESS,
  GET_EMPS_ORDER_STATS_FAIL,
  GET_EMPS_ORDER_STATS_RESET,
  GET_EMPS_COMM_STATS_REQUEST,
  GET_EMPS_COMM_STATS_SUCCESS,
  GET_EMPS_COMM_STATS_FAIL,
  GET_EMPS_COMM_STATS_RESET,
  GET_EMPS_ONE_STATS_REQUEST,
  GET_EMPS_ONE_STATS_SUCCESS,
  GET_EMPS_ONE_STATS_FAIL,
  GET_EMPS_ONE_STATS_RESET,
  GET_EMPS_PAID_STATS_REQUEST,
  GET_EMPS_PAID_STATS_SUCCESS,
  GET_EMPS_PAID_STATS_FAIL,
  GET_EMPS_PAID_STATS_RESET,
  BLOCK_EMP_REQUEST,
  UNBLOCK_EMP_REQUEST,
  BLOCK_EMP_SUCCESS,
  UNBLOCK_EMP_SUCCESS,
  BLOCK_EMP_FAIL,
  BLOCK_EMP_RESET,
  GET_REPORT_LIST_REQUEST,
  GET_REPORT_LIST_FAIL,
  GET_REPORT_LIST_RESET,
  GET_REPORT_LIST_SUCCESS,
  GET_REPORT_TABLE_REQUEST,
  GET_REPORT_TABLE_SUCCESS,
  GET_REPORT_TABLE_FAIL,
  GET_REPORT_TABLE_RESET,
  DELETE_REPORT_TABLE_REQUEST,
  DELETE_REPORT_TABLE_SUCCESS,
  DELETE_REPORT_TABLE_FAIL,
  DELETE_REPORT_TABLE_RESET,
  ADD_REPORT_TABLE_RESET,
  ADD_REPORT_TABLE_FAIL,
  ADD_REPORT_TABLE_SUCCESS,
  ADD_REPORT_TABLE_REQUEST,
  UPDATE_REPORT_TABLE_REQUEST,
  UPDATE_REPORT_TABLE_SUCCESS,
  UPDATE_REPORT_TABLE_FAIL,
  UPDATE_REPORT_TABLE_RESET,
} from '../constants/empConstants';

export const getEmpsReducer = (state = { emps: [] }, action) => {
  switch (action.type) {
    case GET_EMPS_REQUEST:
      return {
        loading: true,
        emps: [],
      };
    case GET_EMPS_SUCCESS:
      return {
        loading: false,
        emps: action.payload.table,
      };

    case GET_EMPS_FAIL:
      return { loading: false, error: action.payload };

    // case HIDE_EMP_REQUEST:
    //      return {
    //          ...state,
    //          loading: true
    //      }

    // case HIDE_EMP_SUCCESS:
    //      return {
    //         loading:false,
    //         EMPS: state.EMPS.map(
    //             (cat) => {
    //                 if (cat.catID == action.payload) {
    //                     cat.cstate = 0
    //                 }
    //                 return cat
    //             }
    //         )
    //     }
    // case SHOW_EMP_REQUEST:
    //      return {
    //          ...state,
    //          loading: true
    //      }

    // case SHOW_EMP_SUCCESS:
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

export const getEmpsListReducer = (state = { empsList: [] }, action) => {
  switch (action.type) {
    case GET_EMPS_LIST_REQUEST:
      return {
        loading: true,
        empsList: [],
      };
    case GET_EMPS_LIST_SUCCESS:
      return {
        loading: false,
        empsList: action.payload.table,
      };

    case GET_EMPS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_EMPS_LIST_RESET:
      return {
        loading: false,
        error: '',
        empsList: [],
      };

    default:
      return state;
  }
};

export const getEmpsOneStatsReducer = (
  state = { empsOneStats: {} },
  action
) => {
  switch (action.type) {
    case GET_EMPS_ONE_STATS_REQUEST:
      return {
        loading: true,
        empsOneStats: {},
      };
    case GET_EMPS_ONE_STATS_SUCCESS:
      return {
        loading: false,
        empsOneStats: action.payload.table[0],
      };

    case GET_EMPS_ONE_STATS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_EMPS_ONE_STATS_RESET:
      return {
        loading: false,
        error: '',
        empsOneStats: {},
      };

    default:
      return state;
  }
};

export const getEmpsOrderStatsReducer = (
  state = { empsOrderStats: [] },
  action
) => {
  switch (action.type) {
    case GET_EMPS_ORDER_STATS_REQUEST:
      return {
        loading: true,
        empsOrderStats: [],
      };
    case GET_EMPS_ORDER_STATS_SUCCESS:
      return {
        loading: false,
        empsOrderStats: action.payload.table,
      };

    case GET_EMPS_ORDER_STATS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_EMPS_ORDER_STATS_RESET:
      return {
        loading: false,
        error: '',
        empsOrderStats: [],
      };

    default:
      return state;
  }
};

export const getEmpsCommStatsReducer = (
  state = { empsCommStats: {} },
  action
) => {
  switch (action.type) {
    case GET_EMPS_COMM_STATS_REQUEST:
      return {
        loading: true,
        empsCommStats: {},
      };
    case GET_EMPS_COMM_STATS_SUCCESS:
      return {
        loading: false,
        empsCommStats: action.payload.table[0],
      };

    case GET_EMPS_COMM_STATS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_EMPS_COMM_STATS_RESET:
      return {
        loading: false,
        error: '',
        empsCommStats: {},
      };

    default:
      return state;
  }
};

export const getEmpsPaidStatsReducer = (
  state = { empsPaidStats: [] },
  action
) => {
  switch (action.type) {
    case GET_EMPS_PAID_STATS_REQUEST:
      return {
        loading: true,
        empsPaidStats: [],
      };
    case GET_EMPS_PAID_STATS_SUCCESS:
      return {
        loading: false,
        empsPaidStats: action.payload.table,
      };

    case GET_EMPS_PAID_STATS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_EMPS_PAID_STATS_RESET:
      return {
        loading: false,
        error: '',
        empsPaidStats: [],
      };

    default:
      return state;
  }
};

export const addEmpReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EMP_REQUEST:
      return { loading: true };
    case ADD_EMP_SUCCESS:
      return {
        loading: false,
        success: true,
        // EMPS: action.payload.table,
      };
    case ADD_EMP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_EMP_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteEmpReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EMP_REQUEST:
      return { loading: true };
    case DELETE_EMP_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_EMP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_EMP_RESET:
      return {};
    default:
      return state;
  }
};

export const updateEmpReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EMP_REQUEST:
      return { loading: true };
    case UPDATE_EMP_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_EMP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_EMP_RESET:
      return {};
    default:
      return state;
  }
};

export const setCurrentEmpReducer = (state = { currentEmp: {} }, action) => {
  switch (action.type) {
    case SET_CURRENT_EMP:
      return {
        currentEmp: action.payload,
      };
    case SET_CURRENT_EMP_RESET:
      return {
        currentEmp: {},
      };
    default:
      return state;
  }
};

export const blockEmpReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOCK_EMP_REQUEST:
      return { loading: true };
    case UNBLOCK_EMP_REQUEST:
      return { loading: true };
    case BLOCK_EMP_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UNBLOCK_EMP_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case BLOCK_EMP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BLOCK_EMP_RESET:
      return {};
    default:
      return state;
  }
};

export const getReportListReducer = (state = { reportList: [] }, action) => {
  switch (action.type) {
    case GET_REPORT_LIST_REQUEST:
      return {
        loading: true,
        reportList: [],
      };

    case GET_REPORT_LIST_SUCCESS:
      return {
        reportList: action.payload,
        loading: false,
      };

    case GET_REPORT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_REPORT_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const getReportTableReducer = (state = { reportTable: [] }, action) => {
  switch (action.type) {
    case GET_REPORT_TABLE_REQUEST:
      return {
        loading: true,
        reportTable: [],
      };

    case GET_REPORT_TABLE_SUCCESS:
      return {
        reportTable: action.payload,
        loading: false,
      };

    case GET_REPORT_TABLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_REPORT_TABLE_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteReportTableReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REPORT_TABLE_REQUEST:
      return {
        loading: true,
      };

    case DELETE_REPORT_TABLE_SUCCESS:
      return {
        success: true,
        loading: false,
      };

    case DELETE_REPORT_TABLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_REPORT_TABLE_RESET:
      return {};
    default:
      return state;
  }
};

export const addReportTableReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_REPORT_TABLE_REQUEST:
      return {
        loading: true,
      };

    case ADD_REPORT_TABLE_SUCCESS:
      return {
        success: true,
        loading: false,
      };

    case ADD_REPORT_TABLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_REPORT_TABLE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateReportTableReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_REPORT_TABLE_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_REPORT_TABLE_SUCCESS:
      return {
        success: true,
        loading: false,
      };

    case UPDATE_REPORT_TABLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_REPORT_TABLE_RESET:
      return {};
    default:
      return state;
  }
};
