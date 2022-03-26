import {
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_RESET,
    GET_CATEGORIES_SUCCESS,
    SET_CURRENT_CATEGORY,
    SET_CURRENT_CATEGORY_RESET
} from '../constants/categoriesConstants'

export const getCategoriesReducer = (state = { categories: [] }, action) => {
     switch (action.type) {
        case GET_CATEGORIES_REQUEST:
            return { loading: true, categories: [] }
        case GET_CATEGORIES_SUCCESS:
            return {
                loading: false,
                categories: action.payload.table,
            }
        case GET_CATEGORIES_FAIL:
            return { loading: false, error: action.payload }
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
