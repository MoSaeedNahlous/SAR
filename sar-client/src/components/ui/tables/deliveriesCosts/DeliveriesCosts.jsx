import React, { useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_DELIVERY_COMPANY_COST_RESET,
  DELETE_DELIVERY_COMPANY_COST_RESET,
  SET_CURRENT_DELIVERY_COMPANY_COST,
  SET_CURRENT_DELIVERY_COMPANY_COST_RESET,
  UPDATE_DELIVERY_COMPANY_COST_RESET,
} from '../../../../redux/constants/deliveryCompaniesCostConstants';
import {
  getDeliveryCompaniesCost,
  deleteDeliveryCompanyCost,
  showDeliveryCompanyCost,
  hideDeliveryCompanyCost,
} from '../../../../redux/actions/deliveryCompaniesCostActions';

const DeliveriesCosts = () => {
  const dispatch = useDispatch();

  const currentDeliveryCompanyCost = useSelector(
    (state) => state.setCurrentDeliveryCompanyCost
  );
  const { currentDeliveryCompanyCost: current } = currentDeliveryCompanyCost;

  const deliveryCompaniesCost = useSelector(
    (state) => state.getDeliveryCompaniesCost
  );
  const {
    deliveryCompaniesCost: deliveryCompaniesCostList,
    error,
    loading,
  } = deliveryCompaniesCost;

  const deleteDeliveryCompanyCostSt = useSelector(
    (state) => state.deleteDeliveryCompanyCost
  );
  const {
    success,
    error: deleteError,
    loading: deleteLoading,
  } = deleteDeliveryCompanyCostSt;

  const addDeliveryCompanyCostSt = useSelector(
    (state) => state.addDeliveryCompanyCost
  );
  const {
    success: addSuccess,
    error: addError,
    loading: addLoading,
  } = addDeliveryCompanyCostSt;

  const updateDeliveryCompanyCostSt = useSelector(
    (state) => state.updateDeliveryCompanyCost
  );
  const {
    success: updateSuccess,
    error: updateError,
    loading: updateLoading,
  } = updateDeliveryCompanyCostSt;

  useEffect(() => {
    dispatch({ type: SET_CURRENT_DELIVERY_COMPANY_COST_RESET });
    dispatch({ type: UPDATE_DELIVERY_COMPANY_COST_RESET });
    dispatch({ type: ADD_DELIVERY_COMPANY_COST_RESET });
    // dispatch(getDeliveryCompaniesCost());
  }, []);

  //   useEffect(() => {
  //     if (success || updateSuccess || addSuccess) {
  //       dispatch(getDeliveryCompaniesCost());
  //     }
  //   }, [success, updateSuccess, addSuccess]);

  const deleteHandler = (id) => {
    if (confirm('هل أنت متأكد؟')) {
      dispatch(deleteDeliveryCompanyCost(id));
    }
  };

  const showHandler = (id) => {
    dispatch(showDeliveryCompanyCost(id));
  };

  const hideHandler = (id) => {
    dispatch(hideDeliveryCompanyCost(id));
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
    <div className='text-center'>
      {error && <Alert severity='error'>{error}</Alert>}
      {success && (
        <Alert
          onClose={() => {
            dispatch({ type: DELETE_DELIVERY_COMPANY_COST_RESET });
          }}
        >
          تم الحذف بنجاح
        </Alert>
      )}
      {deleteError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: DELETE_DELIVERY_COMPANY_COST_RESET });
          }}
        >
          {deleteError}
        </Alert>
      )}

      <h2 className='my-5'>أجور التوصيل</h2>
      <div className='table-responsive'>
        <table
          className='table table-bordered table-striped w-75 mx-auto mt-2'
          dir='rtl'
        >
          <thead>
            <tr className='bg-primary text-white'>
              <th>ID</th>
              <th>الاسم</th>
              <th>التكلفة</th>
              <th className='text-center'>خيارات</th>
            </tr>
          </thead>
          <tbody>
            {deliveryCompaniesCostList.map((dcc) => (
              <tr key={dcc.costID}>
                <td>{dcc.costID}</td>
                <td>{dcc.deliveryName}</td>
                <td>{dcc.cost}</td>
                <td className='d-flex justify-content-center'>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() => deleteHandler(dcc.costID)}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <CircularProgress color='inherit' size={15} />
                    ) : (
                      'حذف'
                    )}{' '}
                  </button>
                  <button
                    className='btn btn-primary mx-2'
                    onClick={() => {
                      dispatch({
                        type: SET_CURRENT_DELIVERY_COMPANY_COST,
                        payload: dcc,
                      }),
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
                        defaultChecked={dcc.state === 'active'}
                        name='Show'
                        onClick={
                          dcc.state === 'active'
                            ? () => hideHandler(dcc.costID)
                            : () => showHandler(dcc.costID)
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
    </div>
  );
};

export default DeliveriesCosts;
