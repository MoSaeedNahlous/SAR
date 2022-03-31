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
    SHOW_EMP_SUCCESS
} from '../constants/empConstants'

export const getEmpsReducer = (state = { emps: [] }, action) => {
    switch (action.type) {
         
        case GET_EMPS_REQUEST:
             return {
                loading: true,
                emps: []
            }
        case GET_EMPS_SUCCESS:
            return {
                loading: false,
                emps: action.payload.table,
            }
        
        case GET_EMPS_FAIL:
             return { loading: false, error: action.payload }
         
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
            return state
     }
}

export const addEmpReducer = (state = {}, action) => {
     switch (action.type) {
        case ADD_EMP_REQUEST:
            return { loading: true}
        case ADD_EMP_SUCCESS:
            return {
                loading: false,
                success:true,
                // EMPS: action.payload.table,
            }
        case ADD_EMP_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case ADD_EMP_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const deleteEmpReducer = (state = {}, action) => {
     switch (action.type) {
        case DELETE_EMP_REQUEST:
            return { loading: true}
        case DELETE_EMP_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case DELETE_EMP_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case DELETE_EMP_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const updateEmpReducer = (state = {}, action) => {
     switch (action.type) {
        case UPDATE_EMP_REQUEST:
            return { loading: true}
        case UPDATE_EMP_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case UPDATE_EMP_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case UPDATE_EMP_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const setCurrentEmpReducer = (state = { currentEmp: {} }, action) => {
     switch (action.type) {
        case SET_CURRENT_EMP:
            return {
                currentEmp: action.payload,
            }
        case SET_CURRENT_EMP_RESET:
             return {
                 currentEmp: {}
             }
        default:
            return state
     }
}




