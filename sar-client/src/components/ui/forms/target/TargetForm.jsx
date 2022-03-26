import { Button, TextField } from '@mui/material'
import React from 'react'

const TargetForm = () => {
  return (
    <form className='text-center mb-4'>
        <h2 className='my-3'>مخصص جديد</h2>

        <TextField label='اسم المخصص' variant='standard' />
        <button className='btn btn-primary mx-2'>إضافة</button>
        <button className='btn btn-outline-primary'>تعديل</button>
    </form>
          
    
  )
}

export default TargetForm