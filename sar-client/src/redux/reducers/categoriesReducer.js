import {
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_RESET,
    GET_CATEGORIES_SUCCESS
} from '../constants/categoriesConstants'

export const categoriesReducer = (state = { categories: [] }, action) => {
     switch (action.type) {
        case GET_CATEGORIES_REQUEST:
            return { loading: true, categories: [] }
        case GET_CATEGORIES_SUCCESS:
            return {
                loading: false,
                categories: action.payload.products,
            }
        case GET_CATEGORIES_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
     }
}