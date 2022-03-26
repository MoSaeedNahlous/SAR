import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../redux/actions/categoriesActions';
import { cats } from '../categories/dummy-cats'

const SubCategoryForm = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.getCategories);
  const { categories: categoriesList, error, loading } = categories;

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  if (loading) {
    return <CircularProgress />;
  }
  
  return (
    <form className='text-center'>
      <h2 className='text-center mb-3'>الأصناف الفرعية</h2>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">الصنف الرئيسي</InputLabel>
        <Select
          sx={{width: '100%'}}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
        >
          { categoriesList.map((cat) => (
            <MenuItem value={cat.catID}>{cat.catName}</MenuItem>
          ))}
        </Select>
        <TextField  sx={{width: '100%'}} label="اسم الصنف الفرعي" variant="standard" />
      </FormControl>

      <br />
          <button type='button' className='btn btn-outline-primary mx-1'>تعديل</button>
          <button type='submit' className='btn btn-primary mx-1'>إضافة</button>
         
    </form>
  )
}

export default SubCategoryForm