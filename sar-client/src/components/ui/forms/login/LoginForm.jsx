import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { empLogin, managerLogin } from '../../../../redux/actions/authActions';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { LOGIN_RESET } from '../../../../redux/constants/authConstants';

const LoginForm = ({ emp, manager }) => {
  const [cookies, setCookie] = useCookies(['user']);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const authST = useSelector((state) => state.login);
  const { loading, error, user, success } = authST;
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    dispatch({ type: LOGIN_RESET });
  }, []);

  useEffect(() => {
    if (cookies.user) {
      nav('/', { replace: true });
    }
  }, [cookies.user]);

  useEffect(() => {
    if (success) {
      if (user.empId) {
        setCookie('user', `${user.empId}+${user.empType}`, {
          path: '/',
          maxAge: 9999999999,
        });

        nav('/', { replace: true });
      }
    }
  }, [success]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (mobile) {
      dispatch(empLogin(mobile, password, rememberMe));
    } else if (username) {
      dispatch(managerLogin(username, password, rememberMe));
    }
  };

  return (
    <div
      className='container mt-5 w-50 '
      dir='rtl'
      style={{ backgroundColor: '#F7F7F9', borderRadius: '10px' }}
    >
      <div className='w-100 d-flex justify-content-center'>
        <img
          src='/logo.png'
          alt=''
          style={{ width: '50%', margin: '0 auto' }}
        />
      </div>

      <form onSubmit={onSubmitHandler} className='w-75 mx-auto m-1 p-2'>
        {emp && <h3 className='text-center'>تسجيل الدخول للموظفين</h3>}
        {manager && <h3 className='text-center'>تسجيل الدخول للمدير</h3>}
        <div class='form-group mt-4'>
          {emp && (
            <>
              <label>رقم الموبايل</label>
              <input
                type='number'
                class='form-control'
                placeholder='ادخل رقم الموبايل'
                required
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                value={mobile}
              />
            </>
          )}
          {manager && (
            <>
              <label>اسم المستخدم</label>
              <input
                type='text'
                class='form-control'
                placeholder='ادخل اسم المستخدم'
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
              />
            </>
          )}
        </div>
        <div class='form-group mt-4'>
          <label>كلمة المرور</label>
          <input
            type='password'
            class='form-control'
            placeholder='ادخل كلمة المرور'
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        {/* <div class='form-check d-flex justify-content-flex-start'>
          <label class='form-check-label' for='exampleCheck1'>
            تذكرني؟
          </label>
          <input
            type='checkbox'
            onClick={(e) => {
              setRememberMe(e.target.checked);
            }}
            class='form-check-input mx-1'
            checked={rememberMe}
          />
        </div> */}
        <div className='form-group d-flex justify-content-center mt-4'>
          <button type='submit' class='btn btn-primary w-25 p-2'>
            تسجيل الدخول
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
