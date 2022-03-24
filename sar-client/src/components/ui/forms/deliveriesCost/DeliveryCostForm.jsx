import React from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { cities } from '../../tables/cities/dummy-cities'
import { dComs } from '../../tables/deliveriesCosts/dummy-deliveries'

const DeliveryCostForm = () => {
  return (
      <form>
      <h2>DeliveryCost</h2>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
      <TextField label="اجرة التوصيل" variant="standard" />
      <br />
      <br />
          <Button variant="contained" type="submit">Add</Button>
          <Button variant="outlined" >Edit</Button>
      </form>
  )
}

export default DeliveryCostForm