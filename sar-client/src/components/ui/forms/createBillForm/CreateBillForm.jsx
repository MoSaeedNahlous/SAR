import { Alert, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addNewCustomer,
  blockCustomer,
  getCustomers,
  getCustomersE,
  unBlockCustomer,
} from '../../../../redux/actions/customersActions';
import {
  SET_CURRENT_CUSTOMER,
  SET_CURRENT_CUSTOMER_RESET,
  GET_CUSTOMERS_RESET,
  ADD_CUSTOMER_RESET,
} from '../../../../redux/constants/customersConstants';
// import { } from '../../../../redux/constants/cu'
import { initBill } from '../../../../redux/actions/billActions';
import { INIT_BILL_RESET } from '../../../../redux/constants/billConstants';
import { getCities } from '../../../../redux/actions/citiesActions';
import { useCookies } from 'react-cookie';

const CreateBillForm = ({ emp }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  useEffect(() => {
    if (!cookies.user) {
      nav('/manager/login', { replace: true });
    }
  }, [cookies.user]);

  const customers = useSelector((state) => state.getCustomers);
  const { customers: customersList, error, loading } = customers;

  const initBillST = useSelector((state) => state.initBill);
  const { bill, error: initBillError, loading: initBillLoading } = initBillST;

  const currentCustomer = useSelector((state) => state.setCurrentCustomer);
  const { currentCustomer: current } = currentCustomer;

  const blockCustomerST = useSelector((state) => state.blockCustomer);
  const {
    success: successBlocking,
    error: errorBlocking,
    loading: loadingBlocking,
  } = blockCustomerST;

  const unBlockCustomerST = useSelector((state) => state.unBlockCustomer);
  const {
    success: successUnblocking,
    error: errorUnbocking,
    loading: loadingUnblocking,
  } = unBlockCustomerST;

  const cities = useSelector((state) => state.getCities);
  const {
    cities: citiesList,
    loading: citiesLoading,
    error: citiesError,
  } = cities;

  const addCustomerSt = useSelector((state) => state.addCustomer);
  const { loading: addingLoading, success, error: addingError } = addCustomerSt;

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const [createUser, setCreateUser] = useState(false);

  const [data, setData] = useState({
    username: '',
    address1: '',
    address2: '',
    mobile1: '',
    mobile2: '',
    url: '',
    notes: '',
    cityID: '',
  });

  const searchHandler = (e) => {
    e.preventDefault();
    if (!emp) {
      dispatch(getCustomers(name, mobile));
    } else {
      dispatch(getCustomersE(cookies.user.split('+')[0], name, mobile));
    }

    dispatch({ type: SET_CURRENT_CUSTOMER_RESET });
  };
  useEffect(() => {
    dispatch({ type: INIT_BILL_RESET });
    dispatch({ type: GET_CUSTOMERS_RESET });
  }, []);
  useEffect(() => {
    if (successBlocking || successUnblocking) {
      dispatch(getCustomers(name, mobile));
    }
  }, [successBlocking, successUnblocking]);

  useEffect(() => {
    dispatch({ type: INIT_BILL_RESET });
    dispatch({ type: SET_CURRENT_CUSTOMER_RESET });
    setName('');
    setMobile('');
  }, []);

  useEffect(() => {
    dispatch(getCities());
  }, []);

  const blockHandler = (id) => {
    dispatch(blockCustomer(id));
    dispatch({ type: SET_CURRENT_CUSTOMER_RESET });
  };

  const unblockHandler = (id) => {
    dispatch(unBlockCustomer(id));
    dispatch({ type: SET_CURRENT_CUSTOMER_RESET });
  };

  useEffect(() => {
    if (bill) {
      nav('/return-to-current-order', { replace: true });
      dispatch({ type: INIT_BILL_RESET });
    }
  }, [bill]);

  const createBillHandler = () => {
    dispatch(
      initBill(
        current.userId,
        cookies.user.split('+')[0],
        current.address2,
        current.mobile1,
        current.url
      )
    );
  };

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addNewCustomer(
        data.username,
        data.address1,
        data.address2,
        data.mobile1,
        data.mobile2,
        data.cityID,
        data.notes,
        data.url,
        cookies.user.split('+')[0]
      )
    );
    setData({
      username: '',
      address1: '',
      address2: '',
      mobile1: '',
      mobile2: '',
      url: '',
      notes: '',
      cityID: '',
    });
  };

  return (
    <div className='container w-100'>
      {initBillError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: INIT_BILL_RESET });
          }}
        >
          {initBillError}
        </Alert>
      )}
      <form dir='rtl'>
        <h2 className='text-center'>اختيار زبون</h2>
        <div className='form-group w-50 m-auto my-3'>
          <label for='exampleInputEmail1'>اسم الزبون</label>
          <input
            type='text'
            className='form-control'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className='form-group w-50 m-auto my-3'>
          <label for='exampleInputPassword1'>رقم الزبون الأول أو الثاني</label>
          <input
            type='number'
            className='form-control'
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />
        </div>
        <div className='d-flex justify-content-around mt-2 w-50 mx-auto'>
          <button
            type='button'
            className='btn btn-success'
            onClick={createBillHandler}
            disabled={
              !current.userId ||
              current.isBlocked === 'blocked' ||
              initBillLoading
            }
          >
            {initBillLoading ? (
              <CircularProgress size={20} color='grey' />
            ) : (
              'إنشاء فاتورة'
            )}
          </button>
          <button
            type='button'
            onClick={searchHandler}
            className='btn btn-warning px-4'
          >
            بحث
          </button>
          {current.isBlocked == 'blocked'
            ? !emp && (
                <button
                  type='button'
                  className='btn btn-danger px-4'
                  disabled={!current.userId}
                  onClick={() => unblockHandler(current.userId.toString())}
                >
                  إلغاء الحظر
                </button>
              )
            : cookies.user.split('+')[1] == 'A' && (
                <button
                  type='button'
                  className='btn btn-danger px-4'
                  disabled={!current.userId}
                  onClick={() => blockHandler(current.userId.toString())}
                >
                  حظر
                </button>
              )}
        </div>
        <div className='d-flex justify-content-center align-items-center mt-3  mx-auto'>
          <small className=''>تريد إنشاء حساب زبون جديد؟</small>
          <button
            type='button'
            className='btn btn-info mx-3'
            onClick={() => {
              setCreateUser((prev) => !prev);
            }}
          >
            {createUser ? 'إلغاء' : 'إنشاء حساب'}
          </button>
        </div>
      </form>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={100} color='grey' />
        </Box>
      ) : (
        <div className='table-responsive mt-5' id='tres'>
          {customersList && customersList?.length !== 0 && (
            <table
              className='table table-bordered table-striped mx-auto'
              dir='rtl'
            >
              <thead>
                <tr className='bg-primary text-white'>
                  <th scope='col'>ID</th>
                  <th scope='col'>اسم الزبون</th>
                  <th scope='col'>اسم الحي</th>
                  <th scope='col'>رقم الجوال 1</th>
                  <th scope='col'> الموقع</th>
                  <th scope='col'> حالة الحظر</th>
                  <th scope='col'>ملاحظات</th>
                  <th scope='col'>خيارات</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.9rem' }}>
                {customersList &&
                  customersList.map((customer) => (
                    <tr
                      className={
                        customer.userId == current.userId
                          ? 'bg-warning'
                          : undefined
                      }
                      key={customer.userId}
                    >
                      <td>{customer.userId}</td>
                      <td>{customer.username}</td>
                      <td>{customer.address1}</td>
                      <td>{customer.mobile1}</td>
                      <td>
                        <a href={customer.url} target='_blank'>
                          الموقع
                        </a>
                      </td>
                      <td>
                        {customer.isBlocked == 'blocked'
                          ? 'محظور'
                          : 'غير محظور'}
                      </td>
                      <td>{customer.notes}</td>
                      <td>
                        <div className='d-flex justify-content-around'>
                          <button
                            className='btn btn-info mx-1 btn-sm'
                            onClick={() => {
                              dispatch({
                                type: SET_CURRENT_CUSTOMER,
                                payload: customer,
                              }),
                                document
                                  .getElementById('root')
                                  .scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            تعديل
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
      {createUser && (
        <form
          className='mx-auto w-50'
          dir='rtl'
          id='addCustomerForm'
          onSubmit={submitHandler}
        >
          {success && (
            <Alert
              onClose={() => {
                dispatch({ type: ADD_CUSTOMER_RESET });
              }}
            >
              تمت الإضافة بنجاح
            </Alert>
          )}
          {addingError && (
            <Alert
              severity='error'
              onClose={() => {
                dispatch({ type: ADD_CUSTOMER_RESET });
              }}
            >
              {addingError}
            </Alert>
          )}

          <div className=''>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='form-group'>
                  <label htmlFor='username' className='form-label mt-4'>
                    اسم الزبون{' '}
                  </label>
                  <input
                    value={data.username}
                    onChange={onChangeHandler}
                    name='username'
                    type='text'
                    className='form-control'
                    aria-describedby='text'
                    placeholder=''
                    required
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label htmlFor='mobile1' className='form-label mt-4'>
                    رقم الجوّال الأول
                  </label>
                  <input
                    value={data.mobile1}
                    onChange={onChangeHandler}
                    name='mobile1'
                    type='number'
                    className='form-control'
                    aria-describedby='text'
                    placeholder=''
                    required
                  />
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label htmlFor='mobile2' className='form-label mt-4'>
                    رقم الجوّال الثاني
                  </label>
                  <input
                    value={data.mobile2}
                    onChange={onChangeHandler}
                    name='mobile2'
                    className='form-control'
                    type='number'
                    required
                  />
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label htmlFor='city' className='form-label mt-4'>
                    المدينة
                  </label>
                  <select
                    className='form-select'
                    name='cityID'
                    value={data.cityID}
                    onChange={onChangeHandler}
                    required
                  >
                    <option value=''>اختر مدينة</option>
                    {citiesList &&
                      citiesList.map((city) => (
                        <option key={city.cityID} value={city.cityID}>
                          {city.cityName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label htmlFor='address1' className='form-label mt-4'>
                    الحي
                  </label>
                  <input
                    className='form-control'
                    type='text'
                    name='address1'
                    value={data.address1}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label htmlFor='address2' className='form-label mt-4'>
                    العنوان
                  </label>
                  <input
                    className='form-control'
                    type='text'
                    name='address2'
                    value={data.address2}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label htmlFor='url' className='form-label mt-4'>
                    الموقع
                  </label>
                  <input
                    className='form-control'
                    type='text'
                    name='url'
                    value={data.url}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor='notes' className='form-label'>
                ملاحظات
              </label>
              <textarea
                required
                className='form-control'
                type='text'
                value={data.notes}
                onChange={onChangeHandler}
                name='notes'
              ></textarea>
            </div>
            <div>
              <button
                type='submit'
                className='btn btn-primary mt-3 px-5 me-2'
                style={{ width: '200px' }}
              >
                إضافة
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateBillForm;
