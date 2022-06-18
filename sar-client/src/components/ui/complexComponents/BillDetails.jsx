import { CircularProgress, Alert } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  acceptBill,
  barcodeDelete,
  barcodeInsert,
  barcodeOutput,
  cancelBill,
  getBillDetails,
  getBillProducts,
  removeProductFromBill,
  restoreBill,
  restoreProductToBill,
  sendBill,
  updateBillProducts,
} from '../../../redux/actions/billActions';
import { getDeliveryListCompanies } from '../../../redux/actions/deliveryCompaniesActions';
import { getDeliveryCompaniesCostByCity } from '../../../redux/actions/deliveryCompaniesCostActions';

import { getEmpsList } from '../../../redux/actions/empsActions';
import { GET_DELIVERY_COMPANIES_LIST_RESET } from '../../../redux/constants/deliveryCompaniesConstants';
import { GET_EMPS_LIST_RESET } from '../../../redux/constants/empConstants';
import { getCities } from '../../../redux/actions/citiesActions';
import { useNavigate, Link } from 'react-router-dom';
import {
  BARCODE_RESET,
  CANCEL_BILL_RESET,
  REMOVE_PRODUCT_FROM_BILL_REQUEST,
  REMOVE_PRODUCT_FROM_BILL_RESET,
  RESTORE_PRODUCT_TO_BILL_RESET,
  SEND_BILL_RESET,
  UPDATE_BILL_PRODUCTS_RESET,
  GET_BILL_DETAILS_RESET,
} from '../../../redux/constants/billConstants';
// import {} from '../../../redux/constants/bill'
import { GET_DELIVERY_COMPANIES_COST_RESET } from '../../../redux/constants/deliveryCompaniesCostConstants';
import QRCode from 'react-qr-code';
import { useCookies } from 'react-cookie';

