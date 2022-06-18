import { Cancel } from '@mui/icons-material';
import { Alert, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../../../redux/actions/categoriesActions';
import { addProduct } from '../../../../redux/actions/productsActions';
import {
  getSizes,
  getSizesTable,
} from '../../../../redux/actions/sizesActions';
import { getSubCategories } from '../../../../redux/actions/subCategoriesActions';
import { getTargets } from '../../../../redux/actions/targetActions';
import { ADD_PRODUCT_RESET } from '../../../../redux/constants/productsConstants';
import { GET_SIZES_TABLE_RESET } from '../../../../redux/constants/sizesConstants';
import classes from '../post/postForm.module.css';

const ProductForm = () => {
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

  const categories = useSelector((state) => state.getCategories);
  const { categories: categoriesList, error, loading } = categories;

  const subCategoriesSt = useSelector((state) => state.getSubCategories);
  const {
    subCategories,
    loading: subCatLoading,
    error: subCatError,
  } = subCategoriesSt;

  const targets = useSelector((state) => state.getTargets);
  const {
    targets: targetsList,
    error: targetError,
    loading: targetLoading,
  } = targets;

  const getSizesSt = useSelector((state) => state.getSizes);
  const { sizes, loading: sizeLoading, error: sizeError, success } = getSizesSt;

  const addProductSt = useSelector((state) => state.addProduct);
  const {
    loading: addLoading,
    error: addError,
    success: addSuccess,
  } = addProductSt;

  const [data, setData] = useState({
    followedID: '',
    catID: '',
    subCatID: '',
    name: '',
    retailPrice: '',
    sellPrice: '',
    code: '',
    notes: '',
  });

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

  const [sizeDataTable, setSizeDataTable] = useState([]);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch({ type: ADD_PRODUCT_RESET });
    dispatch(getCategories(true));
    dispatch(getTargets());
  }, []);

  useEffect(() => {
    if (data.catID) {
      dispatch(getSubCategories(data.catID));
    }
  }, [data.catID]);

  useEffect(() => {
    if (success) {
      modal.style.display = 'block';
    }
  }, [success]);

  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById('myBtn');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName('close')[0];

  // When the user clicks on the button, open the modal
  const openModal = () => {
    if (data.code) {
      var arr = [];
      sizes.map((size) => {
        var row = [];
        row[0] = size.sizeID;
        row[1] = size.sizeName;
        row[2] = 0;
        row[3] = 0;
        row[4] = 0;
        row[5] =
          size.sizeName +
          '_' +
          (Math.floor(Math.random() * 10000) + 1000) +
          '_' +
          data.code;
        row[6] = '';
        row[7] = '';
        row[8] = '';
        row[9] = '';
        arr.push(row);
      });
      setSizeDataTable(
        arr.sort((a, b) => {
          return a.sizeID - b.sizeID;
        })
      );
      modal.style.display = 'block';
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    var img1 = false;
    var img2 = false;
    var img3 = false;

    if (file1 != null) {
      img1 = file1;
    }
    if (file2 != null) {
      img2 = file2;
    }
    if (file3 != null) {
      img3 = file3;
    }

    dispatch(
      addProduct(
        sizeDataTable,
        data.name,
        data.catID,
        data.subCatID,
        data.followedID,
        data.code,
        data.notes,
        img1,
        img2,
        img3
      )
    );
    setData({
      followedID: '',
      catID: '',
      subCatID: '',
      name: '',
      retailPrice: '',
      sellPrice: '',
      code: '',
      notes: '',
    });
    setFile1(null);
    setFile2(null);
    setFile3(null);
    dispatch({ type: GET_SIZES_TABLE_RESET });
  };

  // When the user clicks on <span> (x), close the modal
  const closeModal = () => {
    // var arr =[]
    // sizes.map(size => {
    //   var row = []
    //   row[0] = size.sizeID
    //   row[1] = size.sizeName
    //   row[2] =
    // })
    modal.style.display = 'none';
  };

  // When the user clicks anywhere outside of the modal, close it
  // window.onclick = function(event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // }
  useEffect(() => {
    if (sizes) {
      var arr = [];
      sizes.map((size) => {
        var row = [];
        row[0] = size.sizeID;
        row[1] = size.sizeName;
        row[2] = 0;
        row[3] = 0;
        row[4] = 0;
        row[5] =
          size.sizeName +
          '_' +
          (Math.floor(Math.random() * 10000) + 1000) +
          '_' +
          data.code;
        row[6] = '';
        row[7] = '';
        row[8] = '';
        row[9] = '';
        arr.push(row);
      });
      setSizeDataTable(
        arr.sort((a, b) => {
          return a.sizeID - b.sizeID;
        })
      );
    }
  }, [sizes]);

  const openTable = () => {
    if (data) {
      dispatch(getSizesTable(data.subCatID, data.code));
    }
  };

  return (
    <div className='container'>
      {sizeError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: GET_SIZES_TABLE_RESET });
          }}
        >
          {sizeError}
        </Alert>
      )}
      {addSuccess && (
        <Alert
          variant='success'
          onClose={() => {
            dispatch({ type: ADD_PRODUCT_RESET });
          }}
        >
          "تمت إضافة المنتج"
        </Alert>
      )}
      {addError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: ADD_PRODUCT_RESET });
          }}
        >
          {addError}
        </Alert>
      )}
      {/*  */}
      <div id='myModal' className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>
            &times;
          </span>
          <table className='table table-striped mx-auto w-75' dir='rtl'>
            <thead className='bg-primary text-white'>
              <tr className='py-5'>
                <th>ID</th>
                <th>القياس</th>
                <th>الكمية</th>
                <th>سعر الجملة</th>
                <th>سعر المبيع</th>
                <th>رمز الباركود</th>
              </tr>
            </thead>
            <tbody>
              {sizeDataTable &&
                sizeDataTable.map((size, i) => (
                  <tr className='py-5' key={size[0]}>
                    <td>{i + 1}</td>
                    <td>{size[1]}</td>
                    <td>
                      <input
                        type='number'
                        value={parseInt(size[2])}
                        name='2'
                        onChange={(e) => {
                          var row = sizeDataTable[parseInt(i)];
                          row[2] = parseInt(e.target.value);

                          var otherRows = sizeDataTable.filter(
                            (item) => item[0] != size[0]
                          );

                          otherRows.push(row);
                          setSizeDataTable(
                            otherRows.sort((a, b) => {
                              return a[0] - b[0];
                            })
                          );
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type='number'
                        value={parseInt(size[3])}
                        name='3'
                        onChange={(e) => {
                          var row = sizeDataTable[parseInt(i)];
                          row[3] = e.target.value;

                          var otherRows = sizeDataTable.filter(
                            (item) => item[0] != size[0]
                          );

                          otherRows.push(row);
                          setSizeDataTable(
                            otherRows.sort((a, b) => {
                              return a[0] - b[0];
                            })
                          );
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type='number'
                        value={parseInt(size[4])}
                        name='4'
                        onChange={(e) => {
                          var row = sizeDataTable[parseInt(i)];
                          row[4] = e.target.value;

                          var otherRows = sizeDataTable.filter(
                            (item) => item[0] != size[0]
                          );

                          otherRows.push(row);
                          setSizeDataTable(
                            otherRows.sort((a, b) => {
                              return a[0] - b[0];
                            })
                          );
                        }}
                      />
                    </td>
                    <td>{size[5]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/*  */}
      <form className='mx-auto w-50' dir='rtl' onSubmit={onSubmitHandler}>
        <div className=''>
          <div className='row'>
            <div className='col-lg-4'>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1' className='form-label mt-4'>
                  اسم المنتج{' '}
                </label>
                <input
                  required
                  type='text'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='text'
                  placeholder=''
                  value={data.name}
                  name='name'
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='form-group'>
                <label htmlFor='mainProduct' className='form-label mt-4'>
                  الصنف الرئيسي
                </label>
                <select
                  multiple=''
                  className='form-select'
                  value={data.catID}
                  id='specialFor'
                  name='catID'
                  required
                  onChange={onChangeHandler}
                >
                  {loading ? (
                    <CircularProgress />
                  ) : error ? (
                    <Alert severity='error'>{error}</Alert>
                  ) : (
                    [
                      { catID: '', catName: 'اختار من القائمة' },
                      ...categoriesList,
                    ].map((cat, i) =>
                      i === 0 ? (
                        <option
                          selected
                          disabled
                          hidden
                          key={cat.catID}
                          value={cat.catID}
                        >
                          {cat.catName}
                        </option>
                      ) : (
                        <option key={cat.catID} value={cat.catID}>
                          {cat.catName}
                        </option>
                      )
                    )
                  )}
                </select>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='form-group'>
                <label htmlFor='mainProduct' className='form-label mt-4'>
                  الصنف الفرعي
                </label>
                <select
                  multiple=''
                  className='form-select'
                  value={data.subCatID}
                  id='specialFor'
                  name='subCatID'
                  required
                  onChange={onChangeHandler}
                >
                  {subCategories &&
                    [
                      { subCatID: '', subCatName: 'اختار من القائمة' },
                      ...subCategories,
                    ].map((cat, i) =>
                      i === 0 ? (
                        <option
                          selected
                          disabled
                          hidden
                          key={cat.subCatID}
                          value={cat.subCatID}
                        >
                          {cat.subCatName}
                        </option>
                      ) : (
                        <option key={cat.subCatID} value={cat.subCatID}>
                          {cat.subCatName}
                        </option>
                      )
                    )}
                </select>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='form-group'>
                <label htmlFor='specialFor' className='form-label mt-4'>
                  مخصص للـ
                </label>

                <select
                  className='form-select'
                  id='mainProduct'
                  value={data.followedID}
                  name='followedID'
                  required
                  onChange={onChangeHandler}
                >
                  {targetLoading ? (
                    <CircularProgress />
                  ) : targetError ? (
                    <Alert severity='error'>{error}</Alert>
                  ) : (
                    [
                      { followedID: '', followedName: 'اختار من القائمة' },
                      ...targetsList,
                    ].map((target, i) =>
                      i === 0 ? (
                        <option
                          selected
                          disabled
                          hidden
                          key={target.followedID}
                          value={target.followedID}
                        >
                          {target.followedName}
                        </option>
                      ) : (
                        <option
                          key={target.followedID}
                          value={target.followedID}
                        >
                          {target.followedName}
                        </option>
                      )
                    )
                  )}
                </select>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='form-group'>
                <label htmlFor='wholeSalePrice' className='form-label mt-4'>
                  سعر الجملة
                </label>
                <input
                  required
                  className='form-control'
                  name='retailPrice'
                  value={data.retailPrice}
                  onChange={onChangeHandler}
                  type='number'
                  id='wholeSalePrice'
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='form-group'>
                <label htmlFor='sellPrice' className='form-label mt-4'>
                  سعر المبيع
                </label>
                <input
                  required
                  type='number'
                  className='form-control'
                  id='sellPrice'
                  name='sellPrice'
                  value={data.sellPrice}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='form-group d-flex mt-4'>
                <div>
                  <label htmlFor='trackCode' className='form-label'>
                    كود التتبع{' '}
                  </label>
                  <input
                    className='form-control'
                    name={'code'}
                    value={data.code}
                    onChange={onChangeHandler}
                    type='text'
                    id='trackCode'
                  />
                </div>
                <div className='d-flex flex-column align-item-center justify-content-center me-3'>
                  <button
                    type='button'
                    className='btn btn-primary mb-1 btn-sm'
                    id='myBtn'
                    onClick={openTable}
                    disabled={
                      !data.catID ||
                      !data.code ||
                      !data.subCatID ||
                      !data.followedID
                    }
                  >
                    عرض الجدول
                  </button>
                  <button className='btn btn-outline-primary mt-1 btn-sm'>
                    مسح كل القياسات
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='productDetail' className='form-label mt-4'>
              تفاصيل المنتج
            </label>
            <textarea
              className='form-control'
              value={data.notes}
              name='notes'
              onChange={onChangeHandler}
              type='text'
              id='productDetail'
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='formFile1' className='form-label'>
              صورة المنتج(إلزامية)
            </label>
            <input
              required
              className='form-control'
              type='file'
              id='prod-img-1'
              accept='.png,.jpeg,.jpg'
              onChange={(e) => {
                setFile1(e.target.files[0]);
              }}
            />
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
          <div className='mt-3'>
            <label htmlFor='formFile2' className='form-label'>
              صورة المنتج(إختيارية)
            </label>
            <input
              accept='.png,.jpeg,.jpg'
              className='form-control'
              type='file'
              id='prod-img-2'
              onChange={(e) => {
                setFile2(e.target.files[0]);
              }}
            />
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
          <div className='mt-3'>
            <label htmlFor='formFile3' className='form-label'>
              صورة المنتج(إختيارية)
            </label>
            <input
              accept='.png,.jpeg,.jpg'
              className='form-control'
              type='file'
              id='prod-img-3'
              onChange={(e) => {
                setFile3(e.target.files[0]);
              }}
            />
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
          <button type='submit' className='btn btn-primary mt-3'>
            إضافة
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
