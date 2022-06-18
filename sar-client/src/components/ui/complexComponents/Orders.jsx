import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterOrders,
  getOrdersByBill,
  getOrdersById,
  getOrdersByPhoneNumber,
} from '../../../redux/actions/ordersActions';
import './orders.css';
import { format } from 'date-fns';
import { Alert, Box, CircularProgress } from '@mui/material';
import { GET_ORDERS_RESET } from '../../../redux/constants/ordersConstants';
import {
  getEmpsCommStats,
  getEmpsList,
  getEmpsOneStats,
  getEmpsOrderStats,
  getEmpsPaidStats,
} from '../../../redux/actions/empsActions';
import {
  GET_EMPS_COMM_STATS_RESET,
  GET_EMPS_LIST_RESET,
  GET_EMPS_ONE_STATS_RESET,
  GET_EMPS_ORDER_STATS_RESET,
  GET_EMPS_PAID_STATS_RESET,
} from '../../../redux/constants/empConstants';
import { GET_DELIVERY_COMPANIES_LIST_RESET } from '../../../redux/constants/deliveryCompaniesConstants';
import { getDeliveryListCompanies } from '../../../redux/actions/deliveryCompaniesActions';
import { useNavigate } from 'react-router-dom';
import { acceptBillGrid, cancelBill } from '../../../redux/actions/billActions';
import {
  GET_BILL_DETAILS_RESET,
  REMOVE_PRODUCT_FROM_BILL_RESET,
} from '../../../redux/constants/billConstants';
import { GET_DELIVERY_COMPANIES_COST_RESET } from '../../../redux/constants/deliveryCompaniesCostConstants';
import { useCookies } from 'react-cookie';

