import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_CURRENT_CATEGORY,
  SET_CURRENT_CATEGORY_RESET,
} from '../../../../redux/constants/categoriesConstants';
import {
  ADD_SIZE_RESET,
  DELETE_SIZE_RESET,
  SET_CURRENT_SIZE_RESET,
  UPDATE_SIZE_RESET,
} from '../../../../redux/constants/sizesConstants';
import { getSubCategories } from '../../../../redux/actions/subCategoriesActions';
import { getCategories } from '../../../../redux/actions/categoriesActions';
import { SET_CURRENT_SUBCATEGORY_RESET } from '../../../../redux/constants/subCategoriesConstants';
import { addNewSize, updateSize } from '../../../../redux/actions/sizesActions';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const SizeForm = () => {
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

  const categoriesSt = useSelector((state) => state.getCategories);
  const { categories, loading: catLoading, error: catError } = categoriesSt;

  const subCategoriesSt = useSelector((state) => state.getSubCategories);
  const {
    subCategories,
    loading: subCatLoading,
    error: subCatError,
  } = subCategoriesSt;

  const setCurrentCategory = useSelector((state) => state.setCurrentCategory);
  const {
    currentCategory,
    loading: currentCatLoading,
    error: currentCatError,
  } = setCurrentCategory;

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

  const [currCatId, setCurrCatId] = useState('');
  const [currSubCatId, setSubCurrCatId] = useState('');
  const [currSizeName, setCurrSizeName] = useState('');

  useEffect(() => {
    dispatch(getCategories(true));
    dispatch({ type: SET_CURRENT_SIZE_RESET });
    dispatch({ type: ADD_SIZE_RESET });
    dispatch({ type: UPDATE_SIZE_RESET });
    dispatch({ type: DELETE_SIZE_RESET });
  }, []);

  useEffect(() => {
    if (currentSize && currentSize.sizeID) {
      setCurrCatId(currentSize.catID);
      setSubCurrCatId(currentSize.subCatID);
      setCurrSizeName(currentSize.sizeName);
    }

    if (!currentSize || !currentSize.sizeID) {
      setCurrCatId('');
      setSubCurrCatId('');
      setCurrSizeName('');
    }
  }, [currentSize]);

  useEffect(() => {
    if (currCatId) {
      dispatch(getSubCategories(currCatId));
    }
  }, [currCatId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addNewSize(currSizeName, currCatId, currSubCatId));
    document.getElementById('addSizeForm').reset();
    dispatch({ type: SET_CURRENT_SIZE_RESET });
    setCurrCatId('');
    setCurrSizeName('');
    setSubCurrCatId('');
  };
  const onChangeHandler2 = (e) => {
    setSubCurrCatId(e.target.value);
  };

  const onChangeHandler3 = (e) => {
    setCurrSizeName(e.target.value);
  };

  const onChangeHandler = (e) => {
    setCurrCatId(e.target.value);
  };

  const onClickHandler = () => {
    dispatch(
      updateSize(
        String(currentSize.sizeID),
        currSizeName,
        currentSize.state,
        String(currentSize.catID),
        currentSize.subCatID
      )
    );
    document.getElementById('addSizeForm').reset();
    dispatch({ type: SET_CURRENT_SIZE_RESET });
    setCurrCatId('');
    setCurrSizeName('');
    setSubCurrCatId('');
  };

  return (
    <form
      className='text-center mt-5'
      dir='rtl'
      onSubmit={submitHandler}
      id='addSizeForm'
    >
      {success && (
        <Alert
          onClose={() => {
            dispatch({ type: 'ADD_SIZE_RESET1' });
          }}
        >
          تمت الإضافة بنجاح
        </Alert>
      )}
      {addingError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: 'ADD_SIZE_RESET1' });
          }}
        >
          {addingError}
        </Alert>
      )}
      {updateSuccess && (
        <Alert
          onClose={() => {
            dispatch({ type: UPDATE_SIZE_RESET });
          }}
        >
          تم التعديل بنجاح
        </Alert>
      )}
      {updateError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: UPDATE_SIZE_RESET });
          }}
        >
          {updateError}
        </Alert>
      )}
      <h2>القياس</h2>
      <FormControl variant='filled' sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id='demo-simple-select-filled-label'>
          الصنف الرئيسي
        </InputLabel>
        <Select
          required
          labelId='demo-simple-select-filled-label'
          id='demo-simple-select-filled'
          value={currCatId}
          onChange={onChangeHandler}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.catID} value={cat.catID}>
              {cat.catName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <FormControl variant='filled' sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id='demo-simple-select-filled-label'>
          الصنف الفرعي
        </InputLabel>
        <Select
          required
          labelId='demo-simple-select-filled-label'
          id='demo-simple-select-filled'
          value={currSubCatId}
          onChange={onChangeHandler2}
        >
          {subCategories.map((subCat) => (
            <MenuItem key={subCat.subCatID} value={subCat.subCatID}>
              {subCat.subCatName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <TextField
        label='اسم القياس'
        variant='standard'
        sx={{ minWidth: '400px' }}
        value={currSizeName}
        onChange={onChangeHandler3}
        required
      />
      <br />
      <br />
      <button
        className='btn btn-info mx-1'
        type='button'
        onClick={() => {
          dispatch({ type: SET_CURRENT_SIZE_RESET });
          setCurrCatId('');
          setSubCurrCatId('');
          setCurrSizeName('');
        }}
        disabled={addingLoading || updateLoading || !currentSize.sizeID}
      >
        إزالة التحديد
      </button>
      <button
        className='btn btn-outline-primary mx-1'
        type='button'
        onClick={onClickHandler}
        disabled={addingLoading || updateLoading || !currentSize.sizeID}
      >
        {updateLoading ? <CircularProgress size={20} color='grey' /> : 'تعديل'}
      </button>
      <button
        className='btn btn-primary mx-1'
        disabled={addingLoading || updateLoading || currentSize.sizeID}
      >
        {addingLoading ? <CircularProgress size={20} color='grey' /> : 'إضافة'}
      </button>
    </form>
  );
};

export default SizeForm;
