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
    <form>
      <h2>SubCategory</h2>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">الصنف الرئيسي</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
        >
          { categoriesList.map((cat) => (
            <MenuItem value={cat.catID}>{cat.catName}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <TextField label="اسم الصنف الفرعي" variant="standard" />
      <br />
      <br />
          <Button variant="contained" type="submit">Add</Button>
          <Button variant="outlined" >Edit</Button>
    </form>
  )
}

export default SubCategoryForm