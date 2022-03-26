import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import {
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { AccountCircle, Key } from '@mui/icons-material';

const EmpLoginForm = () => {
  const [formInfo, setFormInfo] = useState({
    username: '',
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
    // Login http request function go here
  };

  return (
    <form className='text-center mt-5 w-25 mx-auto' onSubmit={submitHandler}>
      <h1 className='mb-4'>تسجيل دخول</h1>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          className='mb-3 w-100'
          id='username'
          label='اسم المستخدم'
          value={formInfo.username}
          variant='standard'
          name='username'
          onChange={onChangeHandler}
        />
      </Box>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Key sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          className='mb-3 w-100'
          d='password'
          label='كلمة السر'
          value={formInfo.passowrd}
          variant='standard'
          name='password'
          type={'password'}
          onChange={onChangeHandler}
        />
      </Box>

      <div className='mt-4 d-flex justify-content-around'>
      <Button variant="primary">
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
