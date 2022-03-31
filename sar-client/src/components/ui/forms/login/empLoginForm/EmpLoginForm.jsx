import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import {
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { AccountCircle, Key,LocalPhone } from '@mui/icons-material';
import { login } from '../../../../../redux/actions/authActions';

const EmpLoginForm = () => {

  const dispatch = useDispatch()

  const loginSt = useSelector(state => state.login)
  const { loading ,success, error } = loginSt

  const [formInfo, setFormInfo] = useState({
    mobile1: '',
    password: '',
    rememberMe: false,
  });
  const onChangeHandler = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };
  const onCheckHandler = (e) => {
    setFormInfo({ ...formInfo, rememberMe: e.target.checked });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(formInfo.password,formInfo.mobile1))
  };

  return (
    <form className='text-center mt-5 w-25 mx-auto' onSubmit={submitHandler}>
      <h1 className='mb-4'>تسجيل دخول</h1>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <LocalPhone sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          className='mb-3 w-100'
          id='mobile1'
          label='رقم الجوال'
          value={formInfo.mobile1}
          variant='standard'
          type={'number'}
          name='mobile1'
          onChange={onChangeHandler}
        />
      </Box>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Key sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          className='mb-3 w-100'
          id='password'
          label='كلمة السر'
          value={formInfo.password}
          variant='standard'
          name='password'
          type={'password'}
          onChange={onChangeHandler}
        />
      </Box>

      <div className='mt-4 d-flex justify-content-around'>
      <Button variant="primary" type='submit'>
      دخول
      </Button>
        <FormControlLabel
          control={
            <Checkbox
              name='rememberMe'
              checked={formInfo.rememberMe}
              onClick={onCheckHandler}
            />
          }
          label='تذكرني؟'
        />
      </div>
    </form>
  );
};

export default EmpLoginForm;
