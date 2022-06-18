import {
    GET_DELIVERY_COMPANIES_COST_FAIL,
    GET_DELIVERY_COMPANIES_COST_REQUEST,
    GET_DELIVERY_COMPANIES_COST_RESET,
    GET_DELIVERY_COMPANIES_COST_SUCCESS,
    SET_CURRENT_DELIVERY_COMPANY_COST,
    SET_CURRENT_DELIVERY_COMPANY_COST_RESET,
    ADD_DELIVERY_COMPANY_COST_FAIL, ADD_DELIVERY_COMPANY_COST_REQUEST, ADD_DELIVERY_COMPANY_COST_RESET, ADD_DELIVERY_COMPANY_COST_SUCCESS,
    DELETE_DELIVERY_COMPANY_COST_REQUEST, DELETE_DELIVERY_COMPANY_COST_SUCCESS, DELETE_DELIVERY_COMPANY_COST_FAIL,
    DELETE_DELIVERY_COMPANY_COST_RESET, UPDATE_DELIVERY_COMPANY_COST_REQUEST, UPDATE_DELIVERY_COMPANY_COST_SUCCESS
    , UPDATE_DELIVERY_COMPANY_COST_FAIL, UPDATE_DELIVERY_COMPANY_COST_RESET, HIDE_DELIVERY_COMPANY_COST_SUCCESS, HIDE_DELIVERY_COMPANY_COST_REQUEST, SHOW_DELIVERY_COMPANY_COST_REQUEST, SHOW_DELIVERY_COMPANY_COST_SUCCESS
} from '../constants/deliveryCompaniesCostConstants'

export const getDeliveryCompaniesCostReducer = (state = { deliveryCompaniesCost: [] }, action) => {
    switch (action.type) {
         
        case GET_DELIVERY_COMPANIES_COST_REQUEST:
             return {
                 loading: true,
                 deliveryCompaniesCost: []
            }
        
        case GET_DELIVERY_COMPANIES_COST_SUCCESS:
            return {
                loading: false,
                deliveryCompaniesCost: action.payload.table,
            }
        
        case GET_DELIVERY_COMPANIES_COST_FAIL:
             return { loading: false, error: action.payload }
         
        case HIDE_DELIVERY_COMPANY_COST_REQUEST:
             return {
                 ...state,
                 loading: true
             }
         
        case HIDE_DELIVERY_COMPANY_COST_SUCCESS:
             return {
                loading:false,
                deliveryCompaniesCost: state.deliveryCompaniesCost.map(
                    (dcc) => {
                        if (dcc.costID == action.payload) {
                            dcc.state = "notActive"
                        } 
                        return dcc
                    }
                )
            }
        case SHOW_DELIVERY_COMPANY_COST_REQUEST:
             return {
                 ...state,
                 loading: true
             }
         
        case SHOW_DELIVERY_COMPANY_COST_SUCCESS:
             return {
                loading:false,
                deliveryCompaniesCost: state.deliveryCompaniesCost.map(
                    (dcc) => {
                        if (dcc.costID == action.payload) {
                            dcc.state = 'active'
                        } 
                        return dcc
                    }
                )
            }
        default:
            return state
     }
}

export const addDeliveryCompanyCostReducer = (state = {}, action) => {
     switch (action.type) {
        case ADD_DELIVERY_COMPANY_COST_REQUEST:
            return { loading: true}
        case ADD_DELIVERY_COMPANY_COST_SUCCESS:
            return {
                loading: false,
                success:true,
                // categories: action.payload.table,
            }
        case ADD_DELIVERY_COMPANY_COST_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case ADD_DELIVERY_COMPANY_COST_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const deleteDeliveryCompanyCostReducer = (state = {}, action) => {
     switch (action.type) {
        case DELETE_DELIVERY_COMPANY_COST_REQUEST:
            return { loading: true}
        case DELETE_DELIVERY_COMPANY_COST_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case DELETE_DELIVERY_COMPANY_COST_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case DELETE_DELIVERY_COMPANY_COST_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const updateDeliveryCompanyCostReducer = (state = {}, action) => {
     switch (action.type) {
        case UPDATE_DELIVERY_COMPANY_COST_REQUEST:
            return { loading: true}
        case UPDATE_DELIVERY_COMPANY_COST_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case UPDATE_DELIVERY_COMPANY_COST_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case UPDATE_DELIVERY_COMPANY_COST_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const setCurrentDeliveryCompanyCostReducer = (state = { currentDeliveryCompanyCost: {} }, action) => {
     switch (action.type) {
        case SET_CURRENT_DELIVERY_COMPANY_COST:
            return {
                currentDeliveryCompanyCost: action.payload,
            }
        case SET_CURRENT_DELIVERY_COMPANY_COST_RESET:
             return {
                 currentDeliveryCompanyCost: {}
             }
        default:
            return state
     }
}




