import { Alert, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewEmp, updateEmp } from '../../../../redux/actions/empsActions';
import {
  ADD_EMP_RESET,
  SET_CURRENT_EMP_RESET,
  UPDATE_EMP_RESET,
} from '../../../../redux/constants/empConstants';

const EmpForm = () => {
  const dispatch = useDispatch();

  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  useEffect(() => {
    if (!cookies.user) {
      nav('/manager/login', { replace: true });
    }
    if (cookies.user.split('+')[1] !== 'A') {
      nav('/', { replace: true });
    }
  }, [cookies.user]);

  const currentEmp = useSelector((state) => state.setCurrentEmp);
  const { currentEmp: current } = currentEmp;

  const addEmpSt = useSelector((state) => state.addEmp);
  const { loading: addingLoading, success, error: addingError } = addEmpSt;

  const updateEmpSt = useSelector((state) => state.updateEmp);
  const {
    success: updateSuccess,
    error: updateError,
    loading: updateLoading,
  } = updateEmpSt;

  const [data, setData] = useState({
    empId: '',
    empName: '',
    mobile1: '',
    mobile2: '',
    address1: '',
    address2: '',
    cityId: '',
    email: 'test@test.com',
    password: '',
    notes: '',
  });
  useEffect(() => {
    dispatch({ type: SET_CURRENT_EMP_RESET });
    () => {
      dispatch({ type: SET_CURRENT_EMP_RESET });
    };
  }, []);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (current && current.empName) {
      setData(current);
    }
  }, [current]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addNewEmp(
        data.empName,
        data.address1,
        data.address2,
        data.password,
        data.notes,
        data.mobile1,
        data.mobile2,
        data.email
      )
    );
    document.getElementById('addEmpForm').reset();
    dispatch({ type: SET_CURRENT_EMP_RESET });
    setData({
      empId: '',
      empName: '',
      mobile1: '',
      mobile2: '',
      address1: '',
      address2: '',
      cityId: '',
      email: 'test@test.com',
      password: '',
      notes: '',
    });
  };

  const onClickHandler = () => {
    dispatch(
      updateEmp(
        current.empId,
        data.empName,
        data.address1,
        data.address2,
        data.password,
        data.notes,
        data.mobile1,
        data.mobile2,
        data.email
      )
    );
    document.getElementById('addEmpForm').reset();
    dispatch({ type: SET_CURRENT_EMP_RESET });
    setData({
      empId: '',
      empName: '',
      mobile1: '',
      mobile2: '',
      address1: '',
      address2: '',
      cityId: '',
      email: 'test@test.com',
      password: '',
      notes: '',
    });
  };

  return (
    <form
      className='mx-auto w-50'
      dir='rtl'
      id='addEmpForm'
      onSubmit={submitHandler}
    >
      {success && (
        <Alert
          onClose={() => {
            dispatch({ type: ADD_EMP_RESET });
          }}
        >
          تمت الإضافة بنجاح
        </Alert>
      )}
      {addingError && (
        <Alert
          severity="error"
          onClose={() => {
            dispatch({ type: ADD_EMP_RESET });
          }}
        >
          {addingError}
        </Alert>
      )}
      {updateSuccess && (
        <Alert
          onClose={() => {
            dispatch({ type: UPDATE_EMP_RESET });
          }}
        >
          تم التعديل بنجاح
        </Alert>
      )}
      {updateError && (
        <Alert
          severity="error"
          onClose={() => {
            dispatch({ type: UPDATE_EMP_RESET });
          }}
        >
          {updateError}
        </Alert>
      )}

      <div className=''>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='form-group'>
              <label htmlFor='exampleInputEmail1' className='form-label mt-4'>
                اسم المندوب{' '}
              </label>
              <input
                type='text'
                name='empName'
                value={data.empName}
                onChange={onChangeHandler}
                className='form-control'
                id='exampleInputEmail1'
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
              <label htmlFor='firstPhoneNumber' className='form-label mt-4'>
                رقم الجوّال الأول
              </label>
              <input
                type='number'
                name='mobile1'
                value={data.mobile1}
                onChange={onChangeHandler}
                className='form-control'
                aria-describedby='text'
                placeholder=''
                required
              />
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='form-group'>
              <label htmlFor='secondPhoneNumber' className='form-label mt-4'>
                رقم الجوّال الثاني
              </label>
              <input
                name='mobile2'
                value={data.mobile2}
                onChange={onChangeHandler}
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
              <input
                name='address1'
                value={data.address1}
                onChange={onChangeHandler}
                type='text'
                className='form-control'
                aria-describedby='text'
                placeholder=''
                required
              />
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='form-group'>
              <label htmlFor='neighborhood' className='form-label mt-4'>
                الحي
              </label>
              <input
                name='address2'
                value={data.address2}
                onChange={onChangeHandler}
                className='form-control'
                type='text'
              />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-6'>
            <div className='form-group'>
              <label htmlFor='email' className='form-label mt-4'>
                الإيميل
              </label>
              <input
                value={data.email}
                onChange={onChangeHandler}
                name='email'
                type='email'
                className='form-control'
                aria-describedby='text'
                placeholder=''
                required
              />
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='form-group'>
              <label htmlFor='password' className='form-label mt-4'>
                كلمة المرور
              </label>
              <input
                className='form-control'
                value={data.password}
                onChange={onChangeHandler}
                type='text'
                name='password'
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
            className='form-control'
            type='text'
            name='notes'
            value={data.notes}
            onChange={onChangeHandler}
          ></textarea>
        </div>
        <div>
          <button
            type='submit'
            className='btn btn-primary mt-3 px-5 me-2'
            style={{ width: '200px' }}
            disabled={addingLoading || updateLoading || current.empId}
          >
            {addingLoading ? (
              <CircularProgress size={20} color='grey' />
            ) : (
              'إضافة'
            )}
          </button>

          <button
            type='button'
            onClick={onClickHandler}
            className='btn btn-outline-primary mt-3 me-2 px-5'
            style={{ width: '200px' }}
            disabled={addingLoading || updateLoading || !current.empId}
          >
            {updateLoading ? (
              <CircularProgress size={20} color='grey' />
            ) : (
              'تعديل'
            )}
          </button>
          <button
            type='button'
            onClick={() => {
              dispatch({ type: SET_CURRENT_EMP_RESET });
              setData({
                empId: '',
                empName: '',
                mobile1: '',
                mobile2: '',
                address1: '',
                address2: '',
                cityId: '',
                email: 'test@test.com',
                password: '',
                notes: '',
              });
            }}
            className='btn btn-info mt-3 me-2 px-5'
            style={{ width: '200px' }}
            disabled={addingLoading || updateLoading || !current.empId}
          >
            إزالة التحديد
          </button>
        </div>
      </div>
    </form>
  );
};

export default EmpForm;
