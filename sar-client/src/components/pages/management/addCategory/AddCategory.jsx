import React, { useEffect } from 'react';
import CategoryForm from '../../../ui/forms/categories/CategoryForm';
import { cats } from '../../../ui/forms/categories/dummy-cats';
import Categories from '../../../ui/tables/categories/Categories';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../redux/actions/categoriesActions';
import { Alert, CircularProgress,Box } from '@mui/material';
import { SET_CURRENT_CATEGORY_RESET } from '../../../../redux/constants/categoriesConstants';

const AddCategory = () => {
  const dispatch = useDispatch();

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
      {error && <Alert severity='error'>{error}</Alert>}
      <CategoryForm />
      <Categories data={categoriesList} />
    </div>
  );
};

export default AddCategory;
