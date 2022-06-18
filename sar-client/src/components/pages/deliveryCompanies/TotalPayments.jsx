import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';
import {
  addDeliveryCompaniesPayments,
  deleteDeliveryCompaniesPayments,
  getDeliveryCompanies,
  getDeliveryCompaniesPayments,
  getDeliveryListCompanies,
  updateDeliveryCompaniesPayments,
} from '../../../redux/actions/deliveryCompaniesActions';
import {
  ADD_DELIVERY_COMPANIES_PAYMENTS_RESET,
  DELETE_DELIVERY_COMPANIES_PAYMENTS_RESET,
  GET_DELIVERY_COMPANIES_LIST_REQUEST,
  GET_DELIVERY_COMPANIES_LIST_RESET,
  GET_DELIVERY_COMPANIES_PAYMENTS_RESET,
  UPDATE_DELIVERY_COMPANIES_PAYMENTS_RESET,
} from '../../../redux/constants/deliveryCompaniesConstants';
import { updateDeliveryCompaniesPaymentsReducer } from '../../../redux/reducers/deliveryCompaniesReducers';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const TotalPayments = () => {
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

  const getDeliveryCompaniesST = useSelector(
    (state) => state.getDeliveryCompaniesList
  );
  const { deliveryCompaniesList, loading, error } = getDeliveryCompaniesST;

  const getDeliveryCompaniesPaymentsST = useSelector(
    (state) => state.getDeliveryCompaniesPayments
  );
  const {
    deliveryCompaniesPayments,
    loading: deliveryCompaniesPaymentsLoading,
    error: deliveryCompaniesPaymentsError,
  } = getDeliveryCompaniesPaymentsST;

  const deleteDeliveryCompaniesPaymentsST = useSelector(
    (state) => state.deleteDeliveryCompaniesPayments
  );
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = deleteDeliveryCompaniesPaymentsST;

  const updateDeliveryCompaniesPaymentsST = useSelector(
    (state) => state.updateDeliveryCompaniesPayments
  );
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = updateDeliveryCompaniesPaymentsST;

  const addDeliveryCompaniesPaymentsST = useSelector(
    (state) => state.addDeliveryCompaniesPayments
  );
  const {
    loading: addLoading,
    success: addSuccess,
    error: addError,
  } = addDeliveryCompaniesPaymentsST;

  const [from, setFrom] = useState('-');
  const [to, setTo] = useState('-');
  const [DC, setDC] = useState(0);

  const [total, setTotal] = useState(0);
  const [remain, setRemain] = useState(0);
  const [paid, setPaid] = useState(0);

  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  const [selectedPayment, setSelectedPayment] = useState('');

  useEffect(() => {
    dispatch({ type: GET_DELIVERY_COMPANIES_LIST_RESET });
    dispatch({ type: GET_DELIVERY_COMPANIES_PAYMENTS_RESET });
    dispatch({ type: DELETE_DELIVERY_COMPANIES_PAYMENTS_RESET });
    dispatch({ type: UPDATE_DELIVERY_COMPANIES_PAYMENTS_RESET });
    dispatch({ type: ADD_DELIVERY_COMPANIES_PAYMENTS_RESET });
    dispatch(getDeliveryListCompanies());
  }, []);

  useEffect(() => {
    if (deleteSuccess || updateSuccess || addSuccess) {
      dispatch(getDeliveryCompaniesPayments(DC, from, to));
      setSelectedPayment('');
    }
  }, [deleteSuccess, updateSuccess, addSuccess]);

  useEffect(() => {
    const getSum = async (id, from, to) => {
      const { data } = await axios.get(
        `/api/DeliveryPaid?level=selectTotal&DeliveryID=${id}&date=${from}&date2=${to}`
      );
      setTotal(data.table[0].total);
      setPaid(data.table1[0].paid);
    };

    if (DC == 0) {
      getSum(-10, from, to);
    } else {
      getSum(DC, from, to);
    }
  }, [DC, from, to, updateSuccess, deleteSuccess, addSuccess]);

  useEffect(() => {
    dispatch(getDeliveryCompaniesPayments(DC, from, to));
  }, [from, to, DC]);

  return (
    <div className='container'>
      <h3 className='text-center m-3'>كشوفات شركة التوصيل</h3>
      <div className='w-25 mx-auto mt-5'>
        <div className='input-group mb-3'>
          <input
            type='date'
            className='form-control'
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
            }}
          />
          <span className='input-group-text' id='basic-addon2'>
            من
          </span>
        </div>
        <div className='input-group mb-3'>
          <input
            type='date'
            className='form-control'
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
            }}
          />
          <span className='input-group-text' id='basic-addon2'>
            إلى
          </span>
        </div>
        <div className='input-group mb-3'>
          <select
            className='form-select'
            value={DC}
            onChange={(e) => {
              setDC(e.target.value);
            }}
          >
            <option selected value={0}>
              كل الشركات
            </option>
            {deliveryCompaniesList &&
              deliveryCompaniesList.map((DC) => (
                <option value={DC.deliveryID}>{DC.deliveryName}</option>
              ))}
          </select>
          <span className='input-group-text' id='basic-addon2'>
            اختر شركة التوصيل
          </span>
        </div>
      </div>
      <div className='w-25 mx-auto mt-5'>
        <table className='table table-info table-striped text-center'>
          <tbody>
            <tr>
              <th
                style={{
                  borderRight: '0.5px solid white',
                  borderBottom: '0.5px solid white',
                }}
              >
                المجموع الكلي
              </th>
              <td style={{ borderBottom: '0.5px solid white' }}>{total}</td>
            </tr>
            <tr>
              <th
                style={{
                  borderRight: '0.5px solid white',
                  borderBottom: '0.5px solid white',
                }}
              >
                المدفوع
              </th>
              <td style={{ borderBottom: '0.5px solid white' }}>{paid}</td>
            </tr>
            <tr>
              <th style={{ borderRight: '0.5px solid white' }}>المتبقي</th>
              <td>{parseInt(total) - parseInt(paid)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        {selectedPayment && (
          <div className='container'>
            <form
              className='w-50 mx-auto'
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(
                  updateDeliveryCompaniesPayments(
                    selectedPayment.id,
                    selectedPayment.value,
                    selectedPayment.note,
                    selectedPayment.date
                  )
                );
              }}
            >
              <div className='input-group mb-3'>
                <input
                  type='number'
                  className='form-control'
                  value={selectedPayment.value}
                  onChange={(e) => {
                    setSelectedPayment({
                      ...selectedPayment,
                      value: e.target.value,
                    });
                  }}
                />
                <span className='input-group-text' id='basic-addon2'>
                  القيمة
                </span>
              </div>
              <div className='input-group mb-3'>
                <input
                  type='date'
                  className='form-control'
                  value={format(new Date(selectedPayment.date), 'yyyy-MM-dd')}
                  onChange={(e) => {
                    setSelectedPayment({
                      ...selectedPayment,
                      date: e.target.value,
                    });
                  }}
                />
                <span className='input-group-text' id='basic-addon2'>
                  التاريخ
                </span>
              </div>
              <div className='form-group mb-3'>
                <label
                  dir='rlt'
                  className='text-right d-block'
                  id='basic-addon2'
                >
                  ملاحظات
                </label>
                <textarea
                  className='form-control'
                  rows='2'
                  cols='5'
                  value={selectedPayment.note}
                  onChange={(e) => {
                    setSelectedPayment({
                      ...selectedPayment,
                      note: e.target.value,
                    });
                  }}
                ></textarea>
              </div>
              <button
                className='btn btn-primary d-block mx-auto w-25'
                type='submit'
                disabled={updateLoading}
              >
                تعديل
              </button>
              <button
                className='btn btn-secondary d-block mx-auto mt-2 w-25'
                onClick={() => {
                  setSelectedPayment('');
                }}
              >
                إزالة التحديد
              </button>
            </form>
          </div>
        )}
        {DC != 0 && (
          <div className='container'>
            <form
              className='w-50 mx-auto'
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(addDeliveryCompaniesPayments(DC, value, note, date));
              }}
            >
              <h3>إنشاء كشف</h3>
              <div className='input-group mb-3'>
                <input
                  type='number'
                  className='form-control'
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
                <span className='input-group-text' id='basic-addon2'>
                  القيمة
                </span>
              </div>
              <div className='input-group mb-3'>
                <input
                  type='date'
                  className='form-control'
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
                <span className='input-group-text' id='basic-addon2'>
                  التاريخ
                </span>
              </div>
              <div className='form-group mb-3'>
                <label
                  dir='rlt'
                  className='text-right d-block'
                  id='basic-addon2'
                >
                  ملاحظات
                </label>
                <textarea
                  className='form-control'
                  rows='2'
                  cols='5'
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                ></textarea>
              </div>
              <button
                className='btn btn-primary d-block mx-auto w-25'
                type='submit'
                disabled={addLoading}
              >
                إنشاء
              </button>
            </form>
          </div>
        )}
        <h3 className='text-center fw-bold mb-3 mt-5'>كشوفات الحساب</h3>
        <div className='table-responsive'>
          <table
            className='table table-bordered table-striped w-100 mx-auto'
            dir='rtl'
          >
            <thead>
              <tr className='bg-primary text-white'>
                <th>ID</th>
                <th>شركة التوصيل</th>
                <th>القيمة</th>
                <th>التاريخ</th>
                <th>ملاحظات</th>
                <th className='text-center'>خيارات</th>
              </tr>
            </thead>
            {deliveryCompaniesPaymentsLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={100} color='grey' />
              </Box>
            ) : (
              <tbody>
                {deliveryCompaniesPayments &&
                  deliveryCompaniesPayments.map((payment, index) => (
                    <tr key={payment.id}>
                      <td>{index + 1}</td>
                      <td>{payment.deliveryName}</td>
                      <td>{payment.value}</td>
                      <td>{format(new Date(payment.date), 'yyyy-MM-dd')}</td>
                      <td>{payment.note}</td>
                      <td className='d-flex justify-content-center'>
                        <button
                          className='btn btn-danger mx-2'
                          onClick={() =>
                            dispatch(
                              deleteDeliveryCompaniesPayments(payment.id)
                            )
                          }
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
                            setSelectedPayment(payment);
                            document
                              .getElementById('root')
                              .scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          تعديل
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default TotalPayments;
