import { Alert, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts0 } from '../../../redux/actions/productsActions';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const OutOfStockProductsGrid = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  useEffect(() => {
    if (!cookies.user) {
      nav('/manager/login', { replace: true });
    }
    if (cookies.user.split('+')[1] !== 'A') {
      nav('/', { replace: true });
    }
  }, [cookies.user]);
  const productsST = useSelector((state) => state.getProducts);
  const { products, loading, error } = productsST;

  useEffect(() => {
    dispatch(getProducts0());
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
      <h2 className='text-center'> المنتجات منتهية الكمية</h2>
      <div className='container mt-4'>
        <div className='row justify-content-around'>
          {products &&
            products.map((prod) => (
              <div
                className='card  col-md-2 col-sm-6 m-2 text-center'
                style={{ width: '14rem' }}
                key={prod.pid}
              >
                <Link
                  to={`/products/out-of-stock/product/${prod.pid}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <img
                    src={
                      prod.images !== null
                        ? `http://sartest.robotic-mind.com/Images/ProductImages/${prod.images}`
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

export default OutOfStockProductsGrid;
