import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from './post/Post';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { getPosts } from '../../../redux/actions/postsActions';
import {
  GET_POSTS_RESET,
  SET_CURRENT_POST_RESET,
} from '../../../redux/constants/postsConstants';
import { useCookies } from 'react-cookie';

const Posts = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  useEffect(() => {
    if (!cookies.user) {
      nav('/manager/login', { replace: true });
    }
  }, [cookies.user]);

  const addNewPostST = useSelector((state) => state.getPosts);
  const { posts, loading, error } = addNewPostST;

  useEffect(() => {
    dispatch({ type: GET_POSTS_RESET });
    dispatch({ type: SET_CURRENT_POST_RESET });
    dispatch(getPosts());
  }, []);

  if (error) {
    return <Alert severity='error'>{error}</Alert>;
  }

  if (loading || !cookies.user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={100} color='grey' />
      </Box>
    );
  }

  return (
    <div className='container'>
      <h1 className='mb-5 mt-3 text-center'>آخر الأخبار</h1>
      {cookies.user.split('+')[1] == 'A' && (
        <Link to='/management/add-post' className='btn btn-primary mb-3'>
          {' '}
          إضافة منشور
        </Link>
      )}
      {posts
        .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
        .map((post) => (
          <Post post={post} key={post.postID} />
        ))}
    </div>
  );
};

export default Posts;
