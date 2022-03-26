import {
    GET_DELIVERY_COMPANIES_FAIL,
    GET_DELIVERY_COMPANIES_REQUEST,
    GET_DELIVERY_COMPANIES_RESET,
    GET_DELIVERY_COMPANIES_SUCCESS
} from '../constants/deliveryCompaniesConstants'

export const getDeliveryCompaniesReducer = (state = { deliveryCompanies: [] }, action) => {
     switch (action.type) {
        case GET_DELIVERY_COMPANIES_REQUEST:
            return { loading: true, deliveryCompanies: [] }
        case GET_DELIVERY_COMPANIES_SUCCESS:
            return {
                loading: false,
                deliveryCompanies: action.payload.table
            }
        case GET_DELIVERY_COMPANIES_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
     }
}