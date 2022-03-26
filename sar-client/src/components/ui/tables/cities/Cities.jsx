import React from 'react'
import { Button, Checkbox, FormControlLabel } from '@mui/material'

const Cities = ({data}) => {
  return (
    <div>
          <h3 className='text-center fw-bold mb-3 mt-5'>المدن</h3>
          <table className='table table-striped w-75 mx-auto' dir='rtl'>
              <thead>
                  <tr className='bg-primary text-white'>
                      <th>ID</th>
                      <th>المدينة</th>
                      <th className='text-center'>خيارات</th>
                  </tr>
              </thead>
              <tbody>
                  { data.map(cat => (
                      <tr>
                          <td>{ cat.id }</td>
                          <td>{ cat.name }</td>
                          <td className='d-flex justify-content-center'><button className='btn btn-danger mx-2'>حذف</button> <button className='btn btn-primary mx-2'>تعديل</button>
                              <FormControlLabel control={
                  <Checkbox
                      name="Show"
                  />
              } label="إظهار" />
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
          
    </div>
  )
}

export default Cities