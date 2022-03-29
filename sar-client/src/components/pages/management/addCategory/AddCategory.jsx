import React from 'react';
import CategoryForm from '../../../ui/forms/categories/CategoryForm';
import Categories from '../../../ui/tables/categories/Categories';

{/* #TODO: SHOW OR HIDE CATEGORY */}
const AddCategory = () => {
  return (
    <div>
      <CategoryForm />
      <Categories />
    </div>
  );
};

export default AddCategory;
