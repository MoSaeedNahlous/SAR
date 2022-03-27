import { Button, Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { SET_CURRENT_SUBCATEGORY} from '../../../../redux/constants/subCategoriesConstants'

const SubCategories = ({ data }) => {
    const dispatch = useDispatch()
  return (
      <div>
          <h3 className='text-center my-3'>الأصناف الفرعية</h3>
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
                  { data.map(subCat => (
                      <tr key={subCat.subCatID}>
                          <td>{ subCat.subCatID }</td>
                          <td>{ subCat.subCatName }</td>
                          <td>{ subCat.catName }</td>
                          <td className='d-flex justify-content-center'>
                              <button className='btn btn-danger mx-2'>حذف</button>
                              <button
                                  className='btn btn-primary'
                                  onClick={
                                      () => dispatch({ type: SET_CURRENT_SUBCATEGORY,payload:subCat }) }
                              >تعديل</button>
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