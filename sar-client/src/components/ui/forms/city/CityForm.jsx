import { Alert, Button, CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewCity,updateCity} from '../../../../redux/actions/citiesActions'
import { ADD_CITY_RESET, SET_CURRENT_CITY_RESET, UPDATE_CITY_RESET } from '../../../../redux/constants/citiesConstants'

const CityForm = () => {

  const dispatch = useDispatch()
    
  const currentCity = useSelector(state => state.setCurrentCity)
  const { currentCity: current } = currentCity

  const addCitySt = useSelector(state => state.addCity)
  const { loading: addingLoading, success, error: addingError } = addCitySt
  
  const updateCitySt = useSelector((state) => state.updateCity);
  const { success:updateSuccess, error:updateError, loading:updateLoading } = updateCitySt;


  const [name, setName] = useState('')

  useEffect(() => {
    if (current && current.cityName) {
      setName(current.cityName)
    }
  }, [current])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addNewCity(name))
    document.getElementById('addCityForm').reset()
    dispatch({ type: SET_CURRENT_CITY_RESET })
    setName('')
  }
  
  const onClickHandler = (id,name) => {
    dispatch(updateCity(id,name))
    document.getElementById('addCityForm').reset()
    dispatch({ type: SET_CURRENT_CITY_RESET })
  }

  return (
    <form className='text-center my-3' id='addCityForm' onSubmit={ submitHandler }>
      { success && <Alert onClose={() => {dispatch({type:ADD_CITY_RESET})}}>تمت الإضافة بنجاح</Alert> }
      { addingError && <Alert variant='error' onClose={ () => { dispatch({ type: ADD_CITY_RESET }) } }>{ addingError }</Alert> }
      { updateSuccess && <Alert onClose={() => {dispatch({type:UPDATE_CITY_RESET})}}>تم التعديل بنجاح</Alert> }
      { updateError && <Alert variant='error' onClose={ () => { dispatch({ type: UPDATE_CITY_RESET }) } }>{ updateError }</Alert>}
          <h2 className='fw-bolder mt-5 mb-3'>أضف مدينة</h2>
      <TextField
        label="اسم المدينة"
        variant="standard"
        onChange={
            (e) => setName(e.target.value)
          }
        value={ name }
        required
      />
      <button
        className='btn btn-primary mx-2'
        type="submit"
       disabled={ addingLoading || updateLoading } >
        { addingLoading ? <CircularProgress size={ 20 } color='grey' /> : "إضافة" }
      </button>
      <button className='btn btn-outline-primary mx-2'
        type="button"
       onClick={ () => onClickHandler(current.cityID, name) }
        disabled={ addingLoading || updateLoading || !current.cityID }
      >
        { addingLoading ? <CircularProgress size={ 20 } color='grey' /> : "تعديل" }
      </button>
      </form>
  )
}

export default CityForm