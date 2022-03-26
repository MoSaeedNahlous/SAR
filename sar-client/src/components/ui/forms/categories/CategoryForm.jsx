import { TextField } from '@mui/material';
import React from 'react';
import { Button  as BsButton} from 'react-bootstrap'
const CategoryForm = () => {
  return (
    <form className='text-center mb-4'>
      <h2 className='mb-3'>صنف جديد</h2>

      <TextField label='اسم الصنف' variant='standard' />
      <button className='btn btn-primary mx-2'>إضافة</button>
      <button className='btn btn-outline-primary'>تعديل</button>
    </form>
  );
};

export default CategoryForm;
