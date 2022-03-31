import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cats } from '../../forms/categories/dummy-cats'

const Sizes = ({ data }) => {
  
  const dispatch = useDispatch()

  const categoriesSt = useSelector(state => state.getCategories)
  const { categories, loading: catLoading, error: catError } = categoriesSt
  
  const subCategoriesSt = useSelector(state => state.getSubCategories)
  const { subCategories, loading: subCatLoading, error: subCatError } = subCategoriesSt
  

  return (
     <div className='text-center mt-3'>
          <h2>القياسات</h2>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 400 }}>
            <InputLabel id="demo-simple-select-filled-label">الصنف الفرعي</InputLabel>
            <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
          >
            { categories.map((cat) => (
              <MenuItem key={cat.catID }value={cat.catID}>{cat.catName}</MenuItem>
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
            { subCategories.map((subCat) => (
              <MenuItem  key={subCat.subCatID} value={subCat.subCatID}>{subCat.subCatName}</MenuItem>
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
                  {/* { data.map(target => (
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
                  ))} */}
              </tbody>
          </table>
      </div>
  )
}

export default Sizes