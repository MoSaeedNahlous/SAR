import { Alert, Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProducts } from '../../../redux/actions/productsActions';

const Products = ({ edit }) => {
  const { method, word, subCatId } = useParams();
  const dispatch = useDispatch();
  const productsST = useSelector((state) => state.getProducts);
  const { products, loading, error } = productsST;
  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  useEffect(() => {
    if (!cookies.user) {
      nav('/manager/login', { replace: true });
    }
  }, [cookies.user]);

  useEffect(() => {
    if (subCatId) {
      dispatch(getProducts(null, null, subCatId, edit));
    } else if (method && word) {
      dispatch(getProducts(method, word));
    } else {
      dispatch(getProducts('pCode', word));
    }
  }, [method, word, subCatId]);

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
      <h2 className='text-center'>المنتجات</h2>
      <div className='container mt-4'>
        <div className='row justify-content-around'>
          {products.map((prod) => (
            <div
              className='card  col-md-2 col-sm-6 m-2 text-center'
              style={{ width: '14rem' }}
              key={prod.pid}
            >
              <Link
                to={
                  !edit
                    ? `/products/product/${prod.pid}`
                    : `/products/modify/product/${prod.pid}`
                }
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <img
                  src={
                    prod.images !== null
                      ? '' + prod.images
                      : '/default-prod.png'
                  }
                  className='card-img-top'
                  alt='...'
                />
                <div className='card-body'>
                  <h5 className='card-text'>{prod.catName}</h5>
                  <h4 className='card-title'>{prod.pName}</h4>
                  <h6 className='card-text'>{prod.subCatName}</h6>
                  {prod.quantity && (
                    <p className='card-text'>{prod.quantity}:الكمية</p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
