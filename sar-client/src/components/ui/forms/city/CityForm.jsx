import { Button, TextField } from '@mui/material'
import React from 'react'

const CityForm = () => {
  return (
       <form>
          <h2>CityForm</h2>
          <TextField label="اسم المدينة" variant="standard" />
          <Button variant="contained" type="submit">Add</Button>
          <Button variant="outlined" >Edit</Button>
      </form>
  )
}

export default CityForm