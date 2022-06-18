import { Alert, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addNewCategory,
  updateCategory,
} from '../../../../redux/actions/categoriesActions';
import {
  ADD_CATEGORY_RESET,
  SET_CURRENT_CATEGORY,
  SET_CURRENT_CATEGORY_RESET,
  UPDATE_CATEGORY_RESET,
} from '../../../../redux/constants/categoriesConstants';

const CategoryForm = () => {
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
  const currentCategory = useSelector((state) => state.setCurrentCategory);
  const { currentCategory: current } = currentCategory;

  const addCategorySt = useSelector((state) => state.addCategory);
  const { loading: addingLoading, success, error: addingError } = addCategorySt;

  const updateCategorySt = useSelector((state) => state.updateCategory);
  const {
    success: updateSuccess,
    error: updateError,
    loading: updateLoading,
  } = updateCategorySt;

  const [name, setName] = useState('');

  useEffect(() => {
    if (current && current.catName) {
      setName(current.catName);
    }
    if (!current || !current.catID) {
      setName('');
    }
  }, [current]);

  useEffect(() => {
    dispatch({ type: SET_CURRENT_CATEGORY_RESET });
    dispatch({ type: ADD_CATEGORY_RESET });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addNewCategory(name));
    document.getElementById('addCatForm').reset();
    dispatch({ type: SET_CURRENT_CATEGORY_RESET });
    setName('');
  };

  const onClickHandler = (id, name) => {
    dispatch(updateCategory(id, name));
    document.getElementById('addCatForm').reset();
    dispatch({ type: SET_CURRENT_CATEGORY_RESET });
  };

  return (
    <form className='text-center mb-4' onSubmit={submitHandler} id='addCatForm'>
      {success && (
        <Alert
          onClose={() => {
            dispatch({ type: ADD_CATEGORY_RESET });
          }}
        >
          تمت الإضافة بنجاح
        </Alert>
      )}
      {addingError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: ADD_CATEGORY_RESET });
          }}
        >
          {addingError}
        </Alert>
      )}
      {updateSuccess && (
        <Alert
          onClose={() => {
            dispatch({ type: UPDATE_CATEGORY_RESET });
          }}
        >
          تم التعديل بنجاح
        </Alert>
      )}
      {updateError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: UPDATE_CATEGORY_RESET });
          }}
        >
          {updateError}
        </Alert>
      )}
      <h2 className='mb-3'>صنف جديد</h2>
      <TextField
        label={'اسم الصنف'}
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
        variant='standard'
      />

      <button
        className='btn btn-primary mx-2'
        type='submit'
        disabled={addingLoading || updateLoading || current.catID}
      >
        {addingLoading ? <CircularProgress size={20} color='grey' /> : 'إضافة'}
      </button>
      <button
        className='btn btn-outline-primary'
        onClick={() => onClickHandler(current.catID, name)}
        disabled={addingLoading || updateLoading || !current.catID}
      >
        {updateLoading ? <CircularProgress size={20} color='grey' /> : 'تعديل'}
      </button>
      <button
        className='btn btn-info'
        onClick={() => {
          dispatch({ type: SET_CURRENT_CATEGORY_RESET });
        }}
        disabled={addingLoading || updateLoading || !current.catID}
      >
        إزالة التحديد
      </button>
    </form>
  );
};

export default CategoryForm;
