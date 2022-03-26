import { Button, Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

const SubCategories = ({data}) => {
  return (
      <div>
          <table className='table table-striped mx-auto w-75 mt-5' dir='rtl'>
              <thead className='bg-primary text-white'>
                  <tr className='py-5'>
                      <th>ID</th>
                      <th>الاسم</th>
                      <th>الصنف الرئيسي</th>
             
                      <th className='text-center'>خيارات</th>
                  </tr>
              </thead>
              <tbody>
                  { data.map(cat => (
                      <tr>
                          <td>{ cat.id }</td>
                          <td>{ cat.name }</td>
                          <td>{ cat.name }</td>
                          <td className='d-flex justify-content-center'><button className='btn btn-danger mx-2'>حذف</button> <button className='btn btn-primary'>تعديل</button>
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

export default SubCategories