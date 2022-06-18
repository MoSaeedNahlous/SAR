import { Alert, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  blockEmp,
  deleteEmp,
  getEmps,
  unBlockEmp,
} from '../../../../redux/actions/empsActions';
import {
  ADD_EMP_RESET,
  BLOCK_EMP_RESET,
  DELETE_EMP_RESET,
  SET_CURRENT_EMP,
  SET_CURRENT_EMP_RESET,
  UPDATE_EMP_RESET,
} from '../../../../redux/constants/empConstants';

const Emps = () => {
  const dispatch = useDispatch();

  const currentEmp = useSelector((state) => state.setCurrentEmp);
  const { currentEmp: current } = currentEmp;

  const emps = useSelector((state) => state.getEmps);
  const { emps: empsList, error, loading } = emps;

  const deleteEmpSt = useSelector((state) => state.deleteEmp);
  const { success, error: deleteError, loading: deleteLoading } = deleteEmpSt;

  const blockEmpSt = useSelector((state) => state.blockEmp);
  const {
    success: blockSuccess,
    error: blockError,
    loading: blockLoading,
  } = blockEmpSt;

  const addEmpSt = useSelector((state) => state.addEmp);
  const {
    success: addSuccess,
    error: addError,
    loading: addLoading,
  } = addEmpSt;

  const updateEmpSt = useSelector((state) => state.updateEmp);
  const {
    success: updateSuccess,
    error: updateError,
    loading: updateLoading,
  } = updateEmpSt;

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch({ type: SET_CURRENT_EMP_RESET });
    dispatch({ type: UPDATE_EMP_RESET });
    dispatch({ type: ADD_EMP_RESET });
    dispatch({ type: BLOCK_EMP_RESET });
    dispatch(getEmps());
  }, []);

  useEffect(() => {
    if (success || updateSuccess || addSuccess || blockSuccess) {
      dispatch(getEmps());
    }
  }, [success, updateSuccess, addSuccess, blockSuccess]);

  const deleteHandler = (id) => {
    dispatch(deleteEmp(id));
  };

  const searchHandler = () => {
    if (search === '') {
      dispatch(getEmps());
    } else {
      dispatch(getEmps(search));
    }
  };

  const blockHandler = (id) => {
    var x = prompt('سبب الحظر');
    if (x != null) {
      dispatch(blockEmp(id, x));
    }
  };

  if (error) {
    return <Alert severity='error'>{error}</Alert>;
  }
  return (
    <div>
      {error && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: DELETE_EMP_RESET });
          }}
        >
          {error}
        </Alert>
      )}
      {blockError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: BLOCK_EMP_RESET });
          }}
        >
          {blockError}
        </Alert>
      )}
      {success && (
        <Alert
          onClose={() => {
            dispatch({ type: DELETE_EMP_RESET });
          }}
        >
          تم الحذف بنجاح
        </Alert>
      )}
      {blockSuccess && (
        <Alert
          onClose={() => {
            dispatch({ type: BLOCK_EMP_RESET });
          }}
        >
          تمت العملية بنجاح
        </Alert>
      )}
      {deleteError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: DELETE_EMP_RESET });
          }}
        >
          {deleteError}
        </Alert>
      )}

      <h2 className='text-center mt-5'>الموظفون</h2>
      <div className='form-group w-75 mb-3 mx-auto' dir='rtl'>
        <label htmlFor='search-for-employee' className='form-label mt-4'>
          البحث عن مندوب
        </label>
        <input
          type='text'
          className='form-control'
          name='search-for-employee'
          placeholder='اكتب اسم أو جزء من اسم المندوب'
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
        <button
          className='btn btn-primary btn-sm w-25 mx-auto'
          onClick={searchHandler}
        >
          بحث
        </button>
      </div>

      <div className='container-fluid px-5'>
        {/* <nav style={{border:'solid 1px black'}}>
            <ul className='pagination'>
                {pageNumbers.map((number) => (   
                    <li key={ number } className='page-item'>
                        <a href='!#' className='page-link'>
                            {number}
                        </a>
                    </li> 
                ))}
            </ul>
        </nav> */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={100} color='grey' />
          </Box>
        ) : (
          <div className='table-responsive'>
            <table
              className='table table-bordered table-striped mx-auto'
              dir='rtl'
            >
              <thead>
                <tr className='bg-primary text-white'>
                  <th scope='col'>ID</th>
                  <th scope='col'>الاسم</th>
                  <th scope='col'>كلمة المرور</th>
                  <th scope='col'>رقم الجوال الأول</th>
                  <th scope='col'>رقم الجوال الثاني</th>
                  <th scope='col'>البريد الإلكتروني</th>
                  <th scope='col'>المدينة</th>
                  <th scope='col'>الحي</th>
                  <th scope='col'>ملاحظات</th>
                  <th scope='col'>خيارات</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.9rem' }}>
                {empsList.map((emp) => (
                  <tr key={emp.empId}>
                    <td>{emp.empId}</td>
                    <td>{emp.empName}</td>
                    <td>{emp.password}</td>
                    <td>{emp.mobile1}</td>
                    <td>{emp.mobile2}</td>
                    <td>{emp.email}</td>
                    <td>{emp.address1}</td>
                    <td>{emp.address2}</td>
                    <td>{emp.notes}</td>
                    <td>
                      <button
                        style={{ width: '75px' }}
                        className='btn btn-primary mx-2 my-1'
                        onClick={() => {
                          dispatch({ type: SET_CURRENT_EMP, payload: emp }),
                            document
                              .getElementById('root')
                              .scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        تعديل
                      </button>
                      <button
                        style={{ width: '75px' }}
                        className='btn btn-danger mx-2'
                        onClick={() => deleteHandler(String(emp.empId))}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? (
                          <CircularProgress color='inherit' size={15} />
                        ) : (
                          'حذف'
                        )}
                      </button>
                      {emp.isBlocked === 'blocked' ? (
                        <button
                          style={{ width: '75px' }}
                          className='btn btn-warning mx-2'
                          onClick={() => dispatch(unBlockEmp(emp.empId))}
                          disabled={blockLoading}
                        >
                          {blockLoading ? (
                            <CircularProgress color='inherit' size={15} />
                          ) : (
                            'إلغاء الحظر'
                          )}
                        </button>
                      ) : (
                        <button
                          style={{ width: '75px' }}
                          className='btn btn-warning mx-2'
                          onClick={() => blockHandler(emp.empId)}
                          disabled={blockLoading}
                        >
                          {blockLoading ? (
                            <CircularProgress color='inherit' size={15} />
                          ) : (
                            'حظر'
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Emps;
