import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategories,
  hideCategory,
  showCategory,
} from '../../../../redux/actions/categoriesActions';
import {
  getSizes,
  hideSize,
  showSize,
  deleteSize,
} from '../../../../redux/actions/sizesActions';
import { getSubCategories } from '../../../../redux/actions/subCategoriesActions';
import {
  ADD_SIZE_RESET,
  DELETE_SIZE_RESET,
  SET_CURRENT_SIZE,
} from '../../../../redux/constants/sizesConstants';

const Sizes = ({ data }) => {
  const dispatch = useDispatch();

  const categoriesSt = useSelector((state) => state.getCategories);
  const { categories, loading: catLoading, error: catError } = categoriesSt;

  const subCategoriesSt = useSelector((state) => state.getSubCategories);
  const {
    subCategories,
    loading: subCatLoading,
    error: subCatError,
  } = subCategoriesSt;

  const getSizesSt = useSelector((state) => state.getSizes);
  const { sizes, loading: sizeLoading, error: sizeError } = getSizesSt;

  const setCurrentSizeSt = useSelector((state) => state.setCurrentSize);
  const { currentSize } = setCurrentSizeSt;

  const addSizeSt = useSelector((state) => state.addSize);
  const { loading: addingLoading, success, error: addingError } = addSizeSt;

  const updateSizeSt = useSelector((state) => state.updateSize);
  const {
    success: updateSuccess,
    error: updateError,
    loading: updateLoading,
  } = updateSizeSt;

  const deleteSizeSt = useSelector((state) => state.deleteSize);
  const {
    success: deleteSuccess,
    error: deleteError,
    loading: deleteLoading,
  } = deleteSizeSt;

  const [currCatId, setCurrCatId] = useState('');
  const [currSubCatId, setSubCurrCatId] = useState('');
  const [currSizeName, setCurrSizeName] = useState('');

  useEffect(() => {
    dispatch(getCategories(true));
  }, []);

  // useEffect(() => {
  //   if (currentSize) {
  //     setCurrCatId(currentSize.catID)
  //     setSubCurrCatId(currentSize.subCatID)
  //     setCurrSizeName(currentSize.sizeName)
  //   }
  // }, [currentSize])

  useEffect(() => {
    if (currCatId) {
      dispatch(getSubCategories(currCatId));
    }
  }, [currCatId]);

  useEffect(() => {
    if (currSubCatId) {
      dispatch(getSizes(currSubCatId));
    }
  }, [currSubCatId]);

  const onChangeHandler = (e) => {
    setCurrCatId(e.target.value);
  };

  const onChangeHandler2 = (e) => {
    setSubCurrCatId(e.target.value);
  };

  useEffect(() => {
    if (success || updateSuccess || deleteSuccess) {
      dispatch({ type: ADD_SIZE_RESET });
      setCurrCatId('');
      setSubCurrCatId('');
    }
  }, [success, updateSuccess, deleteSuccess]);

  const showHandler = (id) => {
    dispatch(showSize(id));
  };

  const hideHandler = (id) => {
    dispatch(hideSize(id));
  };

  const deleteHandler = (id) => {
    if (confirm('هل أنت متأكد؟')) {
      dispatch(deleteSize(id));
    }
  };

  if (sizeLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={100} color='grey' />
      </Box>
    );
  }

  if (sizeError) {
    return <Alert severity='error'>{sizeError}</Alert>;
  }

  return (
    <div className='text-center mt-3'>
      {sizeError && <Alert severity='error'>{sizeError}</Alert>}
      {deleteSuccess && (
        <Alert
          onClose={() => {
            dispatch({ type: DELETE_SIZE_RESET });
          }}
        >
          تم الحذف بنجاح
        </Alert>
      )}
      {deleteError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: DELETE_SIZE_RESET });
          }}
        >
          {deleteError}
        </Alert>
      )}
      <h2>القياسات</h2>
      <FormControl variant='filled' sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id='demo-simple-select-filled-label'>
          الصنف الرئيسي
        </InputLabel>
        <Select
          labelId='demo-simple-select-filled-label'
          id='demo-simple-select-filled'
          value={currCatId}
          onChange={onChangeHandler}
        >
          {catLoading ? (
            <CircularProgress size={100} color='grey' />
          ) : catError ? (
            <Alert severity='error'>{sizeError}</Alert>
          ) : (
            categories.map((cat) => (
              <MenuItem
                key={cat.catID}
                value={cat.catID}
                // onClick={ () => {
                //   dispatch({type:SET_CURRENT_CATEGORY,payload:cat.catID})
                // }}
              >
                {cat.catName}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
      <br />
      <FormControl variant='filled' sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id='demo-simple-select-filled-label'>
          الصنف الفرعي
        </InputLabel>
        <Select
          labelId='demo-simple-select-filled-label'
          id='demo-simple-select-filled'
          value={currSubCatId}
          onChange={onChangeHandler2}
        >
          {subCatLoading ? (
            <CircularProgress size={100} color='grey' />
          ) : subCatError ? (
            <Alert severity='error'>{subCatError}</Alert>
          ) : (
            subCategories.map((subCat) => (
              <MenuItem key={subCat.subCatID} value={subCat.subCatID}>
                {subCat.subCatName}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
      <br />
      <table className='table table-striped w-75 mx-auto mt-4' dir='rtl'>
        <thead className='bg-primary text-white'>
          <tr>
            <th>ID</th>
            <th>الاسم</th>
            <th>خيارات</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((size) => (
            <tr key={size.sizeID}>
              <td>{size.sizeID}</td>
              <td>{size.sizeName}</td>
              <td>
                <button
                  className='btn btn-danger'
                  disabled={deleteLoading}
                  onClick={() => deleteHandler(size.sizeID)}
                >
                  {deleteLoading ? (
                    <CircularProgress color='inherit' size={15} />
                  ) : (
                    'حذف'
                  )}
                </button>
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    dispatch({
                      type: SET_CURRENT_SIZE,
                      payload: size,
                    });
                    document
                      .getElementById('root')
                      .scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  تعديل
                </button>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={size.state === 'active'}
                      name='Show'
                      onClick={
                        size.state === 'active'
                          ? () => hideHandler(size.sizeID)
                          : () => showHandler(size.sizeID)
                      }
                    />
                  }
                  label='إظهار'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sizes;
