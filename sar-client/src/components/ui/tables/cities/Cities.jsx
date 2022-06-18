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
  deleteCity,
  getCities,
  hideCity,
  showCity,
} from '../../../../redux/actions/citiesActions.js';
import { Box } from '@mui/system';
import {
  ADD_CITY_RESET,
  DELETE_CITY_RESET,
  SET_CURRENT_CITY,
  SET_CURRENT_CITY_RESET,
  UPDATE_CITY_RESET,
} from '../../../../redux/constants/citiesConstants.js';

const Cities = ({ data }) => {
  const dispatch = useDispatch();

  const currentCity = useSelector((state) => state.setCurrentCity);
  const { currentCity: current } = currentCity;

  const cities = useSelector((state) => state.getCities);
  const { cities: citiesList, error, loading } = cities;

  const deleteCitySt = useSelector((state) => state.deleteCity);
  const { success, error: deleteError, loading: deleteLoading } = deleteCitySt;

  const addCitySt = useSelector((state) => state.addCity);
  const {
    success: addSuccess,
    error: addError,
    loading: addLoading,
  } = addCitySt;

  const updateCitySt = useSelector((state) => state.updateCity);
  const {
    success: updateSuccess,
    error: updateError,
    loading: updateLoading,
  } = updateCitySt;

  useEffect(() => {
    dispatch({ type: SET_CURRENT_CITY_RESET });
    dispatch({ type: UPDATE_CITY_RESET });
    dispatch({ type: ADD_CITY_RESET });
    dispatch(getCities());
  }, []);

  useEffect(() => {
    if (success || updateSuccess || addSuccess) {
      dispatch(getCities());
    }
  }, [success, updateSuccess, addSuccess]);

  const deleteHandler = (id) => {
    if (confirm('هل أنت متأكد؟')) {
      dispatch(deleteCity(id));
    }
  };

  const showHandler = (id) => {
    dispatch(showCity(id));
  };

  const hideHandler = (id) => {
    dispatch(hideCity(id));
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
      {error && <Alert severity='error'>{error}</Alert>}
      {success && (
        <Alert
          onClose={() => {
            dispatch({ type: DELETE_CITY_RESET });
          }}
        >
          تم الحذف بنجاح
        </Alert>
      )}
      {deleteError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: DELETE_CITY_RESET });
          }}
        >
          {deleteError}
        </Alert>
      )}

      <h3 className='text-center fw-bold mb-3 mt-5'>المدن</h3>
      <div className='table-responsive'>
        <table
          className='table table-bordered table-striped w-75 mx-auto'
          dir='rtl'
        >
          <thead>
            <tr className='bg-primary text-white'>
              <th>ID</th>
              <th>المدينة</th>
              <th className='text-center'>خيارات</th>
            </tr>
          </thead>
          <tbody>
            {citiesList.map((city) => (
              <tr key={city.cityID}>
                <td>{city.cityID}</td>
                <td>{city.cityName}</td>
                <td className='d-flex justify-content-center'>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() => deleteHandler(city.cityID)}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <CircularProgress color='inherit' size={15} />
                    ) : (
                      'حذف'
                    )}
                  </button>
                  <button
                    className='btn btn-primary mx-2'
                    onClick={() => {
                      dispatch({ type: SET_CURRENT_CITY, payload: city }),
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
                        defaultChecked={city.state === 'active'}
                        name='Show'
                        onClick={
                          city.state === 'active'
                            ? () => hideHandler(city.cityID)
                            : () => showHandler(city.cityID)
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

export default Cities;
