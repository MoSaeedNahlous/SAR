import React from 'react'
import { cats } from '../../../ui/forms/categories/dummy-cats'
import SubCategoryForm from '../../../ui/forms/subCategories/SubCategoryForm'
import SubCategories from '../../../ui/tables/subCategories/SubCategories'

const AddSubCategory = () => {
  return (
    <div>AddSubCategory
      <SubCategoryForm />
      <SubCategories data={ cats }/>
    </div>
  )
}

export default AddSubCategory