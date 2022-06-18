import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_TARGET_RESET,
  DELETE_TARGET_RESET,
  SET_CURRENT_TARGET,
  SET_CURRENT_TARGET_RESET,
  UPDATE_TARGET_RESET,
} from '../../../../redux/constants/targetsConstants';

import {
  getTargets,
  deleteTarget,
  setCurrentTarget,
} from './../../../../redux/actions/targetActions';

const Targets = () => {
  const dispatch = useDispatch();

  const currentTarget = useSelector((state) => state.setCurrentTarget);
  const { currentTarget: current } = currentTarget;

  const targets = useSelector((state) => state.getTargets);
  const { targets: targetsList, error, loading } = targets;

  const deleteTargetSt = useSelector((state) => state.deleteTarget);
  const {
    success,
    error: deleteError,
    loading: deleteLoading,
  } = deleteTargetSt;

  const addTargetSt = useSelector((state) => state.addTarget);
  const {
    success: addSuccess,
    error: addError,
    loading: addLoading,
  } = addTargetSt;

  const updateTargetSt = useSelector((state) => state.updateTarget);
  const {
    success: updateSuccess,
    error: updateError,
    loading: updateLoading,
  } = updateTargetSt;

  useEffect(() => {
    dispatch({ type: SET_CURRENT_TARGET_RESET });
    dispatch({ type: UPDATE_TARGET_RESET });
    dispatch({ type: ADD_TARGET_RESET });
    dispatch(getTargets());
  }, []);

  useEffect(() => {
    if (success || updateSuccess || addSuccess) {
      dispatch(getTargets());
    }
  }, [success, updateSuccess, addSuccess]);

  const deleteHandler = (id) => {
    if (confirm('هل أنت متأكد؟')) {
      dispatch(deleteTarget(id));
    }
  };

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
      {error && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: DELETE_TARGET_RESET });
          }}
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          onClose={() => {
            dispatch({ type: DELETE_TARGET_RESET });
          }}
        >
          تم الحذف بنجاح
        </Alert>
      )}
      {deleteError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: DELETE_TARGET_RESET });
          }}
        >
          {deleteError}
        </Alert>
      )}
      <h3 className='text-center mb-3'>المخصصات</h3>
      <table className='table table-striped mx-auto w-75' dir='rtl'>
        <thead className='bg-primary text-white'>
          <tr className='py-5'>
            <th>ID</th>
            <th>الاسم</th>
            <th className='text-center'>خيارات</th>
          </tr>
        </thead>
        <tbody>
          {targetsList.map((target) => (
            <tr key={target.followedID}>
              <td>{target.followedID}</td>
              <td>{target.followedName}</td>
              <td className='d-flex justify-content-center'>
                <button
                  className='btn btn-danger mx-2'
                  onClick={() => deleteHandler(target.followedID)}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <CircularProgress color='inherit' size={15} />
                  ) : (
                    'حذف'
                  )}{' '}
                </button>
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    dispatch({ type: SET_CURRENT_TARGET, payload: target }),
                      document
                        .getElementById('root')
                        .scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  تعديل
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Targets;
