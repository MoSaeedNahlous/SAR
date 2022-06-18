import { Alert, Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../redux/actions/categoriesActions';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProductsCat = ({ edit }) => {
  const dispatch = useDispatch();

  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  useEffect(() => {
    if (!cookies.user) {
      nav('/manager/login', { replace: true });
    }
  }, [cookies.user]);

  const categories = useSelector((state) => state.getCategories);
  const { categories: categoriesList, error, loading } = categories;

  useEffect(() => {
    dispatch(getCategories(edit));
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={100} color='grey' />
      </Box>
    );
  }

  if (error) {
    return <Alert severity='error'>{error}</Alert>;
  }

  return (
    <div>
      <h2 className='text-center'>الأصناف الرئيسية</h2>
      <div className='container mt-4'>
        <div className='row justify-content-around'>
          {categoriesList.map((cat) => (
            <div key={cat.catID} className='folder-container col-md-4 col-sm-6'>
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  textAlign: 'center',
                }}
                to={
                  !edit
                    ? `/products/subcategories/${cat.catID}`
                    : `/products/modify/subcategories/${cat.catID}`
                }
              >
                <strong>{cat.catName}</strong>
                <p>الكمية: {cat.num}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsCat;
