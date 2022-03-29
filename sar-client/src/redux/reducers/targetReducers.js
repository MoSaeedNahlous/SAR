import {
    ADD_TARGET_FAIL,
    ADD_TARGET_REQUEST,
    ADD_TARGET_RESET,
    ADD_TARGET_SUCCESS,
    DELETE_TARGET_FAIL,
    DELETE_TARGET_REQUEST,
    DELETE_TARGET_RESET,
    DELETE_TARGET_SUCCESS,
    GET_TARGETS_FAIL,
    GET_TARGETS_REQUEST,
    GET_TARGETS_SUCCESS,
    HIDE_TARGET_REQUEST,
    HIDE_TARGET_SUCCESS,
    SET_CURRENT_TARGET,
    SET_CURRENT_TARGET_RESET,
    SHOW_TARGET_REQUEST,
    SHOW_TARGET_SUCCESS,
    UPDATE_TARGET_FAIL,
    UPDATE_TARGET_REQUEST,
    UPDATE_TARGET_RESET,
    UPDATE_TARGET_SUCCESS,
    

} from "../constants/targetsConstants"



export const getTargetsReducer = (state = { targets: [] }, action) => {
    switch (action.type) {
         
        case GET_TARGETS_REQUEST:
             return {
                 loading: true,
                 targets: []
            }
        
        case GET_TARGETS_SUCCESS:
            return {
                loading: false,
                targets: action.payload.table,
            }
        
        case GET_TARGETS_FAIL:
             return { loading: false, error: action.payload }
         
        case HIDE_TARGET_REQUEST:
             return {
                 ...state,
                 loading: true
             }
         
        case HIDE_TARGET_SUCCESS:
             return {
                loading:false,
                // targets: state.targets.map(
                //     (cat) => {
                //         if (cat.catID == action.payload) {
                //             cat.cstate = 0
                //         } 
                //         return cat
                //     }
                // )
            }
        case SHOW_TARGET_REQUEST:
             return {
                 ...state,
                 loading: true
             }
         
        case SHOW_TARGET_SUCCESS:
             return {
                loading:false,
                // targets: state.targets.map(
                //     (cat) => {
                //         if (cat.catID == action.payload) {
                //             cat.cstate = 1
                //         } 
                //         return cat
                //     }
                // )
            }
        default:
            return state
     }
}

export const addTargetReducer = (state = {}, action) => {
     switch (action.type) {
        case ADD_TARGET_REQUEST:
            return { loading: true}
        case ADD_TARGET_SUCCESS:
            return {
                loading: false,
                success:true,
                // categories: action.payload.table,
            }
        case ADD_TARGET_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case ADD_TARGET_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const deleteTargetReducer = (state = {}, action) => {
     switch (action.type) {
        case DELETE_TARGET_REQUEST:
            return { loading: true}
        case DELETE_TARGET_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case DELETE_TARGET_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case DELETE_TARGET_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const updateTargetReducer = (state = {}, action) => {
     switch (action.type) {
        case UPDATE_TARGET_REQUEST:
            return { loading: true}
        case UPDATE_TARGET_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case UPDATE_TARGET_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case UPDATE_TARGET_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const setCurrentTargetReducer = (state = { currentTarget: {} }, action) => {
     switch (action.type) {
        case SET_CURRENT_TARGET:
            return {
                currentTarget: action.payload,
            }
        case SET_CURRENT_TARGET_RESET:
             return {
                 currentTarget: {}
             }
        default:
            return state
     }
}