const Orders = ({ empST }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  useEffect(() => {
    if (!cookies.user) {
      nav('/manager/login', { replace: true });
    }
  }, [cookies.user]);

  const getOrdersST = useSelector((state) => state.getOrders);
  const { orders, loading, error } = getOrdersST;

  const getEmpsListST = useSelector((state) => state.getEmpsList);
  const {
    empsList,
    loading: empsListLoading,
    error: empsListError,
  } = getEmpsListST;

  const getDeliveryCompaniesListST = useSelector(
    (state) => state.getDeliveryCompaniesList
  );
  const {
    deliveryCompaniesList,
    loading: DeliveryCompaniesListLoading,
    error: DeliveryCompaniesListError,
  } = getDeliveryCompaniesListST;

  const acceptBillST = useSelector((state) => state.acceptBill);
  const {
    success: acceptBillSuccess,
    loading: acceptBillLoading,
    error: acceptBillError,
  } = acceptBillST;

  const getEmpsOrderStatsST = useSelector((state) => state.getEmpsOrderStats);
  const {
    empsOrderStats,
    loading: getEmpsOrderStatsLoading,
    error: getEmpsOrderStatsError,
  } = getEmpsOrderStatsST;

  const getEmpsOneStatsST = useSelector((state) => state.getEmpsOneStats);
  const {
    empsOneStats,
    loading: getEmpsOneStatsLoading,
    error: getEmpsOneStatsError,
  } = getEmpsOneStatsST;

  const getEmpsCommStatsST = useSelector((state) => state.getEmpsCommStats);
  const {
    empsCommStats,
    loading: getEmpsCommStatsLoading,
    error: getEmpsCommStatsError,
  } = getEmpsCommStatsST;

  const getEmpsPaidStatsST = useSelector((state) => state.getEmpsPaidStats);
  const {
    empsPaidStats,
    loading: getEmpsPaidStatsLoading,
    error: getEmpsPaidStatsError,
  } = getEmpsPaidStatsST;

  const cancelBillST = useSelector((state) => state.cancelBill);
  const {
    success: cancelBillSuccess,
    loading: cancelBillLoading,
    error: cancelBillError,
  } = cancelBillST;

  const [getOrdersBy, setGetOrdersBy] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedEmpId, setSelectedEmpId] = useState(0);
  const [selectedDC, setSelectedDC] = useState(0);
  const [searchMethod, setSearchMethod] = useState('2');

  const [state, setState] = useState('في الانتظار');
  const [date, setDate] = useState('');

  useEffect(() => {
    dispatch({ type: GET_ORDERS_RESET });
    dispatch({ type: GET_EMPS_LIST_RESET });
    dispatch({ type: GET_EMPS_ORDER_STATS_RESET });
    dispatch({ type: GET_EMPS_ONE_STATS_RESET });
    dispatch({ type: GET_EMPS_COMM_STATS_RESET });
    dispatch({ type: GET_EMPS_PAID_STATS_RESET });
    dispatch({ type: GET_DELIVERY_COMPANIES_LIST_RESET });
    if (!empST) {
      dispatch(getEmpsList());
      dispatch(getDeliveryListCompanies());
    }
  }, []);

  useEffect(() => {
    if (!empST) {
      if (selectedEmpId) {
        dispatch(getEmpsOrderStats(selectedEmpId));
        dispatch(getEmpsCommStats(selectedEmpId));
        dispatch(getEmpsPaidStats(selectedEmpId));
        dispatch(getEmpsOneStats(selectedEmpId));
      }
    } else {
      dispatch(getEmpsOrderStats(cookies.user.split('+')[0]));
      dispatch(getEmpsCommStats(cookies.user.split('+')[0]));
      dispatch(getEmpsPaidStats(cookies.user.split('+')[0]));
      dispatch(getEmpsOneStats(cookies.user.split('+')[0]));
    }
  }, [selectedEmpId]);

  useEffect(() => {
    if (!empST) {
      if (!date) {
        dispatch(filterOrders(state, '-', selectedEmpId, selectedDC));
      } else {
        dispatch(filterOrders(state, date, selectedEmpId, selectedDC));
      }
    } else {
      if (!date) {
        dispatch(filterOrders(state, '-', cookies.user.split('+')[0], 0));
      } else {
        dispatch(filterOrders(state, date, cookies.user.split('+')[0], 0));
      }
    }
  }, [state, date, selectedDC, selectedEmpId]);

  const pickHandler = (id) => {
    localStorage.removeItem('currentBillId');
    localStorage.setItem('currentBillId', JSON.stringify(id));
    dispatch({ type: GET_BILL_DETAILS_RESET });
    dispatch({ type: GET_EMPS_LIST_RESET });
    dispatch({ type: GET_DELIVERY_COMPANIES_COST_RESET });
    dispatch({ type: REMOVE_PRODUCT_FROM_BILL_RESET });
    if (!empST) {
      nav('/return-to-current-order');
    } else {
      nav('/return-to-current-order-emp');
    }
  };

  const handelChange = (e) => {
    setSearchMethod(e.target.value);
    setSelectedEmpId(0);
    setSelectedDC(0);
  };

  const onSubmitGetOrders = (e) => {
    e.preventDefault();
    if (getOrdersBy == 1) {
      dispatch(getOrdersByPhoneNumber(phoneNumber));
    } else if (getOrdersBy == 2) {
      dispatch(getOrdersById(phoneNumber));
    } else if (getOrdersBy == 3) {
      dispatch(getOrdersByBill(phoneNumber));
    }
  };

  return (
    <div
      className='container'
      style={{ maxWidth: '95%', margin: '0 auto' }}
      dir='rtl'
    >
      {getEmpsPaidStatsError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: GET_EMPS_PAID_STATS_RESET });
          }}
        >
          {getEmpsPaidStatsError}
        </Alert>
      )}

      {getEmpsOneStatsError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: GET_EMPS_ONE_STATS_RESET });
          }}
        >
          {getEmpsOneStatsError}
        </Alert>
      )}

      {getEmpsCommStatsError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: GET_EMPS_COMM_STATS_RESET });
          }}
        >
          {getEmpsCommStatsError}
        </Alert>
      )}
      {getEmpsOrderStatsError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: GET_EMPS_ORDER_STATS_RESET });
          }}
        >
          {getEmpsOrderStatsError}
        </Alert>
      )}
      {DeliveryCompaniesListError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: GET_DELIVERY_COMPANIES_LIST_RESET });
          }}
        >
          {DeliveryCompaniesListError}
        </Alert>
      )}
      {error && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: GET_ORDERS_RESET });
          }}
        >
          {error}
        </Alert>
      )}
      {empsListError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: GET_EMPS_LIST_RESET });
          }}
        >
          {empsListError}
        </Alert>
      )}
      <h1 className='text-center my-5 fw-bold'>الطلبيات</h1>

      <div className=''>
        <div className='input-group w-50 mx-auto'>
          <label className='form-label ms-3' htmlFor='SearchMethod'>
            طريقة البحث
          </label>
          <select
            className='form-select'
            name='SearchMethod'
            value={searchMethod}
            onChange={handelChange}
          >
            <option value='' disabled>
              __طريقة البحث__
            </option>
            <option value='1'>بحث عن طلبية محددة</option>
            <option value='2'>بحث حسب الحالة</option>
          </select>
        </div>
        {searchMethod && searchMethod == 1 && (
          <div>
            <form
              className='d-flex w-75 mt-4 mx-auto'
              onSubmit={onSubmitGetOrders}
            >
              <div className='input-group'>
                <select
                  className='form-select w-50'
                  required
                  value={getOrdersBy}
                  onChange={(e) => {
                    setGetOrdersBy(e.target.value);
                  }}
                >
                  <option value='' disabled>
                    __طريقة البحث__
                  </option>
                  <option value={1}>رقم الهاتف</option>
                  <option value={2}>رقم الطلبية</option>
                  {!empST && <option value={3}>رقم التتبع</option>}
                </select>
              </div>

              <input
                className='form-control me-2'
                type='text'
                placeholder='.. بحث'
                aria-label='Search'
                required
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              <button className='btn btn-primary mx-3' type='submit'>
                بحث
              </button>
            </form>
          </div>
        )}
        {searchMethod && searchMethod == 2 && (
          <div>
            <form className='mt-4 w-50 mx-auto'>
              <div className='d-flex'>
                <div className='form-group'>
                  <label className='form-label' htmlFor='date'>
                    التاريخ
                  </label>
                  <input
                    type='date'
                    className='form-control'
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                </div>
                <button
                  className='btn btn-primary btn-sm date-btn'
                  onClick={(e) => {
                    e.preventDefault();
                    setDate('');
                  }}
                >
                  عرض كل التواريخ{' '}
                </button>
              </div>
              {!empST && (
                <>
                  <div className='form-group mt-4'>
                    <label className='form-label' htmlFor='employeeSelect'>
                      اختر المندوب
                    </label>
                    <select
                      className='form-select'
                      name='employeeSelect'
                      value={selectedEmpId}
                      onChange={(e) => {
                        setSelectedEmpId(e.target.value);
                      }}
                    >
                      {empsList &&
                        [{ empId: 0, empName: 'اختر مندوب' }, ...empsList].map(
                          (emp) => (
                            <option key={emp.empId} value={emp.empId}>
                              {emp.empName}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                  <div className='form-group mt-4'>
                    <label className='form-label' htmlFor='deliveryComp'>
                      اختر شركة التوصيل
                    </label>
                    <select
                      className='form-select'
                      name='deliveryComp'
                      value={selectedDC}
                      onChange={(e) => {
                        setSelectedDC(e.target.value);
                      }}
                    >
                      {deliveryCompaniesList &&
                        [
                          { deliveryID: 0, deliveryName: 'اختر شركة توصيل' },
                          ...deliveryCompaniesList,
                        ].map((dc) => (
                          <option key={dc.deliveryID} value={dc.deliveryID}>
                            {dc.deliveryName}
                          </option>
                        ))}
                    </select>
                  </div>
                </>
              )}
            </form>
          </div>
        )}
        {searchMethod && searchMethod == 2 && (
          <ul className='nav justify-content-center mt-5'>
            <li className='nav-item' onClick={() => setState('ملغاة')}>
              <span
                className={
                  state === 'ملغاة'
                    ? 'nav-link border bg-success text-white'
                    : 'nav-link border'
                }
                style={{ cursor: 'pointer' }}
              >
                ملغاة
              </span>
            </li>
            <li className='nav-item' onClick={() => setState('غير مكتملة')}>
              <span
                className={
                  state === 'غير مكتملة'
                    ? 'nav-link border bg-success text-white'
                    : 'nav-link border'
                }
                style={{ cursor: 'pointer' }}
              >
                غير مكتملة
              </span>
            </li>
            <li className='nav-item' onClick={() => setState('تم التسليم')}>
              <span
                className={
                  state === 'تم التسليم'
                    ? 'nav-link border bg-success text-white'
                    : 'nav-link border'
                }
                style={{ cursor: 'pointer' }}
              >
                تم التسليم
              </span>
            </li>
            <li className='nav-item' onClick={() => setState('قيد العمل')}>
              <span
                className={
                  state === 'قيد العمل'
                    ? 'nav-link border bg-success text-white'
                    : 'nav-link border'
                }
                style={{ cursor: 'pointer' }}
              >
                قيد العمل
              </span>
            </li>
            <li className='nav-item' onClick={() => setState('في الانتظار')}>
              <span
                className={
                  state === 'في الانتظار'
                    ? 'nav-link border bg-success text-white'
                    : 'nav-link border'
                }
                style={{ cursor: 'pointer' }}
              >
                في الانتظار{' '}
              </span>
            </li>
          </ul>
        )}
      </div>

      {/* Employees Table  */}
      {selectedEmpId != 0 && (
        <div className='employees-container mt-4'>
          <div className='row'>
            <div className='col-xl-6 col-md-12'>
              {getEmpsOrderStatsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress size={100} color='grey' />
                </Box>
              ) : (
                <table className='table table-sm table-striped'>
                  <thead>
                    <th>عدد الطلبيات</th>
                    <th>الحالة</th>
                  </thead>
                  <tbody>
                    {empsOrderStats &&
                      empsOrderStats.map((stat) => (
                        <tr key={stat.state}>
                          <td>{stat.num}</td>
                          <td>{stat.state}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className='col-xl-6 col-md-12'>
              {getEmpsCommStatsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress size={100} color='grey' />
                </Box>
              ) : (
                <table className='table table-sm table-striped table-borderd border-primary'>
                  {empsCommStats && selectedEmpId !== 0 && (
                    <tbody>
                      <tr>
                        <td>مجموع الخصومات</td>
                        <td> {empsCommStats.discount}</td>
                      </tr>
                      <tr>
                        <td>مجموع عمولات من أجور التوصيل</td>
                        <td> {empsCommStats.deliveryComm}</td>
                      </tr>
                      <tr>
                        <td>مجموع العمولات</td>
                        <td> {empsCommStats.purchaseComm}</td>
                      </tr>
                      <tr>
                        <td>مجموع المكافئات</td>
                        <td> {empsCommStats.payOff}</td>
                      </tr>
                      <tr>
                        <td>مجموع النهائية العمولات</td>
                        <td> {empsCommStats.finalComm}</td>
                      </tr>
                    </tbody>
                  )}
                </table>
              )}
            </div>
          </div>

          {selectedEmpId != 0 && (
            <div>
              <div className='mt-5'>
                <div className='table-responsive'>
                  {getEmpsOneStatsLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <CircularProgress size={100} color='grey' />
                    </Box>
                  ) : (
                    <table className='table table-striped table-bordered table-sm'>
                      <thead className='bg-primary text-white'>
                        <th>التاريخ</th>
                        <th>ملاحظات</th>
                        <th>إضافة مبلغ</th>
                        <th>المبلغ المتبقي</th>
                        <th>المبلغ المدفوع</th>
                        <th> مجموع العمولات</th>
                        <th></th>
                      </thead>
                      {empsOneStats && (
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{empsOneStats.remain}</td>
                            <td>{empsOneStats.paid}</td>
                            <td>{empsCommStats.finalComm}</td>
                            <td>
                              <button className='btn btn-sm btn-primary'>
                                فتح
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  )}
                </div>
              </div>

              {selectedEmpId != 0 && (
                <div className='mt-5 w-75 mx-auto'>
                  <div className='table-responsive'>
                    {getEmpsPaidStatsLoading ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress size={100} color='grey' />
                      </Box>
                    ) : (
                      <table className='table table-striped table-bordered table-sm'>
                        <thead className='bg-primary text-white'>
                          <th>ID</th>
                          <th>المبلغ</th>
                          <th>ملاحظات</th>
                          <th>التاريخ</th>
                          <th>خيارات</th>
                        </thead>
                        <tbody>
                          {empsPaidStats &&
                            selectedEmpId != 0 &&
                            empsPaidStats.map((row) => (
                              <tr>
                                <td>{row.id}</td>
                                <td>{row.value}</td>
                                <td>
                                  <input
                                    type='text'
                                    name=''
                                    id=''
                                    value={row.note}
                                  />
                                </td>
                                <td>
                                  <input
                                    type='date'
                                    name=''
                                    id=''
                                    value={format(
                                      new Date(row.date),
                                      'yyyy-MM-dd'
                                    )}
                                  />
                                </td>
                                <td>
                                  <button className='btn btn-sm btn-danger'>
                                    حذف
                                  </button>
                                  <button className='btn btn-sm btn-info'>
                                    تعديل
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Orders Table  */}
      {searchMethod && (
        <div className='table-responsive w-100'>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', m: 4 }}>
              <CircularProgress size={100} color='grey' />
            </Box>
          ) : (
            <table
              className='table table-striped table-hover table-bordered orders-table w-100'
              dir='rtl'
            >
              <thead>
                <th>تاريخ إنشاء الطلبية</th>
                <th>اسم البائع</th>
                <th>شركة التوصيل</th>
                <th>المدينة</th>
                <th>رقم التتبع</th>
                <th>رقم الموبايل</th>
                <th>العنوان</th>
                <th>حالة الطلبية</th>
                <th>اسم الزبون</th>
                <th>رقم الطلبية</th>
                <th>تسلسل</th>
                <th className='text-center'>خيارات</th>
              </thead>

              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order.num}>
                      <td>{format(new Date(order.date), 'h:m a dd/M/yyyy')}</td>
                      <td>{order.empName}</td>
                      <td>{order.deliveryName}</td>
                      <td>{order.cityName}</td>
                      <td>{order.billID}</td>
                      <td>{order.mobile1}</td>
                      <td>{order.address}</td>
                      <td>{order.state}</td>
                      <td>{order.userName}</td>
                      <td>{order.purchaseId}</td>
                      <td>{order.num}</td>
                      <td>
                        <div className='d-flex justify-content-around'>
                          {!empST && (
                            <button
                              className='btn btn-sm btn-primary'
                              disabled={
                                order.state != 'قيد العمل' || acceptBillLoading
                              }
                              onClick={() => {
                                dispatch(acceptBillGrid(order.purchaseId));
                              }}
                            >
                              تم التسليم
                            </button>
                          )}
                          <button
                            className='btn btn-sm btn-danger'
                            disabled={
                              cancelBillLoading || order.state != 'في الانتظار'
                            }
                            onClick={() => {
                              dispatch(cancelBill(order.purchaseId.toString()));
                            }}
                          >
                            إلغاء
                          </button>
                          <button
                            className='btn btn-sm btn-light'
                            onClick={() => pickHandler(order.purchaseId)}
                          >
                            {' '}
                            اختيار{' '}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
