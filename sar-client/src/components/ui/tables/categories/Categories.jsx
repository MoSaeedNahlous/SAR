import { Button, Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CURRENT_CATEGORY} from '../../../../redux/constants/categoriesConstants'

const Categories = ({ data }) => {

    const dispatch = useDispatch()
    
    const currentCategory = useSelector(state => state.setCurrentCategory)
    const { currentCategory:current } = currentCategory


  return (
      <div>
          <h3 className='text-center mb-3'>الأصناف الرئيسية</h3>
          <table className='table table-striped mx-auto w-75' dir='rtl'>
              <thead className='bg-primary text-white'>
                  <tr className='py-5'>
                      <th>ID</th>
                      <th>الاسم</th>
                      <th className='text-center'>خيارات</th>
                  </tr>
              </thead>
              <tbody>
                  { data.map(cat => (
                      <tr key={cat.catID}>
                          <td>{ cat.catID }</td>
                          <td>{ cat.catName }</td>
                          <td className='d-flex justify-content-center'>
                              <button className='btn btn-danger mx-2'>حذف</button>
                              <button className='btn btn-primary'
                                  onClick={
                                      () => dispatch({ type: SET_CURRENT_CATEGORY,payload:cat }) }
                              >تعديل</button>
                              <FormControlLabel
                                  control={
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

export default Categories