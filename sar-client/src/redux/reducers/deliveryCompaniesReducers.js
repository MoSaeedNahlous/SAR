import {
    GET_DELIVERY_COMPANIES_FAIL,
    GET_DELIVERY_COMPANIES_REQUEST,
    GET_DELIVERY_COMPANIES_RESET,
    GET_DELIVERY_COMPANIES_SUCCESS,
    SET_CURRENT_DELIVERY_COMPANY,
    SET_CURRENT_DELIVERY_COMPANY_RESET,
    ADD_DELIVERY_COMPANY_FAIL, ADD_DELIVERY_COMPANY_REQUEST, ADD_DELIVERY_COMPANY_RESET, ADD_DELIVERY_COMPANY_SUCCESS,
    DELETE_DELIVERY_COMPANY_REQUEST, DELETE_DELIVERY_COMPANY_SUCCESS, DELETE_DELIVERY_COMPANY_FAIL,
    DELETE_DELIVERY_COMPANY_RESET, UPDATE_DELIVERY_COMPANY_REQUEST, UPDATE_DELIVERY_COMPANY_SUCCESS
    , UPDATE_DELIVERY_COMPANY_FAIL, UPDATE_DELIVERY_COMPANY_RESET, HIDE_DELIVERY_COMPANY_SUCCESS, HIDE_DELIVERY_COMPANY_REQUEST, SHOW_DELIVERY_COMPANY_REQUEST, SHOW_DELIVERY_COMPANY_SUCCESS
} from '../constants/deliveryCompaniesConstants'

export const getDeliveryCompaniesReducer = (state = { deliveryCompanies: [] }, action) => {
    switch (action.type) {
         
        case GET_DELIVERY_COMPANIES_REQUEST:
             return {
                 loading: true,
                 deliveryCompanies: []
            }
        
        case GET_DELIVERY_COMPANIES_SUCCESS:
            return {
                loading: false,
                deliveryCompanies: action.payload.table,
            }
        
        case GET_DELIVERY_COMPANIES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
         
        case HIDE_DELIVERY_COMPANY_REQUEST:
             return {
                 ...state,
                 loading: true
             }
         
        case HIDE_DELIVERY_COMPANY_SUCCESS:
             return {
                loading:false,
                deliveryCompanies: state.deliveryCompanies.map(
                    (DC) => {
                        if (DC.deliveryID == action.payload) {
                            DC.state = 'deleted'
                        } 
                        return DC
                    }
                )
            }
        case SHOW_DELIVERY_COMPANY_REQUEST:
             return {
                 ...state,
                 loading: true
             }
         
        case SHOW_DELIVERY_COMPANY_SUCCESS:
             return {
                loading:false,
                deliveryCompanies: state.deliveryCompanies.map(
                    (DC) => {
                        if (DC.deliveryID == action.payload) {
                            DC.state = '1'
                        } 
                        return DC
                    }
                )
            }
        default:
            return state
     }
}

export const addDeliveryCompanyReducer = (state = {}, action) => {
     switch (action.type) {
        case ADD_DELIVERY_COMPANY_REQUEST:
            return { loading: true}
        case ADD_DELIVERY_COMPANY_SUCCESS:
            return {
                loading: false,
                success:true,
                // categories: action.payload.table,
            }
        case ADD_DELIVERY_COMPANY_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case ADD_DELIVERY_COMPANY_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const deleteDeliveryCompanyReducer = (state = {}, action) => {
     switch (action.type) {
        case DELETE_DELIVERY_COMPANY_REQUEST:
            return { loading: true}
        case DELETE_DELIVERY_COMPANY_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case DELETE_DELIVERY_COMPANY_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case DELETE_DELIVERY_COMPANY_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const updateDeliveryCompanyReducer = (state = {}, action) => {
     switch (action.type) {
        case UPDATE_DELIVERY_COMPANY_REQUEST:
            return { loading: true}
        case UPDATE_DELIVERY_COMPANY_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case UPDATE_DELIVERY_COMPANY_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case UPDATE_DELIVERY_COMPANY_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const setCurrentDeliveryCompanyReducer = (state = { currentDeliveryCompany: {} }, action) => {
     switch (action.type) {
        case SET_CURRENT_DELIVERY_COMPANY:
            return {
                currentDeliveryCompany: action.payload,
            }
        case SET_CURRENT_DELIVERY_COMPANY_RESET:
             return {
                 currentDeliveryCompany: {}
             }
        default:
            return state
     }
}




