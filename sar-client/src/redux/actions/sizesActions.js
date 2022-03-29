import { ADD_SIZE_FAIL, ADD_SIZE_REQUEST, ADD_SIZE_SUCCESS, DELETE_SIZE_FAIL, DELETE_SIZE_REQUEST, DELETE_SIZE_SUCCESS, GET_SIZES_FAIL, GET_SIZES_REQUEST, GET_SIZES_SUCCESS, HIDE_SIZE_REQUEST, HIDE_SIZE_SUCCESS, SET_CURRENT_SIZE, SHOW_SIZE_REQUEST, SHOW_SIZE_SUCCESS, UPDATE_SIZE_FAIL, UPDATE_SIZE_REQUEST, UPDATE_SIZE_SUCCESS } from "../constants/targetsConstants";


export const getSizes = () => async (dispatch) => {
  try {
    
    // loading
    dispatch({
      type: GET_SIZES_REQUEST,
    });

    // const { data } = await axios.get(
    //   `http://mhmodmj-001-site1.itempurl.com/api/categories?level=selectM&CatID=1`
    // );

    dispatch({
      type: GET_SIZES_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: GET_SIZES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addNewSize = (name) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_SIZE_REQUEST,
    });

    const body = { 
          "level":"insert",
          "CatID":"5",
          "CatName":name,
         "notes":"1",
         "state":"1",
          "images":"1"
      }

    // const { data } = await axios.post(
    //   `http://mhmodmj-001-site1.itempurl.com/api/categories`,body
    // );

    dispatch({
      type: ADD_SIZE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    
    dispatch({
      type: ADD_SIZE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSize = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SIZE_REQUEST,
    });

    const body = { 
          "level":"delete",
          "CatID":id,
         "notes":"1",
         "state":"1",
          "images":"1"
      }

    // const { data } = await axios.post(
    //   `http://mhmodmj-001-site1.itempurl.com/api/categories`,body
    // );

    dispatch({
      type: DELETE_SIZE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    
    dispatch({
      type: DELETE_SIZE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const hideSize = (id) => async (dispatch) => {
  try {
    dispatch({type:HIDE_SIZE_REQUEST,payload:id})

    const body = { 
          "level":"hide",
          "CatID":id,
         "notes":"1",
         "state":"1",
          "images":"1"
      }

    // const { data } = await axios.post(
    //   `http://mhmodmj-001-site1.itempurl.com/api/categories`,body
    // );

    dispatch({type:HIDE_SIZE_SUCCESS,payload:id})


  } catch (error) {
    
    console.error(error);
  }
};
export const showSize = (id) => async (dispatch) => {
  try {
    dispatch({type:SHOW_SIZE_REQUEST,payload:id})

    const body = { 
          "level":"show",
          "CatID":id,
         "notes":"1",
         "state":"1",
          "images":"1"
      }

    // const { data } = await axios.post(
    //   `http://mhmodmj-001-site1.itempurl.com/api/categories`,body
    // );
    dispatch({type:SHOW_SIZE_SUCCESS,payload:id})


  } catch (error) {
    
    console.error(error);
  }
};

export const updateSize = (id,name) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_SIZE_REQUEST,
    });

    const body = { 
          "level":"update",
      "CatID": id,
          "CatName":name,
         "notes":"1",
         "state":"1",
          "images":"1"
      }

    // const { data } = await axios.post(
    //   `http://mhmodmj-001-site1.itempurl.com/api/categories`,body
    // );

    dispatch({
      type: UPDATE_SIZE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    
    dispatch({
      type: UPDATE_SIZE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setCurrentSize = (size) => async (dispatch) => {
    dispatch({
      type: SET_CURRENT_SIZE,
      payload: size,
    });
};