const BillDetails = ({ emp }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  useEffect(() => {
    if (!cookies.user) {
      nav('/manager/login', { replace: true });
    }
  }, [cookies.user]);

  const barcodeInput = useRef(null);

  const [name, setName] = useState('');
  const [productsGrid, setProductsGrid] = useState({});
  const onChangeGrid = (e) => {
    setProductsGrid({ ...productsGrid, [e.target.name]: e.target.value });
  };
  const [productsState, setProductsState] = useState([]);

  const [footerTotalHP, setFooterTotalHP] = useState(0);
  const [footerTotalSP, setFooterTotalSP] = useState(0);
  const [footerTotalQU, setFooterTotalQU] = useState(0);

  const [barcodeRadio, setBarcodeRadio] = useState('');
  const [delCostST, setDelCostST] = useState(0);
  const [payments, setPayments] = useState({
    prodPrice: 0,
    selPrice: 0,
    purComm: 0,
    delCom: 0,
    cityCost: 0,
    delCost: 0,
    totalPrice: 0,
    delDel: 0,
    allCom: 0,
    delComp: 0,
  });

  const cities = useSelector((state) => state.getCities);
  const {
    cities: citiesList,
    loading: citiesLoading,
    error: citiesError,
  } = cities;

  const getEmpsListST = useSelector((state) => state.getEmpsList);
  const {
    empsList,
    loading: empsListLoading,
    error: empsListError,
  } = getEmpsListST;

  const getDeliveryCompaniesCostST = useSelector(
    (state) => state.getDeliveryCompaniesCost
  );
  const {
    deliveryCompaniesCost,
    loading: DeliveryCompaniesCostLoading,
    error: DeliveryCompaniesCostError,
  } = getDeliveryCompaniesCostST;

  const getBillDetailsST = useSelector((state) => state.getBillDetails);
  const {
    billDetails,
    loading: billDetailsLoading,
    error: billDetailsError,
  } = getBillDetailsST;

  const getBillProductsST = useSelector((state) => state.getBillProducts);
  const {
    billProducts,
    loading: billProductsLoading,
    error: billProductsError,
  } = getBillProductsST;

  const removeProductFromBillST = useSelector(
    (state) => state.removeProductFromBill
  );
  const {
    success: removeProductSuccess,
    loading: removeProductLoading,
    error: removeProductError,
  } = removeProductFromBillST;

  const restoreProductToBillST = useSelector(
    (state) => state.restoreProductToBill
  );
  const {
    success: restoreProductSuccess,
    loading: restoreProductLoading,
    error: restoreProductError,
  } = restoreProductToBillST;

  const cancelBillST = useSelector((state) => state.cancelBill);
  const {
    success: cancelBillSuccess,
    loading: cancelBillLoading,
    error: cancelBillError,
  } = cancelBillST;

  const restoreBillST = useSelector((state) => state.restoreBill);
  const {
    success: restoreBillSuccess,
    loading: restoreBillLoading,
    error: restoreBillError,
  } = restoreBillST;

  const barcodeST = useSelector((state) => state.barcode);
  const {
    success: barcodeSuccess,
    loading: barcodeLoading,
    error: barcodeError,
  } = barcodeST;

  const acceptBillST = useSelector((state) => state.acceptBill);
  const {
    success: acceptBillSuccess,
    loading: acceptBillLoading,
    error: acceptBillError,
  } = acceptBillST;

  const sendBillST = useSelector((state) => state.sendBill);
  const {
    success: sendBillSuccess,
    loading: sendBillLoading,
    error: sendBillError,
  } = sendBillST;

  const updateBillProductsST = useSelector((state) => state.updateBillProducts);
  const {
    success: updateBillProductsSuccess,
    loading: updateBillProductsLoading,
    error: updateBillProductsError,
  } = updateBillProductsST;

  const [data, setData] = useState({
    purchaseId: '',
    address: '',
    mobile1: '',
    mobile2: '',
    url: '',
    state: '',
    note: '',
    date: Date.now(),
    deliveryID: '',
    billID: '',
    cityID: '',
    empId: '',
    userName: '',
    empName: '',
    deliveryName: '',
    cityName: '',
    deliveryCost: '',
    cityCost: '',
    deliveryComp: '',
    allComm: '',
    selPrice: '',
    prodPrice: '',
    purchaseComm: '',
    totalPrice: '',
    deliveryComm: '',
    deliveryDel: '',
  });

  useEffect(() => {
    if (localStorage.getItem('currentBillId') != null) {
      dispatch({ type: GET_BILL_DETAILS_RESET });
      dispatch({ type: GET_EMPS_LIST_RESET });
      dispatch({ type: GET_DELIVERY_COMPANIES_COST_RESET });
      dispatch({ type: REMOVE_PRODUCT_FROM_BILL_RESET });
      dispatch({ type: RESTORE_PRODUCT_TO_BILL_RESET });
      dispatch({ type: CANCEL_BILL_RESET });
      dispatch({ type: BARCODE_RESET });
      dispatch({ type: UPDATE_BILL_PRODUCTS_RESET });
      dispatch({ type: SEND_BILL_RESET });
      dispatch(getBillProducts(localStorage.getItem('currentBillId')));
      dispatch(getEmpsList());
      dispatch(getCities());
    } else {
      nav('/', { replace: true });
    }
  }, [localStorage.getItem('currentBillId')]);
  useEffect(() => {
    if (billProducts) {
      setProductsState(billProducts);
    }
  }, [billProducts]);

  useEffect(() => {
    if (productsState) {
      var totalHP = 0;
      var totalSP = 0;
      var totalQU = 0;
      productsState.map((prod) => {
        totalHP += prod.hprice * prod.allQuantity;
        totalSP += prod.sprice * prod.allQuantity;
        totalQU += prod.allQuantity;
      });
      setFooterTotalHP(totalHP);
      setFooterTotalSP(totalSP);
      setFooterTotalQU(totalQU);
    }
  }, [productsState]);

  useEffect(() => {
    if (data.cityID) {
      dispatch(getDeliveryCompaniesCostByCity(data.cityID));
    }
  }, [data.cityID]);

  useEffect(() => {
    if (data.deliveryID && deliveryCompaniesCost.length > 0) {
      var costt = deliveryCompaniesCost.filter(
        (CD) => CD.deliveryID == data.deliveryID
      );
      console.log(costt);
      if (costt.length > 0) {
        setData({ ...data, deliveryCost: costt[0].cost });
      }
    }
  }, [data.deliveryID, deliveryCompaniesCost]);

  function selectElementContents(el) {
    var body = document.body,
      range,
      sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
        document.execCommand('copy');
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
    }
  }

  useEffect(() => {
    if (removeProductSuccess || restoreProductSuccess) {
      dispatch(getBillProducts(localStorage.getItem('currentBillId')));
    }
  }, [removeProductSuccess, restoreProductSuccess]);

  useEffect(() => {
    if (
      cancelBillSuccess ||
      restoreBillSuccess ||
      barcodeSuccess ||
      acceptBillSuccess ||
      sendBillSuccess
    ) {
      dispatch(
        getBillDetails(JSON.parse(localStorage.getItem('currentBillId')))
      );
      dispatch(getBillProducts(localStorage.getItem('currentBillId')));
    }
  }, [
    cancelBillSuccess,
    restoreBillSuccess,
    barcodeSuccess,
    acceptBillSuccess,
  ]);

  useEffect(() => {
    if (data.state) {
      if (data.state == 'فارغة') {
        setBarcodeRadio('input');
      }
      if (data.state == 'في الانتظار' || data.state == 'غير مكتملة') {
        setBarcodeRadio('output');
      }
      if (data.state == 'قيد العمل' || data.state == 'تم التسليم') {
        setBarcodeRadio('delete');
      }
    }
  }, [data.state]);

  useEffect(() => {
    if (localStorage.getItem('currentBillId') !== null) {
      dispatch(
        getBillDetails(JSON.parse(localStorage.getItem('currentBillId')))
      );
    } else {
      setData({
        purchaseId: '',
        address: '',
        mobile1: '',
        mobile2: '',
        url: '',
        state: '',
        note: '',
        date: Date.now(),
        deliveryID: '',
        billID: '',
        cityID: '',
        empId: '',
        userName: '',
        empName: '',
        deliveryName: '',
        cityName: '',
        deliveryCost: '',
        cityCost: '',
        deliveryComp: '',
        allComm: '',
        selPrice: '',
        prodPrice: '',
        purchaseComm: '',
        totalPrice: '',
        deliveryComm: '',
        deliveryDel: '',
      });
      setPayments({
        prodPrice: 0,
        selPrice: 0,
        purComm: 0,
        delCom: 0,
        cityCost: 0,
        delCost: 0,
        totalPrice: 0,
        delDel: 0,
        allCom: 0,
        delComp: 0,
      });
    }
  }, []);

  useEffect(() => {
    if (data.deliveryID) {
      setPayments({
        ...payments,
        selPrice: data.selPrice,
        prodPrice: data.prodPrice,
        cityCost: data.cityCost,
        delCost: data.deliveryCost,
        purComm: payments.selPrice - payments.prodPrice,
        delCom: payments.delCost - payments.cityCost,
        totalPrice: payments.selPrice + payments.delCost,
        delDel: payments.selPrice + payments.delCom,
        allCom: payments.delCom + payments.purComm,
        delComp: payments.delCost + payments.selPrice,
      });
    }
  }, [data.deliveryCost]);

  useEffect(() => {
    if (payments.delCost) {
      setPayments({
        ...payments,
        purComm: footerTotalSP - footerTotalHP,
        delCom: payments.delCost - payments.cityCost,
        totalPrice: parseInt(payments.selPrice) + parseInt(payments.delCost),
        delDel: payments.selPrice + payments.delCom,
        allCom: payments.delCom + payments.purComm,
        delComp: payments.delCost + payments.selPrice,
      });
    }
  }, [payments.delCost, footerTotalSP, footerTotalHP]);
  const onChangeDataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (billDetails && billDetails.purchaseId) {
      setData(billDetails);
    } else {
      setData({
        purchaseId: '',
        address: '',
        mobile1: '',
        mobile2: '',
        url: '',
        state: '',
        note: '',
        date: Date.now(),
        deliveryID: '',
        billID: '',
        cityID: '',
        empId: '',
        userName: '',
        empName: '',
        deliveryName: '',
        cityName: '',
        deliveryCost: '',
        cityCost: '',
        deliveryComp: '',
        allComm: '',
        selPrice: '',
        prodPrice: '',
        purchaseComm: '',
        totalPrice: '',
        deliveryComm: '',
        deliveryDel: '',
      });
    }
  }, [billDetails]);

  // useEffect(() => {
  //   if (sendBillSuccess) {

  //     dispatch({type:SEND_BILL_RESET})
  //   }
  // }, [sendBillSuccess]);

  const acceptBillHandler = () => {
    var arr = [];
    var tbody = document.getElementById('tbody');
    productsState.map((prod, index) => {
      arr[index] = [
        index + 1,
        prod.subPurID,
        prod.allQuantity,
        prod.hprice,
        prod.sprice,
        prod.pSizeQuantityID,
        prod.notes,
      ];
    });

    dispatch(
      acceptBill(
        data.purchaseId,
        data.empId,
        data.address,
        data.mobile1,
        data.mobile2,
        data.url,
        payments.delCost,
        footerTotalSP,
        footerTotalHP,
        data.note,
        data.deliveryID,
        data.billID,
        data.cityID,
        arr
      )
    );
  };

  const sendBillHandler = (redirect) => {
    var arr = [];
    billProducts.map((prod, index) => {
      arr[index] = [
        index + 1,
        prod.subPurID,
        prod.allQuantity,
        prod.hprice,
        prod.sprice,
        prod.pSizeQuantityID,
        prod.notes,
      ];
    });
    dispatch(
      sendBill(
        data.purchaseId,
        data.empId,
        data.address,
        data.mobile1,
        data.mobile2,
        data.url,
        payments.delCost,
        footerTotalSP,
        footerTotalHP,
        data.note,
        data.deliveryID,
        data.billID,
        data.cityID,
        arr
      )
    );
    if (sendBillSuccess && redirect === true) {
      nav('/orders');
      dispatch({ type: SEND_BILL_RESET });
    }
  };

  function printBill() {
    var divToPrint = document.getElementById('table');
    var newWin = window.open('');
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  }

  const keyUpHandler = (e) => {
    if (e.key === 'Enter') {
      if (barcodeRadio === 'insert') {
        dispatch(
          barcodeInsert(localStorage.getItem('currentBillId'), e.target.value)
        );
      } else if (barcodeRadio === 'output') {
        dispatch(
          barcodeOutput(localStorage.getItem('currentBillId'), e.target.value)
        );
      } else if (barcodeRadio === 'delete') {
        dispatch(
          barcodeDelete(localStorage.getItem('currentBillId'), e.target.value)
        );
      }
    }
  };

  useEffect(() => {
    if (
      data.deliveryID &&
      deliveryCompaniesCost &&
      deliveryCompaniesCost.length > 0
    ) {
      const arr = deliveryCompaniesCost.filter(
        (dc) => dc.deliveryID == data.deliveryID
      );
      if (arr.length > 0) {
        setName(arr[0].deliveryName);
      }
    }
  }, [data.deliveryID, deliveryCompaniesCost]);

  useEffect(() => {
    if (data.state == 'في الانتظار' || data.state == 'غير مكتملة') {
      setBarcodeRadio('output');
    } else if (data.state == 'قيد العمل') {
      setBarcodeRadio('delete');
    } else if (data.state == 'الطلبية فارغة') {
      setBarcodeRadio('insert');
    }
  }, [data.state]);

  if (billDetailsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={100} color='grey' />
      </Box>
    );
  }
  return (
    <div>
      {barcodeError && (
        <Alert
          variant='filled'
          severity='error'
          onClose={() => {
            dispatch({ type: BARCODE_RESET });
          }}
        >
          {barcodeError}
        </Alert>
      )}

      {DeliveryCompaniesCostError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: GET_DELIVERY_COMPANIES_COST_RESET });
          }}
        >
          {DeliveryCompaniesCostError}
        </Alert>
      )}

      {empsListError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: GET_EMPS_LIST_RESET });
          }}
        >
          {empsListError}
        </Alert>
      )}

      {updateBillProductsError && (
        <Alert
          severity='error'
          onClose={() => {
            dispatch({ type: UPDATE_BILL_PRODUCTS_RESET });
          }}
        >
          {updateBillProductsError}
        </Alert>
      )}

      <div
        className=' p-0 mx-auto w-75 mt-4'
        style={{ border: '2.5px solid black', overflowX: 'auto' }}
      >
        <div className='justify-content-center'>
          <h6 className='text-center'>تفاصيل الفاتورة</h6>
        </div>
        <div
          style={{ width: '70em', whiteSpace: 'nowrap', marginRight: '0px' }}
        >
          <div className='row'>
            <div
              className='col-3  d-flex flex-column justify-content-around align-items-center'
              style={{
                borderTop: '1.5px solid black',
                borderBottom: '1.5px solid black',
                minHeight: '100%',
              }}
            >
              <div className='d-flex flex-row-reverse justify-content-around align-items-center w-100'>
                <p className='p-0'>رقم الطلبية</p>
                <p className='p-0'>{data.purchaseId}</p>
              </div>
              <div className='d-flex flex-row-reverse justify-content-around align-items-center w-100'>
                <p className='p-0'>اسم الزبون</p>
                <p className='p-0'>{data.userName}</p>
              </div>
              <div className='d-flex flex-row-reverse justify-content-around align-items-center w-100'>
                <p className='p-0'>رقم الهاتف</p>

                <div className='d-flex flex-column w-100'>
                  <input
                    type='number'
                    className='w-100'
                    name='mobile1'
                    onChange={onChangeDataHandler}
                    value={data.mobile1}
                  />
                  <input
                    type='number'
                    className='w-100'
                    name='mobile2'
                    onChange={onChangeDataHandler}
                    value={data.mobile2}
                  />
                </div>
              </div>
            </div>

            <div
              className='col-6  d-flex flex-column justify-content-around align-items-center '
              style={{ border: '1.5px solid black', minHeight: '100%' }}
            >
              <div className='d-flex flex-row-reverse justify-content-around align-items-center w-75 '>
                <p className='p-0'>تاريخ الطلبية</p>
                <p className='p-0'>
                  {format(new Date(data.date), 'yyyy/MM/dd  hh:mm  a')}

                  {/* 2022/6/20 4:10 PM */}
                </p>
              </div>
              <div className='d-flex flex-row-reverse justify-content-around align-items-center w-75 '>
                <p className='p-0'>اسم الحي</p>
                <input
                  className='w-50'
                  type='text'
                  name='address'
                  id=''
                  value={data.address}
                  onChange={onChangeDataHandler}
                />
              </div>
              <div className='d-flex flex-row-reverse justify-content-around align-items-center w-75 '>
                <p className='p-0'>رابط الموقع</p>
                <input className='w-50' type='text' value={data.url} />
              </div>
            </div>

            <div
              className='col-3  d-flex flex-column justify-content-around align-items-center'
              style={{
                borderTop: '1.5px solid black',
                borderBottom: '1.5px solid black',
                minHeight: '100%',
              }}
            >
              <div className='d-flex flex-row-reverse justify-content-around align-items-center w-100'>
                <p className='p-0'>رقم تتبع الطلبية</p>
                <input
                  className='w-50'
                  type='text'
                  style={{ height: '20px' }}
                  value={data.billID}
                  name='billID'
                  onChange={onChangeDataHandler}
                />
              </div>
              <div className='d-flex flex-row-reverse justify-content-around align-items-center w-100'>
                <p className='p-0'>حالة الطلبية</p>
                <p className='p-0'>{data.state}</p>
              </div>
              <div className='d-flex flex-row-reverse justify-content-around align-items-center w-100'>
                <p className='p-0'>اسم البائع</p>
                <select
                  className='form-select w-75'
                  value={data.empId}
                  name='empId'
                  onChange={onChangeDataHandler}
                >
                  {empsList &&
                    [{ empId: '', empName: 'اختر مندوب' }, ...empsList].map(
                      (emp) => (
                        <option key={emp.empId} value={emp.empId}>
                          {emp.empName}
                        </option>
                      )
                    )}
                </select>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-9' style={{ borderRight: '1.5px solid black' }}>
              <textarea
                name=''
                id=''
                cols='30'
                rows='6'
                className='w-100'
                placeholder='ملاحظات'
                dir='rtl'
                value={data.note}
              ></textarea>
              {!emp && (
                <div className='d-flex flex-row-reverse justify-content-around align-items-center w-100 p-3 my-3'>
                  <input
                    type='text'
                    ref={barcodeInput}
                    id='barcode-input'
                    placeholder='  ادخل الباركود'
                    className='w-50'
                    onKeyUp={keyUpHandler}
                  />
                </div>
              )}
            </div>
            <div
              className='col-3  d-flex flex-column justify-content-around align-items-center'
              style={{ minHeight: '100%' }}
            >
              <div className='d-flex flex-row-reverse justify-content-around align-items-center w-100'>
                <p className='p-0'>اختر مدينة</p>
                <select
                  className='form-select w-50'
                  value={data.cityID}
                  name='cityID'
                  onChange={onChangeDataHandler}
                >
                  {citiesList &&
                    [{ cityID: '', cityName: 'اختر مدينة' }, ...citiesList].map(
                      (city) => (
                        <option key={city.cityID} value={city.cityID}>
                          {city.cityName}
                        </option>
                      )
                    )}
                </select>
              </div>
              <div className='d-flex flex-row-reverse justify-content-around align-items-center w-100'>
                <p className='p-0'>مندوب التوصيل</p>
                <select
                  className='form-select w-75'
                  id='exampleSelect1'
                  value={data.deliveryID}
                  name='deliveryID'
                  onChange={onChangeDataHandler}
                >
                  {deliveryCompaniesCost &&
                    [
                      {
                        deliveryID: '',
                        deliveryName: 'اختر شركة توصيل',
                        cost: 0,
                      },
                      ...deliveryCompaniesCost,
                    ].map((dc) => (
                      <option key={dc.deliveryID} value={dc.deliveryID}>
                        {dc.deliveryName}
                      </option>
                    ))}
                </select>
              </div>
              {!emp && (
                <div className='d-flex flex-column justify-content-around align-items-center'>
                  <div className='form-check'>
                    <label className='form-check-label'>
                      <input
                        type='radio'
                        className='form-check-input'
                        name='state'
                        id='optionsRadios1'
                        value='option1'
                        checked={barcodeRadio === 'output'}
                        onChange={() => {
                          setBarcodeRadio('output');
                        }}
                      />
                      تخريج مادة
                    </label>
                  </div>
                  <div className='form-check'>
                    <label className='form-check-label'>
                      <input
                        type='radio'
                        className='form-check-input'
                        name='state'
                        id='optionsRadios2'
                        value='option2'
                        checked={barcodeRadio === 'delete'}
                        onChange={() => {
                          setBarcodeRadio('delete');
                        }}
                      />
                      حذف مادة
                    </label>
                  </div>
                  <div className='form-check disabled'>
                    <label className='form-check-label'>
                      <input
                        type='radio'
                        className='form-check-input'
                        name='state'
                        value='insert'
                        checked={barcodeRadio === 'insert'}
                        onChange={() => {
                          setBarcodeRadio('insert');
                        }}
                      />
                      إضافة مادة
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {billProductsLoading ? (
        <CircularProgress />
      ) : (
        <div className='table-responsive mt-5'>
          <table
            className='table table-bordered table-striped mx-auto w-75'
            dir='rtl'
          >
            <thead>
              <tr className='bg-primary text-white'>
                <th scope='col'>ID</th>
                <th scope='col'>اسم المادة</th>
                <th scope='col'>المقاس</th>
                <th scope='col'>الكمية</th>
                <th scope='col'>سعر المبيع</th>
                <th scope='col'>سعر الجملة</th>
                <th scope='col'>سعر الكلي للمبيع</th>
                <th scope='col'>سعر الكلي للجملة</th>
                <th scope='col'>اسم الموديل</th>
                <th scope='col'>الكميات المخرجة</th>
                <th scope='col'>ملاحظات</th>
                <th scope='col'>حالة المادة</th>
                <th scope='col'>صورة المادة</th>
                <th scope='col'>خيارات</th>
              </tr>
            </thead>
            <tbody id='tbody'>
              {productsState &&
                productsState
                  .sort((a, b) => {
                    return a.subPurID - b.subPurID;
                  })
                  .map((prod, index) => (
                    <tr
                      className={
                        prod.state == 'حذف'
                          ? 'deleted'
                          : prod.state == 'تم تخريج المادة' && 'output'
                      }
                      key={prod.subPurID}
                    >
                      <td>{index + 1}</td>
                      <td>{prod.pName}</td>
                      <td>{prod.sizeName}</td>
                      <td>
                        <input
                          type='number'
                          readOnly={prod.state == 'تم تخريج المادة'}
                          value={productsState[parseInt(index)].allQuantity}
                          min='0'
                          className='quan'
                          name={`quan-${index}`}
                          onChange={(e) => {
                            var row = productsState[parseInt(index)];
                            row.allQuantity = parseInt(e.target.value);

                            var otherRows = productsState.filter(
                              (item) => item.subPurID != prod.subPurID
                            );

                            otherRows.push(row);
                            setProductsState(
                              otherRows.sort((a, b) => {
                                return a.subPurID - b.subPurID;
                              })
                            );
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type='number'
                          readOnly={prod.state == 'تم تخريج المادة'}
                          value={productsState[parseInt(index)].sprice}
                          min='0'
                          className='quan'
                          name={`sprice-${index}`}
                          onChange={(e) => {
                            var row = productsState[parseInt(index)];
                            row.sprice = parseInt(e.target.value);

                            var otherRows = productsState.filter(
                              (item) => item.subPurID != prod.subPurID
                            );

                            otherRows.push(row);
                            setProductsState(
                              otherRows.sort((a, b) => {
                                return a.subPurID - b.subPurID;
                              })
                            );
                          }}
                        />
                      </td>
                      <td>
                        <input
                          readOnly={prod.state == 'تم تخريج المادة'}
                          type='number'
                          value={productsState[parseInt(index)].hprice}
                          min='1'
                          className='quan'
                          name={`hprice-${index}`}
                          onChange={(e) => {
                            var row = productsState[parseInt(index)];
                            row.hprice = parseInt(e.target.value);

                            var otherRows = productsState.filter(
                              (item) => item.subPurID != prod.subPurID
                            );

                            otherRows.push(row);
                            setProductsState(
                              otherRows.sort((a, b) => {
                                return a.subPurID - b.subPurID;
                              })
                            );
                          }}
                        />
                      </td>
                      <td>
                        {productsState[index].sprice *
                          productsState[index].allQuantity}
                      </td>
                      <td>
                        {productsState[index].hprice *
                          productsState[index].allQuantity}
                      </td>
                      <td>{prod.pcode}</td>
                      <td>{prod.quOutput}</td>
                      <td>
                        <textarea
                          className='text-area'
                          value={productsState[parseInt(index)].notes}
                          id={`note-${index}`}
                          onChange={(e) => {
                            var row = productsState[parseInt(index)];
                            row.notes = e.target.value;

                            var otherRows = productsState.filter(
                              (item) => item.subPurID != prod.subPurID
                            );

                            otherRows.push(row);
                            setProductsState(
                              otherRows.sort((a, b) => {
                                return a.subPurID - b.subPurID;
                              })
                            );
                          }}
                        ></textarea>
                      </td>
                      <td>{prod.state}</td>
                      <td>
                        <img
                          style={{ width: '150px' }}
                          // src={'/default-prod.png'}
                          src={`${prod.image}`}
                          alt={prod.pName}
                        />
                      </td>
                      <td>
                        {prod.state == 'حذف' ? (
                          <button
                            className='btn btn-info'
                            disabled={restoreProductLoading}
                            onClick={() => {
                              {
                                dispatch(
                                  restoreProductToBill(prod.subPurID.toString())
                                );
                              }
                            }}
                          >
                            استرجاع
                          </button>
                        ) : (
                          <button
                            className='btn btn-danger'
                            disabled={removeProductLoading}
                            onClick={() => {
                              {
                                dispatch(
                                  removeProductFromBill(
                                    prod.subPurID.toString()
                                  )
                                );
                              }
                            }}
                          >
                            حذف
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              <tr></tr>
            </tbody>
            <tfoot>
              <tr>
                <td> </td>
                <td> </td>
                <td> </td>

                <td> الكمية الكلية {footerTotalQU} </td>

                <td> سعر المبيع الكلي {footerTotalSP} </td>
                <td> سعر الجملة الكلي {footerTotalHP} </td>

                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <div className='table-responsive mt-5'>
        <h3 className='text-center mx-auto pt-2'>تفاصيل الفاتورة</h3>
        <table
          className='table table-bordered table-striped mx-auto w-75'
          dir='rtl'
        >
          <tbody>
            <tr>
              <td className='text-center table-primary w-25'>
                {' '}
                العمولة من الطلبية
              </td>
              <td className='text-center  w-50'>{payments.purComm}</td>
            </tr>
            <tr>
              <td className='text-center table-primary w-25'>
                {' '}
                العمولة من أجور التوصيل
              </td>
              <td className='text-center  w-50'>{payments.delCom}</td>
            </tr>
            <tr>
              <td className='text-center table-primary w-25'>
                {' '}
                العمولة الكلية
              </td>
              <td className='text-center  w-50'>
                {payments.allCom === 0 ? data.allComm : payments.allCom}
              </td>
            </tr>
            <tr>
              <td className='text-center table-primary w-25'>
                {' '}
                السعر الكامل بدون توصيل
              </td>
              <td className='text-center  w-50'>{payments.selPrice}</td>
            </tr>
            <tr>
              <td className='text-center table-primary w-25'> أجور التوصيل</td>
              <td className='text-center  w-50'>
                <input
                  readOnly={emp}
                  type='number'
                  value={payments.delCost}
                  onChange={(e) => {
                    setPayments({ ...payments, delCost: e.target.value });
                  }}
                  id=''
                  min='0'
                />
              </td>
            </tr>
            <tr>
              <td className='text-center table-primary w-25'>
                {' '}
                السعر الكامل مع التوصيل
              </td>
              <td className='text-center  w-50'>{payments.totalPrice}</td>
            </tr>
            <tr>
              <td className='text-center table-primary w-25'> مندوب التوصيل</td>
              <td className='text-center  w-50'>{name}</td>
            </tr>
            <tr>
              <td className='text-center table-primary w-25'>
                {' '}
                المطلوب من مندوب التوصيل
              </td>
              <td className='text-center  w-50'>{payments.delDel}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {!emp && (
        <>
          <div dir='rtl' className='container w-50 mx-auto text-center'>
            <div className='mx-auto'>
              <label>المجموع الكلي من شركة التوصيل:{payments.delComp}</label>
            </div>

            <br />
            <p>القيمة السابقة: {data.deliveryComp}</p>
          </div>
        </>
      )}
      <div className='container d-flex justify-content-around w-50 my-3'>
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => sendBillHandler(false)}
        >
          حفظ
        </button>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => sendBillHandler(true)}
        >
          إرسال
        </button>
        <button
          type='button'
          className='btn btn-success'
          disabled={data.state == 'تم التسليم'}
          onClick={() => {
            nav('/products/categories');
          }}
        >
          إضافة مادة
        </button>
        {!emp && (
          <button
            type='button'
            disabled={data.state != 'قيد العمل'}
            onClick={acceptBillHandler}
            className='btn btn-info'
          >
            تم التسليم
          </button>
        )}

        {!emp && data.state != 'ملغاة' && (
          <button
            type='button'
            className='btn btn-danger'
            disabled={cancelBillLoading}
            onClick={() => {
              dispatch(cancelBill(data.purchaseId.toString()));
            }}
          >
            إلغاء الطلبية
          </button>
        )}
        {!emp && data.state == 'ملغاة' && (
          <button
            type='button'
            className='btn btn-success'
            disabled={restoreBillLoading}
            onClick={() => {
              dispatch(restoreBill(data.purchaseId.toString()));
            }}
          >
            استرجاع الطلبية
          </button>
        )}
        {!emp && (
          <button type='button' className='btn btn-warning' onClick={printBill}>
            طباعة
          </button>
        )}
      </div>

      {!emp && (
        <div
          className='w-25 mx-auto text-center mb-0'
          style={{
            height: '400px',
            overflowY: 'auto',
            border: '2px solid grey',
          }}
        >
          <table
            dir='rtl'
            className='mx-auto m-2 w-50 text-center'
            id='table'
            style={{
              height: '700px',
              border: '1px solid black',
              margin: 'auto',
              textAlign: 'center',
            }}
          >
            <tbody className='w-75' style={{ border: '1px dashed black' }}>
              <tr className='w-75' style={{ border: '1px solid black' }}>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  رقم الطلبية
                </td>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  {data.purchaseId}
                </td>
              </tr>
              <tr>
                <td colSpan='2'>
                  <QRCode size={100} value={data.purchaseId} />
                </td>
              </tr>
              <tr className='w-75' style={{ border: '1px solid black' }}>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  اسم الزبون
                </td>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  {data.userName}
                </td>
              </tr>
              <tr className='w-75' style={{ border: '1px solid black' }}>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  رقم الموبايل الأول
                </td>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  {data.mobile1}
                </td>
              </tr>
              <tr className='w-75' style={{ border: '1px solid black' }}>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  رقم الموبايل الثاني
                </td>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  {data.mobile2}
                </td>
              </tr>
              <tr className='w-75' style={{ border: '1px solid black' }}>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  الموقع
                </td>
                <td
                  className='w-50'
                  style={{
                    maxWidth: '100px',
                    wordBreak: 'break-word',
                    border: '1px solid black',
                  }}
                >
                  {data.url}
                </td>
              </tr>
              <tr className='w-75' style={{ border: '1px solid black' }}>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  البائع
                </td>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  {data.empName}
                </td>
              </tr>
              <tr className='w-75' style={{ border: '1px solid black' }}>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  ملاحظة
                </td>
                <td
                  className='w-50'
                  style={{ maxWidth: '100px', border: '1px solid black' }}
                >
                  {data.note}
                </td>
              </tr>
              <tr className='w-75' style={{ border: '1px solid black' }}>
                <td
                  colspan='2'
                  style={{ border: '1px solid black', textAlign: 'center' }}
                >
                  المواد
                </td>
              </tr>
              <tr>
                <td colspan='2' style={{ border: '1px solid black' }}>
                  <table
                    dir='ltr'
                    border='2'
                    style={{ border: '1px solid black', textAlign: 'center' }}
                  >
                    <thead>
                      <tr>
                        <th>سعر القطعة</th>
                        <th>الكمية</th>
                        <th>القياس</th>
                        <th>رقم الموديل</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billProducts &&
                        billProducts.map((prod, index) => (
                          <tr
                            className='w-75'
                            style={{ border: '1px solid black' }}
                          >
                            <td
                              className='w-50'
                              style={{ border: '1px solid black' }}
                            >
                              {prod.sprice}
                            </td>
                            <td
                              className='w-50'
                              style={{ border: '1px solid black' }}
                            >
                              {prod.allQuantity}
                            </td>
                            <td
                              className='w-50'
                              style={{ border: '1px solid black' }}
                            >
                              {prod.sizeName}
                            </td>
                            <td
                              className='w-50'
                              style={{ border: '1px solid black' }}
                            >
                              {prod.pcode}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr className='w-75' style={{ border: '1px solid black' }}>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  العدد الكلي
                </td>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  5
                </td>
              </tr>
              <tr className='w-75' style={{ border: '1px solid black' }}>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  أجور التوصيل
                </td>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  {payments.delCost}
                </td>
              </tr>
              <tr className='w-75' style={{ border: '1px solid black' }}>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  السعر بدون توصيل
                </td>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  {payments.selPrice}
                </td>
              </tr>
              <tr className='w-75' style={{ border: '1px solid black' }}>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  السعر مع توصيل
                </td>
                <td className='w-50' style={{ border: '1px solid black' }}>
                  {payments.totalPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {!emp && (
        <button
          className='btn btn-primary mx-auto d-flex justify-content-center m-1'
          onClick={() =>
            selectElementContents(document.getElementById('table'))
          }
        >
          نسخ الفاتورة
        </button>
      )}
    </div>
  );
};

export default BillDetails;
