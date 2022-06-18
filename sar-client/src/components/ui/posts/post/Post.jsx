import React from 'react';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPosts,
  setCurrentPost,
} from '../../../../redux/actions/postsActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
} from '../../../../redux/constants/postsConstants';
import { useCookies } from 'react-cookie';

const Post = ({ post }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    const data = new FormData();
    data.append('text', 'text');
    data.append('level', 'delete');
    data.append('PostID', id);
    data.append('title', 'title');
    data.append('notes', 'notes');
    data.append('state', 'state');
    data.append('images', '/');

    dispatch({ type: DELETE_POST_REQUEST });
    try {
      await axios.post('/posts', data);
      dispatch({ type: DELETE_POST_SUCCESS });
      dispatch(getPosts());
    } catch (error) {
      dispatch({
        type: DELETE_POST_FAIL,
        payload: error,
      });
      console.log(error);
    }
  };

  return (
    <div className='card mb-3 mx-auto w-75' style={{ maxWidth: '900px' }}>
      <div className='row g-0'>
        <div className='col-md-8'>
          <div className='card-body'>
            <p className='card-text fs-4'>{post.text}</p>
            <p className='card-text'>
              <small className='text-muted'>
                {format(new Date(post.dateCreated), 'dd/MM/yyyy  hh:mm')}
              </small>
            </p>
          </div>
          {cookies.user.split('+')[1] == 'A' && (
            <div className='d-flex justify-content-between w-25 ms-3 mb-3'>
              <button
                className='btn btn-primary btn-sm'
                onClick={() => {
                  dispatch(setCurrentPost(post));
                  navigate('/management/add-post', { replace: true });
                }}
              >
                تعديل
              </button>
              <button
                className='btn btn-danger btn-sm'
                onClick={() => {
                  deleteHandler(post.postID);
                }}
              >
                حذف
              </button>
            </div>
          )}
        </div>

        {post.images == '-' || post.images == null ? null : (
          <div className='col-md-4'>
            <img
              src={ post.images}
              className='img-fluid rounded-start w-100 h-100'
              alt='صورة'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
