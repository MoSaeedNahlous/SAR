import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../redux/actions/categoriesActions';
import { SET_CURRENT_CATEGORY_RESET,SET_CURRENT_CATEGORY } from '../../../../redux/constants/categoriesConstants';


const SubCategoryForm = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.getCategories);
  const { categories: categoriesList, error, loading } = categories;

  const currentCategory = useSelector((state) => state.setCurrentCategory);
  const { currentCategories: current } = currentCategory;

  const [currentSt, setCurrentSt] = useState()

  useEffect(() => {
    dispatch({type:SET_CURRENT_CATEGORY_RESET})
    dispatch(getCategories());
  }, []);

  

  
  
  return (
    <form className='text-center'>
      <h2 className='text-center mb-3'>الأصناف الفرعية</h2>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">الصنف الرئيسي</InputLabel>
        <Select
          sx={{width: '100%'}}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={ current }
          onChange={(e)=>setCurrentSt(e.target.value)}
        >
          {loading ?
    <CircularProgress />
  : categoriesList.map((cat) => (
            <MenuItem
              key={cat.catID}
            //   onClick={
            //   () => dispatch({ type: SET_CURRENT_CATEGORY, payload: cat })
            // }
              value={ cat.catID }>{ cat.catName }
            </MenuItem>
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