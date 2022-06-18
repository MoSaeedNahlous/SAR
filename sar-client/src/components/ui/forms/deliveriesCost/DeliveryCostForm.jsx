import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getCities } from '../../../../redux/actions/citiesActions';
import { getDeliveryCompanies } from '../../../../redux/actions/deliveryCompaniesActions';
import {
  ADD_DELIVERY_COMPANY_COST_RESET,
  SET_CURRENT_DELIVERY_COMPANY_COST_RESET,
  UPDATE_DELIVERY_COMPANY_COST_RESET,
} from '../../../../redux/constants/deliveryCompaniesCostConstants';
import {
  addNewDelievryCompanyCost,
  getDeliveryCompaniesCostByCity,
  updateDeliveryCompanyCost,
} from '../../../../redux/actions/deliveryCompaniesCostActions';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const DeliveryCostForm = () => {
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

  const cities = useSelector((state) => state.getCities);
  const {
    cities: citiesList,
    loading: citiesLoading,
    error: citiesError,
  } = cities;

  const deliveryCompaniesST = useSelector(
    (state) => state.getDeliveryCompanies
  );
  const {
    deliveryCompanies,
    loading: deliveryCompaniesLoading,
    error: deliveryCompaniesError,
  } = deliveryCompaniesST;

  const currentDeliveryCompanyCost = useSelector(
    (state) => state.setCurrentDeliveryCompanyCost
  );
  const { currentDeliveryCompanyCost: current } = currentDeliveryCompanyCost;

  // const addDeliveryCompanyCostSt = useSelector(
  //   (state) => state.addDeliveryCompanyCost
  // );
  // const {
  //   loading: addingLoading,
  //   success,
  //   error: addingError,
  // } = addDeliveryCompanyCostSt;

  const updateDeliveryCompanyCostSt = useSelector(
    (state) => state.updateDeliveryCompanyCost
  );
  const {
    success: updateSuccess,
    error: updateError,
    loading: updateLoading,
  } = updateDeliveryCompanyCostSt;

  const deleteDeliveryCompanyCostSt = useSelector(
    (state) => state.deleteDeliveryCompanyCost
  );
  const {
    success: deleteSuccess,
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

  // const updateDeliveryCompanyCostSt = useSelector(
  //   (state) => state.updateDeliveryCompanyCost
  // );
  // const {
  //   success: updateSuccess,
  //   error: updateError,
  //   loading: updateLoading,
  // } = updateDeliveryCompanyCostSt;

  const [data, setData] = useState({
    cost: '',
    cityID: '',
    deliveryID: '',
  });

  useEffect(() => {
    if (current && current.deliveryName) {
      setData(current);
    }
    if (!current || !current.deliveryName) {
      setData({
        cost: '',
        cityID: '',
        deliveryID: '',
      });
    }
  }, [current]);

  useEffect(() => {
    if (data && data.cityID) {
      dispatch(getDeliveryCompaniesCostByCity(data.cityID));
    }
  }, [data.cityID]);

  useEffect(() => {
    if ((deleteSuccess || updateSuccess || addSuccess) && data && data.cityID) {
      dispatch(getDeliveryCompaniesCostByCity(data.cityID));
      document.getElementById('addDCC').reset();
      dispatch({ type: SET_CURRENT_DELIVERY_COMPANY_COST_RESET });
      setData({
        cost: '',
        cityID: '',
        deliveryID: '',
      });
    }
  }, [deleteSuccess, updateSuccess, addSuccess]);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addNewDelievryCompanyCost(
        data.cost,
        data.cityID.toString(),
        data.deliveryID.toString()
      )
    );
    document.getElementById('addDCC').reset();
    dispatch({ type: SET_CURRENT_DELIVERY_COMPANY_COST_RESET });
    setData({
      cost: '',
      cityID: '',
      deliveryID: '',
    });
  };

  const onClickHandler = () => {
    dispatch(
      updateDeliveryCompanyCost(
        current.costID,
        data.cityID,
        data.deliveryID,
        data.cost
      )
    );
  };

  useEffect(() => {
    dispatch(getCities());
    dispatch(getDeliveryCompanies());
  }, []);

  return (
    <form
      className='text-center mt-5'
      onSubmit={submitHandler}
      dir='rtl'
      id='addDCC'
    >
      {addSuccess && (
        <Alert
          onClose={() => {
            dispatch({ type: ADD_DELIVERY_COMPANY_COST_RESET });
          }}
        >
          تمت الإضافة بنجاح
        </Alert>
      )}
      {addError && (
        <Alert
          severity="error"
          onClose={() => {
            dispatch({ type: ADD_DELIVERY_COMPANY_COST_RESET });
          }}
        >
          {addError}
        </Alert>
      )}
      {updateSuccess && (
        <Alert
          onClose={() => {
            dispatch({ type: UPDATE_DELIVERY_COMPANY_COST_RESET });
          }}
        >
          تم التعديل بنجاح
        </Alert>
      )}
      {updateError && (
        <Alert
          severity="error"
          onClose={() => {
            dispatch({ type: UPDATE_DELIVERY_COMPANY_COST_RESET });
          }}
        >
          {updateError}
        </Alert>
      )}
      <h2>أجرة التوصيل</h2>
      <FormControl variant='filled' sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id='demo-simple-select-filled-label'>المدينة</InputLabel>
        <Select
          required
          name='cityID'
          value={data.cityID}
          onChange={onChangeHandler}
          labelId='demo-simple-select-filled-label'
          id='demo-simple-select-filled'
        >
          {citiesList.map((city) => (
            <MenuItem key={city.cityID} value={city.cityID}>
              {city.cityName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <FormControl variant='filled' sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id='demo-simple-select-filled-label'>
          شركة التوصيل
        </InputLabel>
        <Select
          required
          name='deliveryID'
          value={data.deliveryID}
          onChange={onChangeHandler}
          labelId='demo-simple-select-filled-label'
          id='demo-simple-select-filled'
        >
          {deliveryCompanies.map((dc) => (
            <MenuItem key={dc.deliveryID} value={dc.deliveryID}>
              {dc.deliveryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <TextField
        required
        label='اجرة التوصيل'
        variant='standard'
        onChange={onChangeHandler}
        value={data.cost}
        name='cost'
        sx={{ minWidth: '400px' }}
      />
      <br />
      <br />
      <button
        className='btn btn-primary mx-2'
        type='submit'
        disabled={addLoading || updateLoading || current.costID}
      >
        {addLoading ? <CircularProgress size={20} color='grey' /> : 'إضافة'}
      </button>
      <button
        className='btn btn-outline-primary mx-2'
        type='button'
        onClick={onClickHandler}
        disabled={addLoading || updateLoading || !current.deliveryID}
      >
        {updateLoading ? <CircularProgress size={20} color='grey' /> : 'تعديل'}
      </button>
      <button
        className='btn btn-info mx-2'
        type='button'
        onClick={() => {
          dispatch({ type: SET_CURRENT_DELIVERY_COMPANY_COST_RESET });
          setData({
            cost: '',
            cityID: '',
            deliveryID: '',
          });
        }}
        disabled={addLoading || updateLoading || !current.deliveryID}
      >
        إزالة التحديد
      </button>
    </form>
  );
};

export default DeliveryCostForm;
