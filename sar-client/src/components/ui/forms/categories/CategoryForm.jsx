import { Alert, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addNewCategory } from '../../../../redux/actions/categoriesActions'
import { SET_CURRENT_CATEGORY_RESET } from '../../../../redux/constants/categoriesConstants';

const CategoryForm = () => {
  const dispatch = useDispatch()
    
  const currentCategory = useSelector(state => state.setCurrentCategory)
  const { currentCategory: current } = currentCategory

  const addCategorySt = useSelector(state => state.addCategory)
  const { loading:addingLoading ,success, error:addingError } = addCategorySt


  const [name, setName] = useState('')

  useEffect(() => {
    if (current && current.catName) {
      setName(current.catName)
    }
  }, [current])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addNewCategory(name))
    document.getElementById('addCatForm').reset()
    dispatch({type:SET_CURRENT_CATEGORY_RESET})
  }
  

  
  
  return (
    <form className='text-center mb-4' onSubmit={ submitHandler } id='addCatForm'>
      { success && <Alert severity="success">تمت الإضافة بنجاح</Alert> }
      { addingError && <Alert severity="error">{ addingError }</Alert> }
      <h2 className='mb-3'>صنف جديد</h2>
      <TextField
        label={ 'اسم الصنف' }
        onChange={
          (e) => setName(e.target.value)
        }
        variant='standard'
        value={ name }
      />
      <button className='btn btn-primary mx-2' type='submit' disabled={ addingLoading } >
        
        { addingLoading ? <CircularProgress size={ 20 } color='grey' /> : "إضافة" }
      </button>
      <button className='btn btn-outline-primary' disabled={ addingLoading }>تعديل</button>
      
    </form>
    
  );
};

export default CategoryForm;
