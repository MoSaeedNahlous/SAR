import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getSubCategories,
  getSubCategoriesDisplay,
} from '../../../redux/actions/subCategoriesActions';

const ProductsSubCat = ({ edit }) => {
  let { catId } = useParams();

  const dispatch = useDispatch();

  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  useEffect(() => {
    if (!cookies.user) {
      nav('/manager/login', { replace: true });
    }
  }, [cookies.user]);

  const subCategories = useSelector((state) => state.getSubCategories);
  const { subCategories: subCategoriesList, error, loading } = subCategories;

  useEffect(() => {
    if (edit) {
      dispatch(getSubCategories(catId));
    } else {
      dispatch(getSubCategoriesDisplay(catId));
    }
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={100} color='grey' />
      </Box>
    );
  }

  if (error) return <Alert severity='error'>{error}</Alert>;
  return (
    <div>
      <h2 className='text-center'>الأصناف الفرعية</h2>
      <div className='container mt-4'>
        <div className='row justify-content-around'>
          {subCategoriesList.map((subCat) => (
            <div
              className='folder-container col-md-4 col-sm-6'
              key={subCat.subCatID}
            >
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  textAlign: 'center',
                }}
                to={
                  !edit
                    ? `/products/${subCat.subCatID}`
                    : `/products/modify/${subCat.subCatID}`
                }
              >
                <strong>{subCat.subCatName}</strong>
                <p>الكمية:{edit ? subCat.num : subCat.count1}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSubCat;
