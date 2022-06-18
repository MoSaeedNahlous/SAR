import { Alert, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getCategories } from '../../../redux/actions/categoriesActions';
import Barcode from 'react-barcode';
import classes from '../forms/post/postForm.module.css';
import axios from 'axios';
import {
  addProductToOrder,
  getProductManager,
  deleteProduct,
  updateProduct,
  checkCartForProduct,
} from '../../../redux/actions/productsActions';

import {
  ADD_PRODUCT_TO_ORDER_REQUEST,
  ADD_PRODUCT_TO_ORDER_RESET,
  GET_PRODUCT_RESET,
  DELETE_PRODUCT_RESET,
  SET_CURRENT_PRODUCTSIZE,
  SET_CURRENT_PRODUCTSIZE_RESET,
  CHECK_CART_FOR_PRODUCT_REQUEST,
  CHECK_CART_FOR_PRODUCT_RESET,
} from '../../../redux/constants/productsConstants';
import { GET_PRODUCT_SIZE_RESET } from '../../../redux/constants/sizesConstants';
import { useCookies } from 'react-cookie';
import { Cancel } from '@mui/icons-material';

const ProductDetails = ({ showBtn, edit }) => {
  const nav = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  useEffect(() => {
    if (!cookies.user) {
      nav('/manager/login', { replace: true });
    }
  }, [cookies.user]);
  const { pid } = useParams();
  const dispatch = useDispatch();
  const productSizesST = useSelector((state) => state.getProductSize);
  const { sizes, loading, error } = productSizesST;
  const productST = useSelector((state) => state.getProduct);
  const {
    productData,
    productImgs,
    sizesData,
    loading: productLoading,
    error: productError,
  } = productST;
  const deleteProductST = useSelector((state) => state.deleteProduct);
  const {
    success: deleteSuccess,
    loading: deleteLoading,
    error: deleteError,
  } = deleteProductST;

  const updateProductST = useSelector((state) => state.updateProduct);
  const {
    success: updateSuccess,
    loading: updateLoading,
    error: updateError,
  } = updateProductST;

  const addProductToOrderST = useSelector((state) => state.addProductToOrder);
  const {
    success,
    loading: addToOrderLoading,
    error: addToOrderError,
  } = addProductToOrderST;

  const checkCartForProductST = useSelector(
    (state) => state.checkCartForProduct
  );
  const {
    success: checkCartSuccess,
    loading: checkCartLoading,
    error: checkCartError,
  } = checkCartForProductST;

  const [productDataState, setProductDataState] = useState({
    catID: '',
    catName: '',
    followedName: null,
    notes: '',
    pCode: '',
    pName: '',
    pid: '',
    subCatID: '',
    subCatName: '',
  });
  const onChangeHandler = (e) => {
    setProductDataState({
      ...productDataState,
      [e.target.name]: e.target.value,
    });
  };

  const [amount, setAmount] = useState(0);

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

  const [productSizesDataState, setProductSizesDataState] = useState([]);

  const onChangeSizeHandler = (e) => {
    setProductCurrentSizeDataState(
      productSizesDataState.filter(
        (sizeData) => sizeData.sizeID == e.target.value
      )[0]
    );
  };

  const [productCurrentSizeDataState, setProductCurrentSizeDataState] =
    useState({
      sizeID: '',
      sizeName: '',
      prdSizeQuantID: '',
      quantity: '',
      pPrice: '',
      pSelPrice: '',
      pbarcode: '',
    });
  const onChangeHandler2 = (e) => {
    setProductCurrentSizeDataState({
      ...productCurrentSizeDataState,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch({ type: CHECK_CART_FOR_PRODUCT_RESET });
    dispatch({ type: SET_CURRENT_PRODUCTSIZE_RESET });
    dispatch({ type: DELETE_PRODUCT_RESET });
    dispatch({ type: ADD_PRODUCT_TO_ORDER_RESET });
    dispatch({ type: GET_PRODUCT_RESET });
    dispatch(getProductManager(pid, edit));
  }, [pid]);

  useEffect(() => {
    if (productData && productData.pid) {
      setProductDataState(productData);
    }
  }, [productData]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getProductManager(pid, edit));
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      nav(-1, { replace: true });
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (sizesData && sizesData.length > 0) {
      setProductSizesDataState(sizesData);
      setProductCurrentSizeDataState(sizesData[0]);
    }
  }, [sizesData]);

  useEffect(() => {
    if (
      productCurrentSizeDataState.prdSizeQuantID &&
      localStorage.getItem('currentBillId') != null
    ) {
      dispatch(
        checkCartForProduct(
          localStorage.getItem('currentBillId'),
          productCurrentSizeDataState.prdSizeQuantID
        )
      );
    }
  }, [
    productCurrentSizeDataState.prdSizeQuantID,
    localStorage.getItem('currentBillId') != null,
  ]);

  const deleteHandler = () => {
    if (confirm('هل أنت متأكد؟')) {
      dispatch(deleteProduct(pid));
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct(
        productDataState.pName,
        productCurrentSizeDataState.prdSizeQuantID,
        productCurrentSizeDataState.quantity,
        productCurrentSizeDataState.pPrice,
        productCurrentSizeDataState.pSelPrice,
        productDataState.notes
      )
    );
  };

  const addHandler = () => {
    if (localStorage.getItem('currentBillId') != null) {
      dispatch(
        addProductToOrder(
          localStorage.getItem('currentBillId'),
          amount,
          productCurrentSizeDataState.pPrice,
          productCurrentSizeDataState.pSelPrice,
          productCurrentSizeDataState.prdSizeQuantID
        )
      );
    } else {
      alert('لا يوجد طلبية نشطة!');
    }
  };

  if (loading || productLoading || (productData && !productData?.pid)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={100} color='grey' />
      </Box>
    );
  }

  return (
    <div className=' row w-100'>
      {deleteSuccess && (
        <Alert
          onClose={() => {
            dispatch({ type: DELETE_PRODUCT_RESET });
          }}
        >
          تم الحذف بنجاح
        </Alert>
      )}
      {success && (
        <Alert
          onClose={() => {
            dispatch({ type: ADD_PRODUCT_TO_ORDER_RESET });
          }}
        >
          تمت الإضافة بنجاح
        </Alert>
      )}
      {addToOrderError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: ADD_PRODUCT_TO_ORDER_RESET });
          }}
        >
          {addToOrderError}
        </Alert>
      )}
      {deleteError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: DELETE_PRODUCT_RESET });
          }}
        >
          {deleteError}
        </Alert>
      )}
      {productImgs && productImgs.length > 0 ? (
        <div className='col-md-6 col-sm-12 d-flex justify-content-center align-items-center'>
          <div
            id='carouselExampleControls'
            className='carousel slide'
            data-bs-ride='carousel'
          >
            <div className='carousel-inner'>
              {productImgs.map((img, index) => (
                <div
                  className={
                    index === 0 ? 'carousel-item active' : 'carousel-item'
                  }
                >
                  <img
                    src={`${img.column1}`}
                    className='d-block w-100'
                    alt='...'
                  />
                </div>
              ))}
            </div>
            <button
              className='carousel-control-prev'
              type='button'
              data-bs-target='#carouselExampleControls'
              data-bs-slide='prev'
            >
              <span
                className='carousel-control-prev-icon'
                aria-hidden='true'
              ></span>
              <span className='visually-hidden'>Previous</span>
            </button>
            <button
              className='carousel-control-next'
              type='button'
              data-bs-target='#carouselExampleControls'
              data-bs-slide='next'
            >
              <span
                className='carousel-control-next-icon'
                aria-hidden='true'
              ></span>
              <span className='visually-hidden'>Next</span>
            </button>
          </div>
        </div>
      ) : (
        <div className='col-md-6 col-sm-12 d-flex justify-content-center align-items-center p-4'></div>
      )}
      <div
        className='col-md-6 col-sm-12 d-flex flex-column justify-content-around p-4'
        dir='rtl'
      >
        <form id='f-1' onSubmit={updateHandler}>
          <div className='my-4 form-group'>
            {' '}
            <strong>اسم المنتج:</strong>
            {showBtn ? (
              <input
                type='text'
                name='pName'
                className='form-control w-50'
                onChange={onChangeHandler}
                value={productDataState.pName}
              />
            ) : (
              <span className='mx-2'>{productDataState.pName}</span>
            )}
          </div>
          <div className='d-flex my-4 w-75 justify-start align-items-center'>
            <div className='mr-0 ml-3'>
              <strong>الصنف الرئيسي:</strong>
              <span className='mx-2'>{productDataState.catName}</span>
            </div>
            <div className='mx-5 '>
              <strong>الصنف الفرعي:</strong>
              <span className='mx-2'>{productDataState.subCatName}</span>
            </div>
          </div>

          <div className='mt-3'>
            {' '}
            <strong>رقم الموديل:</strong>
            <span className='mx-2'>{productDataState.pCode}</span>
          </div>
          <div className='my-4 form-group'>
            {' '}
            <strong>تفاصيل المنتج:</strong>
            {showBtn ? (
              <>
                <br />

                <textarea
                  cols='10'
                  rows='5'
                  value={productDataState.notes}
                  name='notes'
                  className='form-control'
                  onChange={onChangeHandler}
                ></textarea>
              </>
            ) : (
              <span className='mx-2'>{productDataState.notes}</span>
            )}
          </div>
          <div className='mt-3'>
            <strong>اختار القياس:</strong>
            <select
              className='form-select w-25 mt-1'
              aria-label='Default select example'
              disabled={sizesData && !sizesData.length > 0}
              onChange={onChangeSizeHandler}
              value={productCurrentSizeDataState.sizeID}
            >
              <option disabled> اختر قياس</option>
              {sizesData && sizesData.length > 0 ? (
                sizesData.map((size) => (
                  <option key={size.sizeID} value={size.sizeID}>
                    {size.sizeName}
                  </option>
                ))
              ) : (
                <option selected disabled hidden>
                  لا يوجد قياسات
                </option>
              )}
            </select>
          </div>
          <div className='d-flex my-4 w-75 justify-start align-items-center'>
            <div className='mt-3 form-group mr-0 ml-3'>
              {' '}
              <strong>سعر الجملة:</strong>
              {showBtn ? (
                <input
                  type='number'
                  min='0'
                  className='form-control'
                  value={productCurrentSizeDataState.pPrice}
                  onChange={onChangeHandler2}
                  name='pPrice'
                />
              ) : (
                <span className='mx-2'>
                  {productCurrentSizeDataState.pPrice}
                </span>
              )}
            </div>
            <div className='mt-3 form-group mx-5'>
              {' '}
              <strong>سعر المبيع:</strong>
              {showBtn ? (
                <input
                  type='number'
                  min='0'
                  className='form-control '
                  value={productCurrentSizeDataState.pSelPrice}
                  onChange={onChangeHandler2}
                  name='pSelPrice'
                />
              ) : (
                <span className='mx-2'>
                  {productCurrentSizeDataState.pSelPrice}
                </span>
              )}
            </div>
          </div>

          {showBtn && (
            <>
              <div className='mt-3 form-group'>
                <label htmlFor='formFile1' className='form-label'>
                  صورة المنتج
                </label>
                <input
                  className='form-control w-50'
                  type='file'
                  id='prod-img-1'
                  accept='.png,.jpeg,.jpg'
                  onChange={(e) => {
                    setFile1(e.target.files[0]);
                  }}
                />
                <button
                  disabled={file1 == null}
                  className='btn btn-info'
                  onClick={async () => {
                    try {
                      const formData = new FormData();
                      formData.append('feils', file1);
                      formData.append('pid', pid);
                      formData.append('pic_num', 1);
                      await axios.post('/imageUpdate', formData);
                      dispatch(getProductManager(pid, edit));
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  {' '}
                  تعديل صورة
                </button>
                {file1 && (
                  <div className={classes.shareImgContainer}>
                    <img
                      className={classes.shareImg}
                      src={URL.createObjectURL(file1)}
                      alt='صورة المنتج 1'
                    />
                    <Cancel
                      className={classes.shareCancelImg}
                      fontSize='large'
                      onClick={() => {
                        setFile1(null);
                        document.getElementById('prod-img-1').value = '';
                      }}
                    />
                  </div>
                )}
              </div>
              <div className='mt-3 from-group'>
                <label htmlFor='formFile2' className='form-label'>
                  صورة المنتج
                </label>
                <input
                  accept='.png,.jpeg,.jpg'
                  className='form-control w-50'
                  type='file'
                  id='prod-img-2'
                  onChange={(e) => {
                    setFile2(e.target.files[0]);
                  }}
                />
                <button
                  disabled={file2 == null}
                  className='btn btn-info'
                  onClick={async () => {
                    try {
                      const formData = new FormData();
                      formData.append('feils', file2);
                      formData.append('pid', pid);
                      formData.append('pic_num', 2);
                      await axios.post('/imageUpdate', formData);
                      dispatch(getProductManager(pid, edit));
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  {' '}
                  تعديل صورة
                </button>
                {file2 && (
                  <div className={classes.shareImgContainer}>
                    <img
                      className={classes.shareImg}
                      src={URL.createObjectURL(file2)}
                      alt='صورة المنتج 2'
                    />
                    <Cancel
                      className={classes.shareCancelImg}
                      fontSize='large'
                      onClick={() => {
                        setFile2(null);
                        document.getElementById('prod-img-2').value = '';
                      }}
                    />
                  </div>
                )}
              </div>
              <div className='mt-3 form-group'>
                <label htmlFor='formFile3' className='form-label'>
                  صورة المنتج
                </label>
                <input
                  accept='.png,.jpeg,.jpg'
                  className='form-control w-50'
                  type='file'
                  id='prod-img-3'
                  onChange={(e) => {
                    setFile3(e.target.files[0]);
                  }}
                />
                <button
                  disabled={file3 == null}
                  className='btn btn-info'
                  onClick={async () => {
                    try {
                      const formData = new FormData();
                      formData.append('feils', file3);
                      formData.append('pid', pid);
                      formData.append('pic_num', 3);
                      await axios.post('/imageUpdate', formData);
                      dispatch(getProductManager(pid, edit));
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  {' '}
                  تعديل صورة
                </button>
                {file3 && (
                  <div className={classes.shareImgContainer}>
                    <img
                      className={classes.shareImg}
                      src={URL.createObjectURL(file3)}
                      alt='صورة المنتج 3'
                    />
                    <Cancel
                      className={classes.shareCancelImg}
                      fontSize='large'
                      onClick={() => {
                        setFile3(null);
                        document.getElementById('prod-img-3').value = '';
                      }}
                    />
                  </div>
                )}
              </div>
            </>
          )}
          <div className='mt-3 from-group'>
            <strong>اختار الكمية:</strong>
            {!edit && (
              <input
                type='number'
                className='form-control w-25 mt-1'
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                max={parseInt(productCurrentSizeDataState.availableQuantity)}
              />
            )}
            {showBtn ? (
              <>
                <br />
                {!edit && <p>من </p>}

                <input
                  type='number'
                  className='form-control w-50'
                  value={productCurrentSizeDataState.quantity}
                  onChange={onChangeHandler2}
                  name='quantity'
                />
              </>
            ) : (
              <p>
                من {parseInt(productCurrentSizeDataState.availableQuantity)}
              </p>
            )}
          </div>

          <div className='mt-3'>
            {!edit && (
              <button
                className='btn btn-primary m-3'
                onClick={addHandler}
                disabled={
                  localStorage.getItem('currentBillId') === null ||
                  productCurrentSizeDataState.availableQuantity == 0 ||
                  productCurrentSizeDataState.availableQuantity < amount ||
                  amount == 0 ||
                  checkCartError
                  // data.quantity == 0 ||
                  // data.quantity < amount ||
                  // addToOrderLoading
                }
                // !sizes ||
                // sizes.length == 0 ||
              >
                {checkCartError ? (
                  checkCartError
                ) : addToOrderLoading ? (
                  <CircularProgress size={20} color='grey' />
                ) : (
                  'أضف للطلبية'
                )}
              </button>
            )}
            {showBtn && (
              <div>
                <button
                  onClick={deleteHandler}
                  className='btn btn-danger m-3'
                  disabled={addToOrderLoading || deleteLoading}
                >
                  {deleteLoading ? (
                    <CircularProgress size={20} color='grey' />
                  ) : (
                    'حذف المنتج'
                  )}
                </button>
                <button
                  className='btn btn-warning m-3'
                  type='submit'
                  form='f-1'
                  disabled={addToOrderLoading || updateLoading}
                >
                  {updateLoading ? (
                    <CircularProgress size={20} color='grey' />
                  ) : (
                    'تعديل المنتج'
                  )}
                </button>
              </div>
            )}
          </div>
        </form>
        <Barcode value={productCurrentSizeDataState.pbarcode} />
      </div>
    </div>
  );
};

export default ProductDetails;
