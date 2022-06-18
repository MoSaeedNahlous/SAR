import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './postForm.module.css';
import { Cancel } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_POST_FAIL,
  ADD_POST_REQUEST,
  ADD_POST_RESET,
  ADD_POST_SUCCESS,
  EDIT_POST_FAIL,
  EDIT_POST_REQUEST,
  EDIT_POST_RESET,
  EDIT_POST_SUCCESS,
} from '../../../../redux/constants/postsConstants';
import { Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PostFrom = () => {
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

  const addNewPostST = useSelector((state) => state.addPost);
  const { loading, success, error } = addNewPostST;

  const updatePostST = useSelector((state) => state.updatePost);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = updatePostST;

  const currentPostST = useSelector((state) => state.setCurrentPost);
  const { currentPost } = currentPostST;

  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    if (currentPost.postID) {
      setText(currentPost.text);
    }
  }, [currentPost]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (file) {
      data.append('feils', file);
    }
    data.append('text', text);
    data.append('level', 'insert');
    data.append('PostID', '1');
    data.append('title', 'no-title');
    data.append('notes', 'note');
    data.append('state', 'new');
    data.append('images', '/');

    dispatch({ type: ADD_POST_REQUEST });

    try {
      await axios.post(file ? '/postswimage' : '/posts', data);
      dispatch({ type: ADD_POST_SUCCESS });
      setFile(null);
      setText('');
      document.getElementById('img-post').value = '';
    } catch (error) {
      dispatch({
        type: ADD_POST_FAIL,
        payload: error,
      });
      console.log(error);
    }
  };

  const onClickHandler = async () => {
    const data = new FormData();
    data.append('text', text);
    data.append('level', 'update');
    data.append('PostID', currentPost.postID);
    data.append('title', 'title');
    data.append('notes', 'notes');
    data.append('state', 'state');
    data.append('images', '/');
    if (file) {
      data.append('feils', file);
    }
    dispatch({ type: EDIT_POST_REQUEST });
    try {
      await axios.post(file ? '/postswimage' : '/posts', data);
      dispatch({ type: EDIT_POST_SUCCESS });
      setFile(null);
      setText('');
      document.getElementById('img-post').value = '';
    } catch (error) {
      dispatch({
        type: EDIT_POST_FAIL,
        payload: error,
      });
      console.log(error);
    }
  };
  return (
    <div>
      {success && (
        <Alert
          onClose={() => {
            dispatch({ type: ADD_POST_RESET });
          }}
        >
          تم النشر بنجاح
        </Alert>
      )}
      {error && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: ADD_POST_RESET });
          }}
        >
          {error}
        </Alert>
      )}
      {updateSuccess && (
        <Alert
          onClose={() => {
            dispatch({ type: EDIT_POST_RESET });
          }}
        >
          تم التعديل بنجاح
        </Alert>
      )}
      {updateError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: EDIT_POST_RESET });
          }}
        >
          {updateError}
        </Alert>
      )}
      <h1 className='my-5 text-center'>إضافة منشور</h1>
      <form className='w-50 mx-auto' dir='rtl' onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <label htmlFor='post-content' className='form-label'>
            محتوى المنشور
          </label>
          <textarea
            className='form-control'
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            name='post-content mt-2'
          ></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='form-file mb-2' className='form-label'>
            صورة
          </label>
          <input
            type='file'
            className='form-control'
            id='img-post'
            name='form-file'
            accept='.png,.jpeg,.jpg'
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          {file && (
            <div className={classes.shareImgContainer}>
              <img
                className={classes.shareImg}
                src={URL.createObjectURL(file)}
                alt='My post'
              />
              <Cancel
                className={classes.shareCancelImg}
                fontSize='large'
                onClick={() => {
                  setFile(null);
                  document.getElementById('img-post').value = '';
                }}
              />
            </div>
          )}
        </div>

        {currentPost.postID ? (
          <button
            className='btn btn-primary px-5 mt-4'
            type='button'
            disabled={updateLoading}
            onClick={onClickHandler}
          >
            {updateLoading ? (
              <CircularProgress size={20} color='grey' />
            ) : (
              'تعديل'
            )}
          </button>
        ) : (
          <button
            className='btn btn-primary px-5 mt-4'
            type='submit'
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} color='grey' /> : 'نشر'}
          </button>
        )}
      </form>
    </div>
  );
};

export default PostFrom;
