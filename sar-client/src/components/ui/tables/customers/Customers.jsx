import { Alert, CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCustomer,deleteCustomer, getCustomers, blockCustomer, unBlockCustomer} from '../../../../redux/actions/customersActions'
import { ADD_CUSTOMER_RESET, BLOCK_CUSTOMER_RESET, DELETE_CUSTOMER_RESET, SET_CURRENT_CUSTOMER, SET_CURRENT_CUSTOMER_RESET, UNBLOCK_CUSTOMER_RESET, UPDATE_CUSTOMER_RESET } from '../../../../redux/constants/customersConstants'

const Customers = () => {

    const dispatch = useDispatch()
    
    const currentCustomer = useSelector(state => state.setCurrentCustomer)
    const { currentCustomer: current } = currentCustomer
    
    const customers = useSelector((state) => state.getCustomers);
    const { customers: customersList, error, loading } = customers;

    const deleteCustomerSt = useSelector((state) => state.deleteCustomer);
    const { success, error: deleteError, loading: deleteLoading } = deleteCustomerSt;

    const addCustomerSt = useSelector((state) => state.addCustomer);
    const { success:addSuccess, error: addError, loading: addLoading } = addCustomerSt;
    
    const updateCustomerSt = useSelector((state) => state.updateCustomer);
    const { success: updateSuccess, error: updateError, loading: updateLoading } = updateCustomerSt;
  
    const blockCustomerST = useSelector((state) => state.blockCustomer);
    const { success:successBlocking , error:errorBlocking, loading:loadingBlocking } =  blockCustomerST;

    const unBlockCustomerST = useSelector((state) => state.unBlockCustomer);
    const { success:successUnblocking , error:errorUnbocking, loading:loadingUnblocking } =  unBlockCustomerST;

  
  
  const [search, setSearch] = useState('')
  
    useEffect(() => {
      dispatch({ type: SET_CURRENT_CUSTOMER_RESET })
      dispatch({ type: UPDATE_CUSTOMER_RESET })
      dispatch({ type: ADD_CUSTOMER_RESET })
      dispatch({ type: BLOCK_CUSTOMER_RESET })
      dispatch({ type: UNBLOCK_CUSTOMER_RESET })
        dispatch(getCustomers());
    }, []);

  
  useEffect(() => {
    if (search === '') {
      dispatch(getCustomers())
    } else {
      dispatch(getCustomers(search))
    }
  }, [search])

  useEffect(() => {
    if (success || updateSuccess || addSuccess||successBlocking||successUnblocking) {
          dispatch(getCustomers());
      }
    }, [success, updateSuccess,addSuccess,successBlocking,successUnblocking])
    

    const deleteHandler = (id) => {
        dispatch(deleteCustomer(id))
        
    }

    const blockHandler = (id) => {
        dispatch(blockCustomer(id))
    }

    const unblockHandler = (id) => {
        dispatch(unBlockCustomer(id))
    }

    

    if (loading) {
    return <Box sx={{ display: 'flex',justifyContent:'center' }}>
      <CircularProgress size={100} color='grey' />
    </Box>
    }
    
    if (error) {
        return <Alert variant='error'>{ error }</Alert>
    }

  return (
    <div>
      { error && <Alert variant='error'>{ error }</Alert> }
      { success && <Alert onClose={() => {dispatch({type:DELETE_CUSTOMER_RESET})}}>تم الحذف بنجاح</Alert> }
      { deleteError && <Alert variant='error' onClose={ () => { dispatch({ type: DELETE_CUSTOMER_RESET }) } }>{ deleteError }</Alert> }

      { successBlocking && <Alert onClose={ () => { dispatch({ type: BLOCK_CUSTOMER_RESET }) } }>تم الحظر بنجاح</Alert> }
      { errorBlocking && <Alert variant='error' onClose={ () => { dispatch({ type: BLOCK_CUSTOMER_RESET }) } }>{ errorBlocking }</Alert> }

      { successUnblocking && <Alert onClose={() => {dispatch({type:UNBLOCK_CUSTOMER_RESET})}}>تم الغاء الحظر  بنجاح</Alert> }
      { errorUnbocking && <Alert variant='error' onClose={ () => { dispatch({ type: UNBLOCK_CUSTOMER_RESET }) } }>{ errorUnbocking }</Alert> }
      
      <h2 className='text-center mt-5'>الزبائن</h2>
      <div class='form-group w-75 mb-3 mx-auto' dir='rtl'>
        <label for='customers' class='form-label mt-4'>
          الزبائن
        </label>
        <input
          type='customers'
          className='form-control'
          id='exampleInputEmail1'
          placeholder= 'اكتب اسم أو جزء من اسم الزبون'
        />
      </div>

      <div className='container-fluid px-5'>
      <div className='table-responsive'>
          <table className='table table-bordered table-striped mx-auto' dir='rtl'>
            <thead>
              <tr className='bg-primary text-white'>
                <th scope='col'>ID</th>
                <th scope='col'>اسم الزبون</th>
                <th scope='col'>العنوان </th>
                <th scope='col'>اسم الحي</th>
                <th scope='col'>رقم الجوال 1</th>
                <th scope='col'>رقم الجوال 2</th>
                <th scope='col'> الموقع</th>
                <th scope='col'>المدينة</th>
                <th scope='col'>اسم المندوب</th>
                <th scope='col'>ملاحظات</th>
                <th scope='col'>خيارات</th>
              </tr>
            </thead>
            <tbody  style={{fontSize: '0.9rem'}}>
              { customersList.map((customer) => (
                <tr key={customer.userId}>
                  <td>{customer.userId}</td>
                  <td>{customer.username}</td>
                  <td>{customer.address1}</td>
                  <td>{customer.address2}</td>
                  <td>{customer.mobile1}</td>
                  <td>{customer.mobile2}</td>
                  <td>{customer.url}</td>
                  <td>{customer.cityName}</td>
                  <td>{customer.empName}</td>
                  <td>{customer.notes}</td>
                  <td>
                    <div className='d-flex justify-content-around'>
                      <button
                        className='btn btn-primary mx-1 btn-sm'
                        onClick={
                          () => {
                              dispatch({ type: SET_CURRENT_CUSTOMER, payload: customer }),
                              document.getElementById('root').scrollIntoView({behavior:'smooth'})
                          } }
                              >تعديل</button>
                      <button
                        className='btn btn-danger mx-1 btn-sm'
                        onClick={ () => deleteHandler(customer.userId.toString()) }
                        disabled={ deleteLoading }
                      >
                        { deleteLoading ?
                          <CircularProgress color="inherit" size={ 15 } /> :
                          'حذف'
                        } </button>
                      {customer.isBlocked === 'Blocked'?
                      <button
                          className='btn btn-warning mx-1 btn-sm'
                          onClick={ () => unblockHandler(customer.userId.toString()) }
                          disabled={ loadingUnblocking }
                        >
                          { loadingUnblocking ?
                          <CircularProgress color="inherit" size={ 15 } /> :
                          'إلغاء الحظر'
                        } </button>
                      :
                      <button
                          className='btn btn-warning mx-1 btn-sm'
                          onClick={ () => blockHandler(customer.userId.toString()) }
                          disabled={ loadingBlocking }
                        >
                          { loadingBlocking ?
                          <CircularProgress color="inherit" size={ 15 } /> :
                          'حظر'
                        } </button>
                      }
                    </div> 
                </td>
              </tr>
              ))}
            
            </tbody>
          </table>
      </div>
     
      </div>
      
    </div>
  )
}

export default Customers