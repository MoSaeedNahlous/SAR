import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cats } from '../../../ui/forms/categories/dummy-cats'
import SubCategoryForm from '../../../ui/forms/subCategories/SubCategoryForm'
import SubCategories from '../../../ui/tables/subCategories/SubCategories'
import { SET_CURRENT_SUBCATEGORY_RESET } from '../../../../redux/constants/subCategoriesConstants'
import {getSubCategories } from '../../../../redux/actions/subCategoriesActions'
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'

const AddSubCategory = () => {
  const dispatch = useDispatch()

  const subCategories = useSelector((state) => state.getSubCategories);
  const { subCategories: subCategoriesList, error, loading } = subCategories;

  useEffect(() => {
    dispatch({ type: SET_CURRENT_SUBCATEGORY_RESET })
    dispatch(getSubCategories())
  }, [])

  if (loading) {
    return <Box sx={{ display: 'flex',justifyContent:'center' }}>
      <CircularProgress size={100} color='grey' />
    </Box>
  }
  
  return (
    <div>
      {error && <Alert severity='error'>{error}</Alert>}
      <SubCategoryForm />
      <SubCategories data={ subCategoriesList }/>
    </div>
  )
}

export default AddSubCategory