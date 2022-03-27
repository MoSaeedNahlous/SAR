import { Button, Checkbox, CircularProgress, FormControlLabel } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../../../redux/actions/categoriesActions'
import { SET_CURRENT_CATEGORY, SET_CURRENT_CATEGORY_RESET} from '../../../../redux/constants/categoriesConstants'

const Categories = () => {

    const dispatch = useDispatch()
    
    const currentCategory = useSelector(state => state.setCurrentCategory)
    const { currentCategory: current } = currentCategory
    
    const categories = useSelector((state) => state.getCategories);
    const { categories: categoriesList, error, loading } = categories;

    useEffect(() => {
        dispatch({type:SET_CURRENT_CATEGORY_RESET})
        dispatch(getCategories());
    }, []);


    if (loading) {
    return <Box sx={{ display: 'flex',justifyContent:'center' }}>
      <CircularProgress size={100} color='grey' />
    </Box>
  }


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
                  { categoriesList.map(cat => (
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