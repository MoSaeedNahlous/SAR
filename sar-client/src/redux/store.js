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
import {
  addDeliveryCompaniesPaymentsReducer,
  addDeliveryCompanyReducer,
  deleteDeliveryCompaniesPaymentsReducer,
  deleteDeliveryCompanyReducer,
  getDeliveryCompaniesListReducer,
  getDeliveryCompaniesPaymentsReducer,
  getDeliveryCompaniesReducer,
  setCurrentDeliveryCompanyReducer,
  updateDeliveryCompaniesPaymentsReducer,
  updateDeliveryCompanyReducer,
} from './reducers/deliveryCompaniesReducers';

import {
  addSizeReducer,
  deleteSizeReducer,
  getProductSizeReducer,
  getSizesReducer,
  setCurrentSizeReducer,
  updateSizeReducer,
} from './reducers/sizesReducers';

import {
  addEmpReducer,
  addReportTableReducer,
  blockEmpReducer,
  deleteEmpReducer,
  deleteReportTableReducer,
  getEmpsCommStatsReducer,
  getEmpsListReducer,
  getEmpsOneStatsReducer,
  getEmpsOrderStatsReducer,
  getEmpsPaidStatsReducer,
  getEmpsReducer,
  getReportListReducer,
  getReportTableReducer,
  setCurrentEmpReducer,
  updateEmpReducer,
  updateReportTableReducer,
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

import {
  addCustomerReducer,
  deleteCustomerReducer,
  getCustomersReducer,
  setCurrentCustomerReducer,
  updateCustomerReducer,
  blockReducer,
  unBlockReducer,
} from './reducers/customersReducers';

import {
  addDeliveryCompanyCostReducer,
  deleteDeliveryCompanyCostReducer,
  getDeliveryCompaniesCostReducer,
  setCurrentDeliveryCompanyCostReducer,
  updateDeliveryCompanyCostReducer,
} from './reducers/deliveryComapniesCostReducers';

import {
  addProductReducer,
  addProductToOrderReducer,
  checkCartForProductReducer,
  deleteProductReducer,
  getProductReducer,
  getProductsReducer,
  setCurrentProductReducer,
  setCurrentProductSizeReducer,
  updateProductReducer,
} from './reducers/productsReducers';
import { getOrdersReducer } from './reducers/ordesReducers';
import {
  acceptBillReducer,
  barcodeReducer,
  cancelBillReducer,
  getBillDetailsReducer,
  getBillProductsReducer,
  initBillReducer,
  removeProductFromBillReducer,
  restoreBillReducer,
  restoreProductToBillReducer,
  sendBillReducer,
  updateBillProductsReducer,
} from './reducers/billReducers';

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
  getProductSize: getProductSizeReducer,
  setCurrentProductSize: setCurrentProductSizeReducer,
  setCurrentSize: setCurrentSizeReducer,
  updateSize: updateSizeReducer,
  addEmp: addEmpReducer,
  deleteEmp: deleteEmpReducer,
  getEmps: getEmpsReducer,
  getEmpsList: getEmpsListReducer,
  getEmpsOrderStats: getEmpsOrderStatsReducer,
  getEmpsCommStats: getEmpsCommStatsReducer,
  getEmpsOneStats: getEmpsOneStatsReducer,
  getEmpsPaidStats: getEmpsPaidStatsReducer,
  setCurrentEmp: setCurrentEmpReducer,
  updateEmp: updateEmpReducer,
  getDeliveryCompanies: getDeliveryCompaniesReducer,
  getDeliveryCompaniesList: getDeliveryCompaniesListReducer,
  addDeliveryCompany: addDeliveryCompanyReducer,
  deleteDeliveryCompany: deleteDeliveryCompanyReducer,
  updateDeliveryCompany: updateDeliveryCompanyReducer,
  setCurrentDeliveryCompany: setCurrentDeliveryCompanyReducer,
  addCustomer: addCustomerReducer,
  deleteCustomer: deleteCustomerReducer,
  getCustomers: getCustomersReducer,
  setCurrentCustomer: setCurrentCustomerReducer,
  updateCustomer: updateCustomerReducer,
  blockCustomer: blockReducer,
  unBlockCustomer: unBlockReducer,
  addDeliveryCompanyCost: addDeliveryCompanyCostReducer,
  deleteDeliveryCompanyCost: deleteDeliveryCompanyCostReducer,
  getDeliveryCompaniesCost: getDeliveryCompaniesCostReducer,
  setCurrentDeliveryCompanyCost: setCurrentDeliveryCompanyCostReducer,
  updateDeliveryCompanyCost: updateDeliveryCompanyCostReducer,
  addProduct: addProductReducer,
  addProductToOrder: addProductToOrderReducer,
  deleteProduct: deleteProductReducer,
  getProducts: getProductsReducer,
  getProduct: getProductReducer,
  setCurrentProduct: setCurrentProductReducer,
  updateProduct: updateProductReducer,

  getOrders: getOrdersReducer,
  initBill: initBillReducer,
  getBillDetails: getBillDetailsReducer,
  getBillProducts: getBillProductsReducer,
  removeProductFromBill: removeProductFromBillReducer,
  restoreProductToBill: restoreProductToBillReducer,
  cancelBill: cancelBillReducer,
  restoreBill: restoreBillReducer,
  acceptBill: acceptBillReducer,
  barcode: barcodeReducer,
  sendBill: sendBillReducer,
  updateBillProducts: updateBillProductsReducer,
  checkCartForProduct: checkCartForProductReducer,
  blockEmp: blockEmpReducer,
  getDeliveryCompaniesPayments: getDeliveryCompaniesPaymentsReducer,
  deleteDeliveryCompaniesPayments: deleteDeliveryCompaniesPaymentsReducer,
  updateDeliveryCompaniesPayments: updateDeliveryCompaniesPaymentsReducer,
  addDeliveryCompaniesPayments: addDeliveryCompaniesPaymentsReducer,
  getReportList: getReportListReducer,
  getReportTable: getReportTableReducer,
  deleteReportTable: deleteReportTableReducer,
  addReportTable: addReportTableReducer,
  updateReportTable: updateReportTableReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
