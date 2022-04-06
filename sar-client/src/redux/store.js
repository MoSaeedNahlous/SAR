import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  addCategoryReducer,
  deleteCategoryReducer,
  getCategoriesReducer,
  setCurrentCategoryReducer,
  updateCategoryReducer,
} from './reducers/categoriesReducers';
import {
  addSubCategoryReducer,
  deleteSubCategoryReducer,
  getSubCategoriesReducer,
  setCurrentSubCategoryReducer,
  updateSubCategoryReducer,
} from './reducers/subCategoriesReducers';
import { loginReducer } from './reducers/authReducers';
import {
  addNewPostReducer,
  getPostsReducer,
  setCurrentPostReducer,
  updatePostReducer,
} from './reducers/postsReudcers';
import { getDeliveryCompaniesReducer } from './reducers/deliveryCompaniesReducers';

import {
  addSizeReducer,
  deleteSizeReducer,
  getSizesReducer,
  setCurrentSizeReducer,
  updateSizeReducer,
} from './reducers/sizesReducers';

import {
  addEmpReducer,
  deleteEmpReducer,
  getEmpsReducer,
  setCurrentEmpReducer,
  updateEmpReducer,
} from './reducers/empsReducers';

import {
  addCityReducer,
  deleteCityReducer,
  getCitiesReducer,
  setCurrentCityReducer,
  updateCityReducer,
} from './reducers/citiesReducers';

import {
  addTargetReducer,
  deleteTargetReducer,
  getTargetsReducer,
  setCurrentTargetReducer,
  updateTargetReducer,
} from './reducers/targetReducers';
const initialState = {};

const reducer = combineReducers({
  getCategories: getCategoriesReducer,
  getSubCategories: getSubCategoriesReducer,
  getPosts: getPostsReducer,
  addPost: addNewPostReducer,
  setCurrentPost: setCurrentPostReducer,
  updatePost: updatePostReducer,
  login: loginReducer,
  getCities: getCitiesReducer,
  addCity: addCityReducer,
  deleteCity: deleteCityReducer,
  setCurrentCity: setCurrentCityReducer,
  updateCity: updateCityReducer,
  getDeliveryCompanies: getDeliveryCompaniesReducer,
  addCategory: addCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  updateCategory: updateCategoryReducer,
  setCurrentCategory: setCurrentCategoryReducer,
  addSubCategory: addSubCategoryReducer,
  deleteSubCategory: deleteSubCategoryReducer,
  updateSubCategory: updateSubCategoryReducer,
  setCurrentSubCategory: setCurrentSubCategoryReducer,
  addTarget: addTargetReducer,
  deleteTarget: deleteTargetReducer,
  getTargets: getTargetsReducer,
  setCurrentTarget: setCurrentTargetReducer,
  updateTarget: updateTargetReducer,
  addSize: addSizeReducer,
  deleteSize: deleteSizeReducer,
  getSizes: getSizesReducer,
  setCurrentSize: setCurrentSizeReducer,
  updateSize: updateSizeReducer,
  addEmp: addEmpReducer,
  deleteEmp: deleteEmpReducer,
  getEmps: getEmpsReducer,
  setCurrentEmp: setCurrentEmpReducer,
  updateEmp: updateEmpReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
