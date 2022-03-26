import {
  GET_SUBCATEGORIES_FAIL,
  GET_SUBCATEGORIES_REQUEST,
  GET_SUBCATEGORIES_RESET,
  GET_SUBCATEGORIES_SUCCESS,
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
