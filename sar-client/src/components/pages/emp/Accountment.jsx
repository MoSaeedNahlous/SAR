import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import {
  addReportTable,
  deleteReportTable,
  getEmpsList,
  getReportList,
  getReportTable,
  updateReportTable,
} from '../../../redux/actions/empsActions';
import {
  ADD_REPORT_TABLE_RESET,
  DELETE_REPORT_TABLE_RESET,
  GET_EMPS_LIST_RESET,
  GET_REPORT_LIST_RESET,
  GET_REPORT_TABLE_RESET,
  UPDATE_REPORT_TABLE_RESET,
} from '../../../redux/constants/empConstants';
import { ReportGmailerrorredSharp } from '@mui/icons-material';
import {
  GET_BILL_DETAILS_RESET,
  REMOVE_PRODUCT_FROM_BILL_RESET,
} from '../../../redux/constants/billConstants';
import { GET_DELIVERY_COMPANIES_COST_RESET } from '../../../redux/constants/deliveryCompaniesCostConstants';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Accountment = ({ empST }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  useEffect(() => {
    if (!cookies.user) {
      nav('/manager/login', { replace: true });
    }
  }, [cookies.user]);

  const [emp, setEmp] = useState(1);
  const [report, setReport] = useState('');

  const [selected, setSelected] = useState('');

  const getEmpsListST = useSelector((state) => state.getEmpsList);
  const { empsList, loading: empsLoading, error: empsError } = getEmpsListST;

  const getReportListST = useSelector((state) => state.getReportList);
  const {
    reportList,
    loading: reportLoading,
    error: reportError,
  } = getReportListST;

  const getReportTableST = useSelector((state) => state.getReportTable);
  const {
    reportTable,
    loading: reportTableLoading,
    error: reportTableError,
  } = getReportTableST;

  const deleteReportTableST = useSelector((state) => state.deleteReportTable);
  const {
    success: deleteSuccess,
    loading: deleteLoading,
    error: deleteError,
  } = deleteReportTableST;

  const addReportTableST = useSelector((state) => state.addReportTable);
  const {
    success: addSuccess,
    loading: addLoading,
    error: addError,
  } = addReportTableST;

  const updateReportTableST = useSelector((state) => state.updateReportTable);
  const {
    success: updateSuccess,
    loading: updateLoading,
    error: updateError,
  } = updateReportTableST;

  useEffect(() => {
    dispatch({ type: GET_EMPS_LIST_RESET });
    dispatch({ type: GET_REPORT_LIST_RESET });
    dispatch({ type: GET_REPORT_TABLE_RESET });
    dispatch({ type: DELETE_REPORT_TABLE_RESET });
    dispatch({ type: ADD_REPORT_TABLE_RESET });
    dispatch({ type: UPDATE_REPORT_TABLE_RESET });
    if (!empST) {
      dispatch(getEmpsList());
    } else {
      dispatch(getReportTable(cookies.user.split('+')[0]));
    }
  }, []);

  useEffect(() => {
    if (!empST) {
      if (emp) {
        dispatch(getReportList(emp));
        dispatch(getReportTable(emp));
      }
    }
  }, [emp]);

  useEffect(() => {
    if (!empST) {
      if (deleteSuccess || addSuccess || updateSuccess) {
        if (emp) {
          dispatch(getReportTable(emp));

          if (addSuccess) {
            dispatch(getReportList(emp));
          }
        }
      }
    }
  }, [deleteSuccess, addSuccess, updateSuccess]);

  const onChangeHandler = (e) => {
    setSelected({ ...selected, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (report) {
      setSelected('');
    }
  }, [report]);

  if (empsLoading || reportLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={100} color='grey' />
      </Box>
    );
  }

  return (
    <div className='container'>
      {!empST && (
        <>
          <h3 className='text-center m-5'>?????? ???????????? ??????????????????</h3>
          <div className='w-50 mx-auto mt-5'>
            <div className='input-group mb-3'>
              <select
                className='form-select'
                value={emp}
                onChange={(e) => {
                  setEmp(e.target.value);
                }}
              >
                {empsList &&
                  empsList.map((emp) => (
                    <option value={emp.empId}>{emp.empName}</option>
                  ))}
              </select>
              <span className='input-group-text' id='basic-addon2'>
                ??????????????
              </span>
            </div>
            <div className='input-group mb-3'>
              <select
                className='form-select'
                value={report}
                onChange={(e) => {
                  setReport(e.target.value);
                }}
              >
                <option selected hidden disabled value={''}>
                  ???????? ??????????
                </option>
                {reportList &&
                  reportList.map((report) => (
                    <option key={report.purchaseId} value={report.purchaseId}>
                      {report.purchaseId}
                    </option>
                  ))}
              </select>
              <span className='input-group-text' id='basic-addon2'>
                ???????? ??????????
              </span>
            </div>
          </div>{' '}
        </>
      )}

      {/* {selected && (
        <div className='container mt-5'>
          <h5 className='text-center'>?????????? ?????? ????????</h5>
          <form
            className='w-50 mx-auto'
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(
                updateReportTable(
                  selected.asID,
                  selected.purchaseId,
                  selected.empId,
                  selected.discount,
                  selected.payoff,
                  selected.purchaseComm,
                  selected.deliveryComm,
                  selected.note,
                  selected.notedis,
                  selected.notepayoff
                )
              );
            }}
          >
            <div className='input-group mb-3'>
              <input
                type='text'
                className='form-control'
                readOnly
                value={selected.state}
              />
              <span className='input-group-text' id='basic-addon2'>
                ???????? ??????????????
              </span>
            </div>
            <div className='input-group mb-3'>
              <input
                type='text'
                className='form-control'
                readOnly
                value={selected.prodPrice}
              />
              <span className='input-group-text' id='basic-addon2'>
                ?????? ??????????
              </span>
            </div>
            <div className='input-group mb-3'>
              <input
                type='text'
                className='form-control'
                readOnly
                value={selected.selPrice}
              />
              <span className='input-group-text' id='basic-addon2'>
                ????????????
              </span>
            </div>
            <div className='input-group mb-3'>
              <input
                type='number'
                className='form-control'
                value={selected.purchaseComm}
                name='purchaseComm'
                onChange={onChangeHandler}
              />
              <span className='input-group-text' id='basic-addon2'>
                ?????????????? ???? ???????? ??????????????
              </span>
            </div>
            <div className='input-group mb-3'>
              <input
                type='number'
                className='form-control'
                value={selected.deliveryComm}
                name='deliveryComm'
                onChange={onChangeHandler}
              />
              <span className='input-group-text' id='basic-addon2'>
                ?????????????? ???? ???????? ??????????????
              </span>
            </div>
            <div className='input-group mb-3'>
              <input
                type='number'
                className='form-control'
                value={selected.allComm}
                name='allComm'
                onChange={onChangeHandler}
              />
              <span className='input-group-text' id='basic-addon2'>
                ?????????????? ????????????
              </span>
            </div>
            <div className='input-group mb-3'>
              <input
                type='datetime-local'
                className='form-control'
                readOnly
                value={selected.date}
              />
              <span className='input-group-text' id='basic-addon2'>
                ?????????? ?????????? ??????????????
              </span>
            </div>
            <div className='input-group mb-3'>
              <input type='number' className='form-control' />
              <span className='input-group-text' id='basic-addon2'>
                ?????? ????????????
              </span>
            </div>
            <div className='input-group mb-3'>
              <input
                type='number'
                className='form-control'
                value={selected.allComm}
                name='allComm'
                onChange={onChangeHandler}
              />
              <span className='input-group-text' id='basic-addon2'>
                ????????????????
              </span>
            </div>
            <div className='form-group mb-3'>
              <label dir='rlt' className='text-right d-block' id='basic-addon2'>
                ?????????????? ???? ????????????????
              </label>
              <textarea className='form-control' rows='2' cols='5'></textarea>
            </div>
            <div className='input-group mb-3'>
              <input
                type='number'
                className='form-control'
                value={selected.allComm}
                name='allComm'
                onChange={onChangeHandler}
              />
              <span className='input-group-text' id='basic-addon2'>
                ????????????????
              </span>
            </div>
            <div className='form-group mb-3'>
              <label dir='rlt' className='text-right d-block' id='basic-addon2'>
                ?????????????? ???? ????????????????
              </label>
              <textarea className='form-control' rows='2' cols='5'></textarea>
            </div>
            <div className='input-group mb-3'>
              <input type='datetime-local' className='form-control' />
              <span className='input-group-text' id='basic-addon2'>
                ?????????? ?????? ????????????
              </span>
            </div>
            <div className='form-group mb-3'>
              <label dir='rlt' className='text-right d-block' id='basic-addon2'>
                ??????????????
              </label>
              <textarea className='form-control' rows='2' cols='5'></textarea>
            </div>
            <button
              className='btn btn-primary d-block mx-auto w-25'
              type='submit'
              //   disabled={addLoading}
            >
              ??????????
            </button>
            <button
              className='btn btn-info d-block mx-auto w-25 mt-3'
              onClick={() => {
                setSelected('');
              }}
            >
              ?????????? ??????????
            </button>
          </form>
        </div>
      )} */}

      {report ? (
        <div className='container mt-5'>
          <h5 className='text-center'>?????????? ?????? ????????</h5>
          <form
            className='w-50 mx-auto'
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(
                addReportTable(
                  report,
                  emp,
                  selected.discount,
                  selected.payoff,
                  selected.purchaseComm,
                  selected.deliveryComm,
                  selected.note,
                  selected.notedis,
                  selected.notepayoff
                )
              );
              setSelected('');
              setReport('');
            }}
          >
            <div className='input-group mb-3'>
              <input
                type='number'
                className='form-control'
                value={selected.purchaseComm}
                name='purchaseComm'
                onChange={onChangeHandler}
              />
              <span className='input-group-text' id='basic-addon2'>
                ?????????????? ???? ???????? ??????????????
              </span>
            </div>
            <div className='input-group mb-3'>
              <input
                type='number'
                className='form-control'
                value={selected.deliveryComm}
                name='deliveryComm'
                onChange={onChangeHandler}
              />
              <span className='input-group-text' id='basic-addon2'>
                ?????????????? ???? ???????? ??????????????
              </span>
            </div>

            <div className='input-group mb-3'>
              <input
                type='number'
                className='form-control'
                value={selected.discount}
                name='discount'
                onChange={onChangeHandler}
              />
              <span className='input-group-text' id='basic-addon2'>
                ????????????????
              </span>
            </div>
            <div className='form-group mb-3'>
              <label dir='rlt' className='text-right d-block' id='basic-addon2'>
                ?????????????? ???? ????????????????
              </label>
              <textarea
                className='form-control'
                rows='2'
                cols='5'
                value={selected.notedis}
                name='notedis'
                onChange={onChangeHandler}
              ></textarea>
            </div>
            <div className='input-group mb-3'>
              <input
                type='number'
                className='form-control'
                value={selected.payoff}
                name='payoff'
                onChange={onChangeHandler}
              />
              <span className='input-group-text' id='basic-addon2'>
                ????????????????
              </span>
            </div>
            <div className='form-group mb-3'>
              <label dir='rlt' className='text-right d-block' id='basic-addon2'>
                ?????????????? ???? ????????????????
              </label>
              <textarea
                className='form-control'
                rows='2'
                cols='5'
                value={selected.notepayoff}
                name='notepayoff'
                onChange={onChangeHandler}
              ></textarea>
            </div>

            <div className='form-group mb-3'>
              <label dir='rlt' className='text-right d-block' id='basic-addon2'>
                ??????????????
              </label>
              <textarea
                className='form-control'
                rows='2'
                cols='5'
                value={selected.note}
                name='note'
                onChange={onChangeHandler}
              ></textarea>
            </div>
            <button
              className='btn btn-primary d-block mx-auto w-25'
              type='submit'
              disabled={addLoading}
            >
              ??????????
            </button>
          </form>
        </div>
      ) : (
        selected && (
          <div className='container mt-5'>
            <h5 className='text-center'>?????????? ?????? ????????</h5>
            <form
              className='w-50 mx-auto'
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(
                  updateReportTable(
                    selected.asID,
                    selected.purchaseId,
                    emp,
                    selected.discount,
                    selected.payoff,
                    selected.purchaseComm,
                    selected.deliveryComm,
                    selected.note,
                    selected.notedis,
                    selected.notepayoff
                  )
                );
                setSelected('');
                setReport('');
              }}
            >
              <div className='input-group mb-3'>
                <input
                  type='text'
                  className='form-control'
                  readOnly
                  value={selected.state}
                />
                <span className='input-group-text' id='basic-addon2'>
                  ???????? ??????????????
                </span>
              </div>
              <div className='input-group mb-3'>
                <input
                  type='text'
                  className='form-control'
                  readOnly
                  value={selected.prodPrice}
                />
                <span className='input-group-text' id='basic-addon2'>
                  ?????? ??????????
                </span>
              </div>
              <div className='input-group mb-3'>
                <input
                  type='text'
                  className='form-control'
                  readOnly
                  value={selected.selPrice}
                />
                <span className='input-group-text' id='basic-addon2'>
                  ????????????
                </span>
              </div>
              <div className='input-group mb-3'>
                <input
                  type='number'
                  className='form-control'
                  value={selected.purchaseComm}
                  name='purchaseComm'
                  onChange={onChangeHandler}
                />
                <span className='input-group-text' id='basic-addon2'>
                  ?????????????? ???? ???????? ??????????????
                </span>
              </div>
              <div className='input-group mb-3'>
                <input
                  type='number'
                  className='form-control'
                  value={selected.deliveryComm}
                  name='deliveryComm'
                  onChange={onChangeHandler}
                />
                <span className='input-group-text' id='basic-addon2'>
                  ?????????????? ???? ???????? ??????????????
                </span>
              </div>
              <div className='input-group mb-3'>
                <input
                  type='number'
                  className='form-control'
                  value={selected.allComm}
                  name='allComm'
                  onChange={onChangeHandler}
                />
                <span className='input-group-text' id='basic-addon2'>
                  ?????????????? ????????????
                </span>
              </div>
              <div className='input-group mb-3'>
                <input
                  type='datetime-local'
                  className='form-control'
                  readOnly
                  value={selected.date}
                />
                <span className='input-group-text' id='basic-addon2'>
                  ?????????? ?????????? ??????????????
                </span>
              </div>
              {/* <div className='input-group mb-3'>
                <input type='number' className='form-control' />
                <span className='input-group-text' id='basic-addon2'>
                  ?????? ????????????
                </span>
              </div> */}
              <div className='input-group mb-3'>
                <input
                  type='number'
                  className='form-control'
                  value={selected.discount}
                  name='discount'
                  onChange={onChangeHandler}
                />
                <span className='input-group-text' id='basic-addon2'>
                  ????????????????
                </span>
              </div>
              <div className='form-group mb-3'>
                <label
                  dir='rlt'
                  className='text-right d-block'
                  id='basic-addon2'
                >
                  ?????????????? ???? ????????????????
                </label>
                <textarea
                  className='form-control'
                  rows='2'
                  cols='5'
                  value={selected.notedis}
                  name='notedis'
                  onChange={onChangeHandler}
                ></textarea>
              </div>
              <div className='input-group mb-3'>
                <input
                  type='number'
                  className='form-control'
                  value={selected.payoff}
                  name='payoff'
                  onChange={onChangeHandler}
                />
                <span className='input-group-text' id='basic-addon2'>
                  ????????????????
                </span>
              </div>
              <div className='form-group mb-3'>
                <label
                  dir='rlt'
                  className='text-right d-block'
                  id='basic-addon2'
                >
                  ?????????????? ???? ????????????????
                </label>
                <textarea
                  className='form-control'
                  rows='2'
                  cols='5'
                  value={selected.notepayoff}
                  name='notepayoff'
                  onChange={onChangeHandler}
                ></textarea>
              </div>
              {/* <div className='input-group mb-3'>
                <input type='datetime-local' className='form-control' />
                <span className='input-group-text' id='basic-addon2'>
                  ?????????? ?????? ????????????
                </span>
              </div> */}
              <div className='form-group mb-3'>
                <label
                  dir='rlt'
                  className='text-right d-block'
                  id='basic-addon2'
                >
                  ??????????????
                </label>
                <textarea
                  className='form-control'
                  rows='2'
                  cols='5'
                  value={selected.note}
                  name='note'
                  onChange={onChangeHandler}
                ></textarea>
              </div>
              <button
                className='btn btn-primary d-block mx-auto w-25'
                type='submit'
                disabled={updateLoading}
              >
                ??????????
              </button>
              <button
                className='btn btn-info d-block mx-auto w-25 mt-3'
                onClick={() => {
                  setSelected('');
                }}
              >
                ?????????? ??????????
              </button>
            </form>
          </div>
        )
      )}

      {reportTableLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={80} color='grey' />
        </Box>
      ) : (
        <div className='table-responsive'>
          <table
            className='table table-bordered table-striped w-100 mt-3 mx-auto'
            dir='rtl'
            style={{ minWidth: '1600px' }}
          >
            <thead>
              <tr className='bg-primary text-white'>
                <th>?????? ??????????</th>
                <th>?????? ??????????????</th>
                <th>??????????????</th>
                <th>?????? ??????????</th>
                <th>????????????</th>
                <th>??????????????</th>
                <th>?????????????? ???? ???????? ??????????????</th>
                <th>????????????</th>
                <th>?????????????? ?????? ????????????????</th>
                <th>????????????????</th>
                <th>?????????????? ?????? ????????????????</th>
                <th>?????????????? ????????????</th>
                <th>??????????????</th>
                <th>?????????? ?????? ????????????</th>
                <th>???????? ??????????????</th>
                <th>??????????????</th>
                <th>??????????????</th>
                <th className='text-center'>????????????</th>
              </tr>
            </thead>
            <tbody>
              {reportTable.map((report) => (
                <tr key={report.asID}>
                  <td>{report.asID}</td>
                  <td>{report.purchaseId}</td>
                  <td>{report.empName}</td>
                  <td>{report.prodPrice}</td>
                  <td>{report.selPrice}</td>
                  <td>{report.purchaseComm}</td>
                  <td>{report.deliveryComm}</td>
                  <td>{report.discount}</td>
                  <td>{report.notedis}</td>
                  <td>{report.payoff}</td>
                  <td>{report.notepayoff}</td>
                  <td>{report.allComm}</td>
                  <td>{report.address}</td>
                  <td>{format(new Date(report.date), 'yyyy-M-d h:m a')}</td>

                  <td>{report.state}</td>
                  <td>{report.note}</td>
                  <td>{report.cityName}</td>
                  <td className='d-flex justify-content-center'>
                    {!empST && (
                      <>
                        <button
                          className='btn btn-danger mx-2'
                          disabled={deleteLoading}
                          onClick={() => {
                            if (confirm('???? ?????? ????????????')) {
                              dispatch(deleteReportTable(report.asID));
                            }
                          }}
                        >
                          {deleteLoading ? (
                            <CircularProgress color='inherit' size={15} />
                          ) : (
                            '??????'
                          )}
                        </button>
                        <button
                          className='btn btn-primary mx-2'
                          disabled={report == selected}
                          onClick={() => {
                            setReport('');
                            setSelected(report);
                            document
                              .getElementById('root')
                              .scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          ????????????
                        </button>
                      </>
                    )}
                    <button
                      className='btn btn-primary mx-2'
                      disabled={report == selected}
                      onClick={() => {
                        localStorage.removeItem('currentBillId');
                        localStorage.setItem(
                          'currentBillId',
                          JSON.stringify(report.purchaseId)
                        );
                        dispatch({ type: GET_BILL_DETAILS_RESET });
                        dispatch({ type: GET_EMPS_LIST_RESET });
                        dispatch({ type: GET_DELIVERY_COMPANIES_COST_RESET });
                        dispatch({ type: REMOVE_PRODUCT_FROM_BILL_RESET });

                        nav('/return-to-current-order');
                      }}
                    >
                      ?????? ??????????????
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Accountment;
