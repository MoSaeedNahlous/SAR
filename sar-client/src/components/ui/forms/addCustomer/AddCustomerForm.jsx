import { Alert, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewCustomer,
  updateCustomer,
} from '../../../../redux/actions/customersActions';
import {
  ADD_CUSTOMER_RESET,
  SET_CURRENT_CUSTOMER_RESET,
  UPDATE_CUSTOMER_RESET,
} from '../../../../redux/constants/customersConstants';
import { getCities } from '../../../../redux/actions/citiesActions';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const AddCustomerForm = () => {
  const dispatch = useDispatch();

  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  useEffect(() => {
    if (!cookies.user) {
      nav('/manager/login', { replace: true });
    }
  }, [cookies.user]);

  const currentCustomer = useSelector((state) => state.setCurrentCustomer);
  const { currentCustomer: current } = currentCustomer;

  const cities = useSelector((state) => state.getCities);
  const {
    cities: citiesList,
    loading: citiesLoading,
    error: citiesError,
  } = cities;

  const addCustomerSt = useSelector((state) => state.addCustomer);
  const { loading: addingLoading, success, error: addingError } = addCustomerSt;

  const updateCustomerSt = useSelector((state) => state.updateCustomer);
  const {
    success: updateSuccess,
    error: updateError,
    loading: updateLoading,
  } = updateCustomerSt;

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

  useEffect(() => {
    dispatch(getCities());
  }, []);

  useEffect(() => {
    if (current && current.username) {
      setData(current);
    }
  }, [current]);

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
    document.getElementById('addCustomerForm').reset();
    dispatch({ type: SET_CURRENT_CUSTOMER_RESET });
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

  const onClickHandler = () => {
    dispatch(
      updateCustomer(
        current.userId,
        data.username,
        data.address1,
        data.address2,
        data.mobile1,
        data.mobile2,
        data.cityID,
        data.notes,
        data.url
      )
    );
    document.getElementById('addCustomerForm').reset();
    dispatch({ type: SET_CURRENT_CUSTOMER_RESET });
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
    <div className='container'>
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
        {updateSuccess && (
          <Alert
            onClose={() => {
              dispatch({ type: UPDATE_CUSTOMER_RESET });
            }}
          >
            تم التعديل بنجاح
          </Alert>
        )}
        {updateError && (
          <Alert
            severity='error'
            onClose={() => {
              dispatch({ type: UPDATE_CUSTOMER_RESET });
            }}
          >
            {updateError}
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
                >
                  <option disabled selected hidden>
                    اختر مدينة
                  </option>
                  {citiesLoading ? (
                    <CircularProgress />
                  ) : citiesError ? (
                    <Alert severity='error'>{citiesError}</Alert>
                  ) : (
                    citiesList.map((city) => (
                      <option key={city.cityID} value={city.cityID}>
                        {city.cityName}
                      </option>
                    ))
                  )}
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
                />
              </div>
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='notes' className='form-label'>
              ملاحظات
            </label>
            <textarea
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
              disabled={addingLoading || updateLoading || current.userId}
            >
              {addingLoading ? (
                <CircularProgress size={20} color='grey' />
              ) : (
                'إضافة'
              )}
            </button>

            <button
              className='btn btn-outline-primary mt-3 px-5 me-2'
              style={{ width: '200px' }}
              onClick={onClickHandler}
              disabled={addingLoading || updateLoading || !current.userId}
            >
              {updateLoading ? (
                <CircularProgress size={20} color='grey' />
              ) : (
                'تعديل'
              )}
            </button>

            <button
              className='btn btn-info mt-3 px-5 me-2'
              style={{ width: '200px' }}
              onClick={() => {
                dispatch({ type: SET_CURRENT_CUSTOMER_RESET });
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
              }}
              disabled={addingLoading || updateLoading || !current.userId}
            >
              إزالة التحديد
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCustomerForm;
