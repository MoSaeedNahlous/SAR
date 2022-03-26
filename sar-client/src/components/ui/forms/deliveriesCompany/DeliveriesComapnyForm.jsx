import React from 'react';
import { Button, TextField } from '@mui/material';

const DeliveriesComapnyForm = () => {
  return (
    <form className='text-center'>
      <h2 className='mb-3'>إضافة شركة توصيل</h2>

      <TextField label='اسم الشركة' variant='standard' />
      <button className='btn btn-primary mx-2' type='submit'>
        Add
      </button>
      <button className='btn btn-outline-primary mx-2'>Edit</button>
    </form>
  );
};

export default DeliveriesComapnyForm;
