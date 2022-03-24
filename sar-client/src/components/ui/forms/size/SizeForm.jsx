import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { cats } from '../categories/dummy-cats'

const SizeForm = () => {
  return (
      <form>
      <h2>Size</h2>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
          <TextField label="اسم القياس" variant="standard" />
      <br />
      <br />
          <Button variant="contained" type="submit">Add</Button>
          <Button variant="outlined" >Edit</Button>
      </form>
  )
}

export default SizeForm