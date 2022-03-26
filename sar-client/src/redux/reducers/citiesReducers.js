import {
    GET_CITIES_FAIL,
    GET_CITIES_REQUEST,
    GET_CITIES_RESET,
    GET_CITIES_SUCCESS
} from '../constants/citiesConstants'

export const getCitiesReducer = (state = { cities: [] }, action) => {
     switch (action.type) {
        case GET_CITIES_REQUEST:
            return { loading: true, cities: [] }
        case GET_CITIES_SUCCESS:
            return {
                loading: false,
                cities: action.payload.products,
            }
        case GET_CITIES_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
     }
}