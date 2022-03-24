import React from 'react'
import CategoryForm from '../../../ui/forms/categories/CategoryForm'
import { cats } from '../../../ui/forms/categories/dummy-cats'
import Categories from '../../../ui/tables/categories/Categories'

const AddCategory = () => {
  return (
      <div>
          <h1>Add new Category</h1>
          <CategoryForm />
          <Categories data={cats} />
                  </div>
  )
}

export default AddCategory