import {
    ADD_SIZE_FAIL,
    ADD_SIZE_REQUEST,
    ADD_SIZE_RESET,
    ADD_SIZE_SUCCESS,
    DELETE_SIZE_FAIL,
    DELETE_SIZE_REQUEST,
    DELETE_SIZE_RESET,
    DELETE_SIZE_SUCCESS,
    GET_SIZES_FAIL,
    GET_SIZES_REQUEST,
    GET_SIZES_SUCCESS,
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
    

} from "../constants/sizesConstants"



export const getSizesReducer = (state = { sizes: [] }, action) => {
    switch (action.type) {
         
        case GET_SIZES_REQUEST:
             return {
                 loading: true,
                 sizes: []
            }
        
        case GET_SIZES_SUCCESS:
            return {
                loading: false,
                sizes: action.payload.table,
            }
        
        case GET_SIZES_FAIL:
             return { loading: false, error: action.payload }
         
        case HIDE_SIZE_REQUEST:
             return {
                 ...state,
                 loading: true
             }
         
        case HIDE_SIZE_SUCCESS:
             return {
                loading:false,
                // sizes: state.sizes.map(
                //     (cat) => {
                //         if (cat.catID == action.payload) {
                //             cat.cstate = 0
                //         } 
                //         return cat
                //     }
                // )
            }
        case SHOW_SIZE_REQUEST:
             return {
                 ...state,
                 loading: true
             }
         
        case SHOW_SIZE_SUCCESS:
             return {
                loading:false,
                // sizes: state.sizes.map(
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

export const addSizeReducer = (state = {}, action) => {
     switch (action.type) {
        case ADD_SIZE_REQUEST:
            return { loading: true}
        case ADD_SIZE_SUCCESS:
            return {
                loading: false,
                success:true,
                // categories: action.payload.table,
            }
        case ADD_SIZE_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case ADD_SIZE_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const deleteSizeReducer = (state = {}, action) => {
     switch (action.type) {
        case DELETE_SIZE_REQUEST:
            return { loading: true}
        case DELETE_SIZE_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case DELETE_SIZE_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case DELETE_SIZE_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const updateSizeReducer = (state = {}, action) => {
     switch (action.type) {
        case UPDATE_SIZE_REQUEST:
            return { loading: true}
        case UPDATE_SIZE_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case UPDATE_SIZE_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case UPDATE_SIZE_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const setCurrentSizeReducer = (state = { currentSize: {} }, action) => {
     switch (action.type) {
        case SET_CURRENT_SIZE:
            return {
                currentSize: action.payload,
            }
        case SET_CURRENT_SIZE_RESET:
             return {
                 currentSize: {}
             }
        default:
            return state
     }
}

