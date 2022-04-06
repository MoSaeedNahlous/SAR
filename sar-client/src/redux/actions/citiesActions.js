import {
  GET_CITIES_FAIL,
  GET_CITIES_REQUEST,
  GET_CITIES_RESET,
  GET_CITIES_SUCCESS,
  ADD_CITY_FAIL,
  ADD_CITY_REQUEST,
  ADD_CITY_RESET,
  ADD_CITY_SUCCESS, DELETE_CITY_FAIL,
  DELETE_CITY_REQUEST,
  DELETE_CITY_RESET,
  DELETE_CITY_SUCCESS,
  UPDATE_CITY_REQUEST, UPDATE_CITY_SUCCESS, UPDATE_CITY_FAIL,
   HIDE_CITY_REQUEST, HIDE_CITY_SUCCESS, SHOW_CITY_REQUEST, SHOW_CITY_SUCCESS
} from '../constants/citiesConstants';

import {
  SET_CURRENT_CITY,
  SET_CURRENT_CITY_RESET,

} from '../constants/citiesConstants';
import axios from 'axios';

export const getCities = () => async (dispatch) => {
  try {
    
    // loading
    dispatch({
      type: GET_CITIES_REQUEST,
    });

    const { data } = await axios.get(
      `http://mhmodmj-001-site1.itempurl.com/api/Cities?level=selectM&CityID=33`
    );

    dispatch({
      type: GET_CITIES_SUCCESS,
      payload: data.table,
    });

  } catch (error) {
    dispatch({
      type: GET_CITIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addNewCity = (name) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CITY_REQUEST,
    });

    const body = {
      "level": "insert",
      "CityID":"84",
      "CityName":name,
      "state":"1",
      "notes":"none",
      "images":"none",     
      }

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/cities`,body
    );

    dispatch({
      type: ADD_CITY_SUCCESS,
      payload: data,
    });

  } catch (error) {
    
    dispatch({
      type: ADD_CITY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCity = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CITY_REQUEST,
    });

    const body = {
      "level": "delete",
      "CityID":id,
      "CityName":"name",
      "state":"1",
      "notes":"none",
      "images":"none",     
      }

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/cities`,body
    );

    if(data.table[0].column1 === "cant delete it") {
      throw new Error("لا يمكن حذف المدينة لوجود معلومات متعلقة فيها")
    }

    dispatch({
      type: DELETE_CITY_SUCCESS,
      payload: data,
    });


  } catch (error) {
    
    dispatch({
      type: DELETE_CITY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const hideCity = (id) => async (dispatch) => {
  try {
    dispatch({
      type: HIDE_CITY_REQUEST,
      payload: id
    })

    const body = {
      "level": "hide",
      "CityID":id,
      "CityName":"name",
      "state":"1",
      "notes":"none",
      "images":"none",     
      }

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/cities`,body
    );

    dispatch({type:HIDE_CITY_SUCCESS,payload:id})


  } catch (error) {
    
    console.error(error);
  }
};
export const showCity = (id) => async (dispatch) => {
  try {
    dispatch({type:SHOW_CITY_REQUEST,payload:id})

    const body = {
      "level": "show",
      "CityID":id,
      "CityName":"name",
      "state":"1",
      "notes":"none",
      "images":"none",     
      }

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/cities`,body
    );
    dispatch({type:SHOW_CITY_SUCCESS,payload:id})


  } catch (error) {
    
    console.error(error);
  }
};

export const updateCity = (id, name) => async (dispatch) => {
  
  try {

    dispatch({
      type: UPDATE_CITY_REQUEST,
    });

    const body = {
      "level": "update",
      "CityID":id,
      "CityName":name,
      "state":"1",
      "notes":"none",
      "images":"none",     
      }

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/cities`,body
    );

    dispatch({
      type: UPDATE_CITY_SUCCESS,
      payload: data,
    });

  } catch (error) {
    
    dispatch({
      type: UPDATE_CITY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setCurrentCity = (city) => async (dispatch) => {
    dispatch({
      type: SET_CURRENT_CITY,
      payload: city,
    });
};

