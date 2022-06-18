import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDeliveryCompanies,
  deleteDeliveryCompany,
  setCurrentDeliveryCompany,
  hideDeliveryCompany,
  showDeliveryCompany,
} from '../../../../redux/actions/deliveryCompaniesActions';
import {
  ADD_DELIVERY_COMPANY_RESET,
  DELETE_DELIVERY_COMPANY_RESET,
  SET_CURRENT_DELIVERY_COMPANY,
  SET_CURRENT_DELIVERY_COMPANY_RESET,
  UPDATE_DELIVERY_COMPANY_RESET,
} from '../../../../redux/constants/deliveryCompaniesConstants';
import { Box } from '@mui/system';

const DeliveriesCompanies = ({ data }) => {
  const dispatch = useDispatch();

  const currentDeliveryCompany = useSelector(
    (state) => state.setCurrentDeliveryCompany
  );
  const { currentDeliveryCompany: current } = currentDeliveryCompany;

  const deliveryCompanies = useSelector((state) => state.getDeliveryCompanies);
  const {
    deliveryCompanies: deliveryCompaniesList,
    error,
    loading,
  } = deliveryCompanies;

  const deleteDeliveryCompanySt = useSelector(
    (state) => state.deleteDeliveryCompany
  );
  const {
    success,
    error: deleteError,
    loading: deleteLoading,
  } = deleteDeliveryCompanySt;

  const addDeliveryCompanySt = useSelector((state) => state.addDeliveryCompany);
  const {
    success: addSuccess,
    error: addError,
    loading: addLoading,
  } = addDeliveryCompanySt;

  const updateDeliveryCompanySt = useSelector(
    (state) => state.updateDeliveryCompany
  );
  const {
    success: updateSuccess,
    error: updateError,
    loading: updateLoading,
  } = updateDeliveryCompanySt;

  useEffect(() => {
    dispatch({ type: SET_CURRENT_DELIVERY_COMPANY_RESET });
    dispatch({ type: UPDATE_DELIVERY_COMPANY_RESET });
    dispatch({ type: ADD_DELIVERY_COMPANY_RESET });
    dispatch(getDeliveryCompanies());
  }, []);

  useEffect(() => {
    if (success || updateSuccess || addSuccess) {
      dispatch(getDeliveryCompanies());
    }
  }, [success, updateSuccess, addSuccess]);

  const deleteHandler = (id) => {
    if (confirm('هل أنت متأكد؟')) {
      dispatch(deleteDeliveryCompany(id));
    }
  };

  const showHandler = (id) => {
    dispatch(showDeliveryCompany(id));
  };

  const hideHandler = (id) => {
    dispatch(hideDeliveryCompany(id));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={100} color='grey' />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  return (
    <div className='text-center'>
      {error && <Alert severity="error">{error}</Alert>}
      {success && (
        <Alert
          onClose={() => {
            dispatch({ type: DELETE_DELIVERY_COMPANY_RESET });
          }}
        >
          تم الحذف بنجاح
        </Alert>
      )}
      {deleteError && (
        <Alert
          severity="error"
          onClose={() => {
            dispatch({ type: DELETE_DELIVERY_COMPANY_RESET });
          }}
        >
          {deleteError}
        </Alert>
      )}

      <h3 className='my-5 fw-bold'>شركات التوصيل </h3>
      <div className='table-responsive'>
        <table
          className='table table-bordered table-striped w-75 mx-auto mt-2'
          dir='rtl'
        >
          <thead>
            <tr className='bg-primary text-white'>
              <th>ID</th>
              <th>الاسم</th>
              <th className='bg-primary text-white'>خيارات</th>
            </tr>
          </thead>
          <tbody>
            {deliveryCompaniesList.map((DC) => (
              <tr key={DC.deliveryID}>
                <td>{DC.deliveryID}</td>
                <td>{DC.deliveryName}</td>
                <td className='d-flex justify-content-center'>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() => deleteHandler(DC.deliveryID)}
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
                        type: SET_CURRENT_DELIVERY_COMPANY,
                        payload: DC,
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
                        defaultChecked={DC.state === 'active'}
                        name='Show'
                        onClick={
                          DC.state === 'active'
                            ? () => hideHandler(DC.deliveryID)
                            : () => showHandler(DC.deliveryID)
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

export default DeliveriesCompanies;
