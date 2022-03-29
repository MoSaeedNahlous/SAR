import {
    ADD_SUBCATEGORY_REQUEST,
  ADD_SUBCATEGORY_RESET,
  DELETE_SUBCATEGORY_FAIL,
  DELETE_SUBCATEGORY_REQUEST,
  DELETE_SUBCATEGORY_RESET,
  DELETE_SUBCATEGORY_SUCCESS,
  GET_SUBCATEGORIES_FAIL,
  GET_SUBCATEGORIES_REQUEST,
  GET_SUBCATEGORIES_RESET,
  GET_SUBCATEGORIES_SUCCESS,
  SET_CURRENT_SUBCATEGORY,
  SET_CURRENT_SUBCATEGORY_RESET,
  UPDATE_SUBCATEGORY_FAIL,
  UPDATE_SUBCATEGORY_REQUEST,
  UPDATE_SUBCATEGORY_RESET,
    UPDATE_SUBCATEGORY_SUCCESS,
  ADD_SUBCATEGORY_FAIL, ADD_SUBCATEGORY_SUCCESS


} from '../constants/subCategoriesConstants';

export const getSubCategoriesReducer = (state = { subCategories: [] }, action) => {
  switch (action.type) {
    case GET_SUBCATEGORIES_REQUEST:
      return { loading: true, subCategories: [] };
    case GET_SUBCATEGORIES_SUCCESS:
      return {
        loading: false,
        subCategories: action.payload.table,
      };
    case GET_SUBCATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const setCurrentSubCategoryReducer = (state = { currentSubCategory: {} }, action) => {
     switch (action.type) {
        case SET_CURRENT_SUBCATEGORY:
            return {
                currentSubCategory: action.payload,
            }
        case SET_CURRENT_SUBCATEGORY_RESET:
             return {
                 currentSubCategory: {}
             }
        default:
            return state
     }
}

export const addSubCategoryReducer = (state = {}, action) => {
     switch (action.type) {
        case ADD_SUBCATEGORY_REQUEST:
            return { loading: true}
        case ADD_SUBCATEGORY_SUCCESS:
            return {
                loading: false,
                success:true,
                // categories: action.payload.table,
            }
        case ADD_SUBCATEGORY_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case ADD_SUBCATEGORY_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const deleteSubCategoryReducer = (state = {}, action) => {
     switch (action.type) {
        case DELETE_SUBCATEGORY_REQUEST:
            return { loading: true}
        case DELETE_SUBCATEGORY_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case DELETE_SUBCATEGORY_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case DELETE_SUBCATEGORY_RESET:
             return {
                 
             }
        default:
            return state
     }
}

export const updateSubCategoryReducer = (state = {}, action) => {
     switch (action.type) {
        case UPDATE_SUBCATEGORY_REQUEST:
            return { loading: true}
        case UPDATE_SUBCATEGORY_SUCCESS:
            return {
                loading: false,
                success:true,
            }
        case UPDATE_SUBCATEGORY_FAIL:
             return {
                 loading: false,
                 error: action.payload
             }
         case UPDATE_SUBCATEGORY_RESET:
             return {
                 
             }
        default:
            return state
     }
}