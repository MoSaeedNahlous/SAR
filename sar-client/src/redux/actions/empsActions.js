import {
  GET_EMPS_FAIL,
  GET_EMPS_REQUEST,
  GET_EMPS_RESET,
  GET_EMPS_SUCCESS,
  ADD_EMP_FAIL,
  ADD_EMP_REQUEST,
  ADD_EMP_RESET,
  ADD_EMP_SUCCESS, DELETE_EMP_FAIL,
  DELETE_EMP_REQUEST,
  DELETE_EMP_RESET,
  DELETE_EMP_SUCCESS,
  UPDATE_EMP_REQUEST, UPDATE_EMP_SUCCESS, UPDATE_EMP_FAIL,
   HIDE_EMP_REQUEST, HIDE_EMP_SUCCESS, SHOW_EMP_REQUEST, SHOW_EMP_SUCCESS
} from '../constants/empConstants';

import {
  SET_CURRENT_EMP,
  SET_CURRENT_EMP_RESET,

} from '../constants/empConstants';
import axios from 'axios';

export const getEmps = (name) => async (dispatch) => {
  try {
    
    // loading
    dispatch({
      type: GET_EMPS_REQUEST,
    });

    const { data } = await axios.get(
      name ?
      `http://mhmodmj-001-site1.itempurl.com/api/Employee?level=selectByName&empname=${name}`:
      `http://mhmodmj-001-site1.itempurl.com/api/Employee`
    );

    dispatch({
      type: GET_EMPS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: GET_EMPS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addNewEmp = (
  empName,
  add1,
  add2,
  password,
  notes,
  mob1,
  mob2,
  email) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_EMP_REQUEST,
    });

    const body ={
       "level": "insert",
            "empId": "1182",
            "empName": empName,
            "empType": "3",
            "password": password,
            "BlockReason": "8",
            "address2": add2,
            "notes": notes,
            "totalpaid": "1",
            "totalRemain": "1",
            "IsBlocked": "22222222222222222222dddd222222222222222222222222222222222222222222222",
            "mobile1": mob1,
            "mobile2": mob2,
            "Email": email,
            "address1": add1,
            "gender": "1789", "state": "1789", "images" : "1789","CityID": "1"
            }

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/Employee`,body
    );

    dispatch({
      type: ADD_EMP_SUCCESS,
      payload: data,
    });

  } catch (error) {
    
    dispatch({
      type: ADD_EMP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEmp = (empId) => async (dispatch) => {

  try {
    dispatch({
      type: DELETE_EMP_REQUEST,
    });

    const body ={
       "level": "delete",
            "empId": empId,
            "empName": "empName",
            "empType": "3",
            "password": 'password',
            "BlockReason": "8",
            "address2": "add2",
            "notes": "notes",
            "totalpaid": "1",
            "totalRemain": "1",
            "IsBlocked": "22222222222222222222dddd222222222222222222222222222222222222222222222",
            "mobile1": "mob1",
            "mobile2": "mob2",
            "Email": "email",
            "address1": "add1",
            "gender": "1789", "state": "1789", "images" : "1789","CityID": "1"
            }

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/Employee`,body
    );

    if (data.table[0].column1 === "cant delete it") {
      throw new Error("لا يمكن الحذف لأن المندوب مرتبط ببيانات أخرى")
    }

    dispatch({
      type: DELETE_EMP_SUCCESS,
      payload: data,
    });


  } catch (error) {
    
    dispatch({
      type: DELETE_EMP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const hideEmp = (empId) => async (dispatch) => {
//   try {
//     dispatch({type:HIDE_EMP_REQUEST,payload:id})

//     const body = {
//             "level": "hide",
//             "empId": empId,
//             "empName": "empName",
//             "empType": "e",
//             "password": "password",
//             "BlockReason": "",
//             "address2":"add2",
//             "notes": "notes",
//             "totalpaid": "0",
//             "totalRemain": "0",
//             "IsBlocked": "-",
//             "mobile1": "mob1",
//             "mobile2": "mob2",
//             "Email": "email",
//             "address1": "add1",
//             "gender": "",
//             "state": "",
//             "images": "",
//             "CityID": "cityId"
//             }

//     const { data } = await axios.post(
//        `http://mhmodmj-001-site1.itempurl.com/api/Employee`,body
//     );

//     dispatch({type:HIDE_EMP_SUCCESS,payload:id})


//   } catch (error) {
    
//     console.error(error);
//   }
// };
// export const showEmp = (empId) => async (dispatch) => {
//   try {
//     dispatch({type:SHOW_EMP_REQUEST,payload:empId})

//     const body = {
//             "level": "show",
//             "empId": empId,
//             "empName": "empName",
//             "empType": "e",
//             "password": "password",
//             "BlockReason": "",
//             "address2":"add2",
//             "notes": "notes",
//             "totalpaid": "0",
//             "totalRemain": "0",
//             "IsBlocked": "-",
//             "mobile1": "mob1",
//             "mobile2": "mob2",
//             "Email": "email",
//             "address1": "add1",
//             "gender": "",
//             "state": "",
//             "images": "",
//             "CityID": "cityId"
//             }

//     const { data } = await axios.post(
//       `http://mhmodmj-001-site1.itempurl.com/api/Employee`,body
//     );
//     dispatch({type:SHOW_EMP_SUCCESS,payload:id})


//   } catch (error) {
    
//     console.error(error);
//   }
// };

export const updateEmp = (
  empId,
  empName,
  add1,
  add2,
  password,
  notes,
  mob1,
  mob2,
  email) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_EMP_REQUEST,
    });
    

    const body ={
            "level": "update",
            "empId": empId,
            "empName": empName,
            "empType": "3",
            "password": password,
            "BlockReason": "8",
            "address2": add2,
            "notes": notes,
            "totalpaid": "1",
            "totalRemain": "1",
            "IsBlocked": "22222222222222222222dddd222222222222222222222222222222222222222222222",
            "mobile1": mob1,
            "mobile2": mob2,
            "Email": email,
            "address1": add1,
            "gender": "1789", "state": "1789", "images" : "1789","CityID": "1"
            }

    const { data } = await axios.post(
      `http://mhmodmj-001-site1.itempurl.com/api/Employee`,body
    );

    

    dispatch({
      type: UPDATE_EMP_SUCCESS,
      payload: data,
    });

  } catch (error) {
    
    dispatch({
      type: UPDATE_EMP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setCurrentEmp = (emp) => async (dispatch) => {
    dispatch({
      type: SET_CURRENT_EMP,
      payload: emp,
    });
};

