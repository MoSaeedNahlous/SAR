import { Button, TextField } from '@mui/material'
import React from 'react'

const TargetForm = () => {
  return (
      <form>
          <h2>Target</h2>
          <TextField label='اسم المخصص' variant="standard" />
          <Button variant="contained" type="submit">Add</Button>
          <Button variant="outlined" >Edit</Button>
      </form>
          
    
  )
}

export default TargetForm