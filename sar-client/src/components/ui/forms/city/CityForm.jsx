import { Button, TextField } from '@mui/material'
import React from 'react'

const CityForm = () => {
  return (
       <form className='text-center my-3'>
          <h2 className='fw-bolder mt-5 mb-3'>أضف مدينة</h2>
          <TextField label="اسم المدينة" variant="standard" />
          <button className='btn btn-primary mx-2' type="submit">إضافة</button>
          <button className='btn btn-outline-primary mx-2' type="button">تعديل</button>
      </form>
  )
}

export default CityForm