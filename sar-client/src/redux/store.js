import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getCategoriesReducer,setCurrentCategoryReducer } from './reducers/categoriesReducers';
import { getSubCategoriesReducer } from './reducers/subCategoriesReducers';
import { loginReducer } from './reducers/authReducers';
import {  getPostsReducer} from './reducers/postsReudcers';
import { getCitiesReducer } from './reducers/citiesReducers';
import { getDeliveryCompaniesReducer} from './reducers/deliveryCompaniesReducers';

const initialState = {};

const reducer = combineReducers({
  getCategories: getCategoriesReducer,
  getSubCategories: getSubCategoriesReducer,
  getPosts :getPostsReducer,
  login: loginReducer,
  getCities: getCitiesReducer,
  getDeliveryCompanies: getDeliveryCompaniesReducer,
  setCurrentCategory:setCurrentCategoryReducer
  
});

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
