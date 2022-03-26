import React from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { cities } from '../../tables/cities/dummy-cities'
import { dComs } from '../../tables/deliveriesCosts/dummy-deliveries'

const DeliveryCostForm = () => {
  return (
      <form className='text-center mt-5' dir='rtl'>
      <h2>أجرة التوصيل</h2>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id="demo-simple-select-filled-label">المدينة</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
        >
          { cities.map((city) => (
            <MenuItem value={city.name}>{city.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
          <br />
          <FormControl variant="filled" sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id="demo-simple-select-filled-label">شركة التوصيل</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
        >
          { dComs.map((city) => (
            <MenuItem value={city.name}>{city.name}</MenuItem>
          ))}
        </Select>
          </FormControl>
          <br />
      <TextField label="اجرة التوصيل" variant="standard" sx={{minWidth: '400px'}}/>
      <br />
      <br />
          <button className="btn btn-primary mx-2" type="submit">أضف</button>
          <button className="btn btn-outline-primary mx-2" type="button">تعديل</button>
      </form>
  )
}

export default DeliveryCostForm