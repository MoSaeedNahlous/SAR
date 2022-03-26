import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { Button as BsButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_CATEGORY} from '../../../../redux/constants/categoriesConstants'

const CategoryForm = () => {
  const dispatch = useDispatch()
    
    const currentCategory = useSelector(state => state.setCurrentCategory)
  const { currentCategory: current } = currentCategory


  
  
  return (
    <form className='text-center mb-4'>
      <h2 className='mb-3'>صنف جديد</h2>

      <TextField label={ 'اسم الصنف' }
        onChange={
          (e) => dispatch(
            { type: SET_CURRENT_CATEGORY, payload: e.target.value }
          )
        }
        variant='standard'
        value={ current?.catName} />
      <button className='btn btn-primary mx-2'>إضافة</button>
      <button className='btn btn-outline-primary'>تعديل</button>
    </form>
  );
};

export default CategoryForm;
