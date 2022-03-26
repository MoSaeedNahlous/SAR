import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { cats } from '../../forms/categories/dummy-cats'

const Sizes = ({data}) => {
  return (
     <div className='text-center mt-3'>
          <h2>القياسات</h2>
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
          <table className='table table-striped w-75 mx-auto mt-4' dir='rtl'>
              <thead className='bg-primary text-white'>
                  <tr>
                      <th>ID</th>
                      <th>الاسم</th>
                      <th>خيارات</th>
                  </tr>
              </thead>
              <tbody>
                  { data.map(target => (
                      <tr>
                          <td>{ target.id }</td>
                          <td>{ target.name }</td>
                          <td><button className='btn btn-danger'>حذف</button> <button className='btn btn-primary'>تعديل</button>
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

export default Sizes