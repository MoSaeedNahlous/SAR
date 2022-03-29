import {
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_RESET,
    GET_CATEGORIES_SUCCESS,
    SET_CURRENT_CATEGORY,
    SET_CURRENT_CATEGORY_RESET,
    ADD_CATEGORY_FAIL, ADD_CATEGORY_REQUEST, ADD_CATEGORY_RESET, ADD_CATEGORY_SUCCESS,
    DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_RESET, UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS
    , UPDATE_CATEGORY_FAIL, UPDATE_CATEGORY_RESET, HIDE_CATEGORY_SUCCESS, HIDE_CATEGORY_REQUEST, SHOW_CATEGORY_REQUEST, SHOW_CATEGORY_SUCCESS
} from '../constants/categoriesConstants'

export const getCategoriesReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
         
        case GET_CATEGORIES_REQUEST:
             return {
                 loading: true,
                 categories: []
            }
        
        case GET_CATEGORIES_SUCCESS:
            return {
                loading: false,
                categories: action.payload.table,
            }
        
        case GET_CATEGORIES_FAIL:
             return { loading: false, error: action.payload }
         
        case HIDE_CATEGORY_REQUEST:
             return {
                 ...state,
                 loading: true
             }
         
        case HIDE_CATEGORY_SUCCESS:
             return {
                loading:false,
                categories: state.categories.map(
                    (cat) => {
                        if (cat.catID == action.payload) {
                            cat.cstate = 0
                        } 
                        return cat
                    }
                )
            }
        case SHOW_CATEGORY_REQUEST:
             return {
                 ...state,
                 loading: true
             }
         
        case SHOW_CATEGORY_SUCCESS:
             return {
                loading:false,
                categories: state.categories.map(
                    (cat) => {
                        if (cat.catID == action.payload) {
                            cat.cstate = 1
                        } 
                        return cat
                    }
                )
            }
        default:
            return state
     }
}

export const addCategoryReducer = (state = {}, action) => {
     switch (action.type) {
        case ADD_CATEGORY_REQUEST:
            return { loading: true}
        case ADD_CATEGORY_SUCCESS:
            return {
                loading: false,
                success:true,
                // categories: action.payload.table,
            }
        case ADD_CATEGORY_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case ADD_CATEGORY_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const deleteCategoryReducer = (state = {}, action) => {
     switch (action.type) {
        case DELETE_CATEGORY_REQUEST:
            return { loading: true}
        case DELETE_CATEGORY_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case DELETE_CATEGORY_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case DELETE_CATEGORY_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const updateCategoryReducer = (state = {}, action) => {
     switch (action.type) {
        case UPDATE_CATEGORY_REQUEST:
            return { loading: true}
        case UPDATE_CATEGORY_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case UPDATE_CATEGORY_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case UPDATE_CATEGORY_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const setCurrentCategoryReducer = (state = { currentCategory: {} }, action) => {
     switch (action.type) {
        case SET_CURRENT_CATEGORY:
            return {
                currentCategory: action.payload,
            }
        case SET_CURRENT_CATEGORY_RESET:
             return {
                 currentCategory: {}
             }
        default:
            return state
     }
}




