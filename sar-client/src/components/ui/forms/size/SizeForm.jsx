import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { cats } from '../categories/dummy-cats'

const SizeForm = () => {
  return (
      <form className='text-center mt-5' dir='rtl'>
        <h2>القياس</h2>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 400 }}>
          <InputLabel id="demo-simple-select-filled-label">الصنف الرئيسي</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
          >
            { cats.map((cat) => (
              <MenuItem value={cat.name}>{cat.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl variant="filled" sx={{ m: 1, minWidth: 400 }}>
          <InputLabel id="demo-simple-select-filled-label">الصنف الفرعي</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
          >
            { cats.map((cat) => (
              <MenuItem value={cat.name}>{cat.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
            <br />
            <TextField label="اسم القياس" variant="standard" sx={{minWidth: '400px'}}/>
        <br />
        <br />
            <button className='btn btn-outline-primary mx-1' type='button'>تعديل</button>
            <button className='btn btn-primary mx-1' type="submit">إضافة</button>
            
      </form>
  )
}

export default SizeForm