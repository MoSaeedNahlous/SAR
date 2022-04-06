import {
    GET_CITIES_FAIL,
    GET_CITIES_REQUEST,
    GET_CITIES_RESET,
    GET_CITIES_SUCCESS,
    SET_CURRENT_CITY,
    SET_CURRENT_CITY_RESET,
    ADD_CITY_FAIL, ADD_CITY_REQUEST, ADD_CITY_RESET, ADD_CITY_SUCCESS,
    DELETE_CITY_REQUEST, DELETE_CITY_SUCCESS, DELETE_CITY_FAIL,
    DELETE_CITY_RESET, UPDATE_CITY_REQUEST, UPDATE_CITY_SUCCESS
    , UPDATE_CITY_FAIL, UPDATE_CITY_RESET, HIDE_CITY_SUCCESS, HIDE_CITY_REQUEST, SHOW_CITY_REQUEST, SHOW_CITY_SUCCESS
} from '../constants/citiesConstants'

export const getCitiesReducer = (state = { cities: [] }, action) => {
    switch (action.type) {
         
        case GET_CITIES_REQUEST:
             return {
                 loading: true,
                 cities: []
            }
        
        case GET_CITIES_SUCCESS:
            return {
                loading: false,
                cities: action.payload,
            }
        
        case GET_CITIES_FAIL:
             return { loading: false, error: action.payload }
         
        case HIDE_CITY_REQUEST:
             return {
                 ...state,
                 loading: true
             }
         
        case HIDE_CITY_SUCCESS:
             return {
                loading:false,
                cities: state.cities.map(
                    (city) => {
                        if (city.cityID == action.payload) {
                            city.state = 'deleted'
                        } 
                        return city
                    }
                )
            }
        case SHOW_CITY_REQUEST:
             return {
                 ...state,
                 loading: true
             }
         
        case SHOW_CITY_SUCCESS:
             return {
                loading:false,
                cities: state.cities.map(
                    (city) => {
                        if (city.cityID == action.payload) {
                            city.state = '1'
                        } 
                        return city
                    }
                )
            }
        default:
            return state
     }
}

export const addCityReducer = (state = {}, action) => {
     switch (action.type) {
        case ADD_CITY_REQUEST:
            return { loading: true}
        case ADD_CITY_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case ADD_CITY_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case ADD_CITY_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const deleteCityReducer = (state = {}, action) => {
     switch (action.type) {
        case DELETE_CITY_REQUEST:
            return { loading: true}
        case DELETE_CITY_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case DELETE_CITY_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case DELETE_CITY_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const updateCityReducer = (state = {}, action) => {
     switch (action.type) {
        case UPDATE_CITY_REQUEST:
            return { loading: true}
        case UPDATE_CITY_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case UPDATE_CITY_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case UPDATE_CITY_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const setCurrentCityReducer = (state = { currentCity: {} }, action) => {
     switch (action.type) {
        case SET_CURRENT_CITY:
            return {
                currentCity: action.payload,
            }
        case SET_CURRENT_CITY_RESET:
             return {
                 currentCity: {}
             }
        default:
            return state
     }
}




