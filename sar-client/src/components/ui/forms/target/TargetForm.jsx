import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_TARGET_RESET,
  SET_CURRENT_TARGET_RESET,
  UPDATE_TARGET_RESET,
} from '../../../../redux/constants/targetsConstants';
import {
  addNewTarget,
  updateTarget,
} from '../../../../redux/actions/targetActions';
const TargetForm = () => {
  const dispatch = useDispatch();

  const currentTarget = useSelector((state) => state.setCurrentTarget);
  const { currentTarget: current } = currentTarget;

  const addTargetSt = useSelector((state) => state.addTarget);
  const { loading: addingLoading, success, error: addingError } = addTargetSt;

  const updateTargetSt = useSelector((state) => state.updateTarget);
  const {
    success: updateSuccess,
    error: updateError,
    loading: updateLoading,
  } = updateTargetSt;

  const [name, setName] = useState('');

  useEffect(() => {
    if (current && current.followedName) {
      setName(current.followedName);
    }
  }, [current]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addNewTarget(name));
    document.getElementById('addTargetForm').reset();
    dispatch({ type: SET_CURRENT_TARGET_RESET });
    setName('');
  };

  const onClickHandler = (id, name) => {
    dispatch(updateTarget(id, name));
    document.getElementById('addTargetForm').reset();
    dispatch({ type: SET_CURRENT_TARGET_RESET });
  };

  return (
    <form
      className='text-center mb-4'
      id='addTargetForm'
      onSubmit={submitHandler}
    >
      {success && (
        <Alert
          onClose={() => {
            dispatch({ type: ADD_TARGET_RESET });
          }}
        >
          تمت الإضافة بنجاح
        </Alert>
      )}
      {addingError && (
        <Alert
          variant='error'
          onClose={() => {
            dispatch({ type: ADD_TARGET_RESET });
          }}
        >
          {addingError}
        </Alert>
      )}
      {updateSuccess && (
        <Alert
          onClose={() => {
            dispatch({ type: UPDATE_TARGET_RESET });
          }}
        >
          تم التعديل بنجاح
        </Alert>
      )}
      {updateError && (
        <Alert
          variant='error'
          onClose={() => {
            dispatch({ type: UPDATE_TARGET_RESET });
          }}
        >
          {updateError}
        </Alert>
      )}
      <h2 className='my-3'>مخصص جديد</h2>

      <TextField
        label='اسم المخصص'
        onChange={(e) => setName(e.target.value)}
        variant='standard'
        value={name}
        required
      />
      <button
        className='btn btn-primary mx-2'
        type='submit'
        disabled={addingLoading || updateLoading}
      >
        {addingLoading ? <CircularProgress size={20} color='grey' /> : 'إضافة'}
      </button>

      <button
        className='btn btn-outline-primary'
        disabled={addingLoading || updateLoading}
        onClick={() => onClickHandler(current.followedID, name)}
      >
        {addingLoading ? <CircularProgress size={20} color='grey' /> : 'تعديل'}
      </button>
    </form>
  );
};

export default TargetForm;
