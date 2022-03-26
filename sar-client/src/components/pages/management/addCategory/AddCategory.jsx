import React, { useEffect } from 'react';
import CategoryForm from '../../../ui/forms/categories/CategoryForm';
import { cats } from '../../../ui/forms/categories/dummy-cats';
import Categories from '../../../ui/tables/categories/Categories';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../redux/actions/categoriesActions';
import { Alert, CircularProgress } from '@mui/material';

const AddCategory = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.getCategories);
  const { categories: categoriesList, error, loading } = categories;

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <div>
      {error && <Alert severity='error'>{error}</Alert>}
      <CategoryForm />
      <Categories data={categoriesList} />
    </div>
  );
};

export default AddCategory;
