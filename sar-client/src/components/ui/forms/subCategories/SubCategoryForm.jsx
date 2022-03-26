import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { cats } from '../categories/dummy-cats'

const SubCategoryForm = () => {
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
          { cats.map((cat) => (
            <MenuItem value={cat.name}>{cat.name}</MenuItem>
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