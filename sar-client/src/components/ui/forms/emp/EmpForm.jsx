import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewEmp } from '../../../../redux/actions/empsActions';
import { SET_CURRENT_EMP_RESET } from '../../../../redux/constants/empConstants';

const EmpForm = () => {
  const dispatch = useDispatch()
    
  const currentEmp = useSelector(state => state.setCurrentEmp)
  const { currentEmp: current } = currentEmp

  const addEmpSt = useSelector(state => state.addEmp)
  const { loading: addingLoading, success, error: addingError } = addEmpSt
  
  const updateEmpSt = useSelector((state) => state.updateEmp);
  const { success:updateSuccess, error:updateError, loading:updateLoading } = updateEmpSt;


  const [data, setData] = useState({
    empName: '',
    mobile1: '',
    mobile2: '',
    address1: '',
    address2:'',
    cityId: '',
    email: '',
    password: '',
    notes:''
  })
  const onChangeHandler = (e) => {
    setData({...data,[e.target.name]:e.target.value})
  }

  useEffect(() => {
    if (current && current.empName) {
      setData(current)
    }
  }, [current])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addNewEmp(data.empName,
      data.address1, data.address2,
      data.password, data.notes,
      data.mobile1, data.mobile2,
      data.email))
    document.getElementById('addEmpForm').reset()
    dispatch({ type: SET_CURRENT_EMP_RESET })
    setName({
    empName: '',
    mobile1: '',
    mobile2: '',
    address1: '',
    address2:'',
    cityId: '',
    email: '',
    password: '',
    notes:''
  })
  }
  
  const onClickHandler = (id,name) => {
    // dispatch(updateCategory(id,name))
    // document.getElementById('addCatForm').reset()
    // dispatch({ type: SET_CURRENT_CATEGORY_RESET })
    
  }
  

  
  return (
    <div className='container'>
      <form className='mx-auto w-50' dir='rtl' id='addEmpForm' onSubmit={submitHandler}>
        <div className=''>
        <div className='row'>
          <div className='col-lg-12'>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1' className='form-label mt-4'>
                  اسم المندوب{' '}
                </label>
                <input
                  type='text'
                  name='empName'
                  value={ data.empName }
                  onChange={onChangeHandler}
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='text'
                  placeholder=''
                />
              </div>
          </div>
        </div>
        <div className='row'>
        <div className='col-lg-6'>
              <div className='form-group'>
                <label htmlFor='firstPhoneNumber' className='form-label mt-4'>
                  رقم الجوّال الأول
                </label>
                <input
                  type='number'
                  name='mobile1'
                  value={ data.mobile1 }
                  onChange={onChangeHandler}
                  className='form-control'
                  aria-describedby='text'
                  placeholder=''
                />
              </div>
          </div>
          <div className='col-lg-6'>
              <div className='form-group'>
                <label htmlFor='secondPhoneNumber' className='form-label mt-4'>
                 رقم الجوّال الثاني
                </label>
                <input
                  name='mobile2'
                  value={ data.mobile2 }
                  onChange={onChangeHandler}
                  className='form-control'
                  type='number'
                />
              </div>
          </div>
        </div>  
          
        <div className='row'>
        <div className='col-lg-6'>
              <div className='form-group'>
                <label htmlFor='city' className='form-label mt-4'>
                  المدينة
                </label>
                <input
                  name='address1'
                  value={ data.address1 }
                  onChange={onChangeHandler}
                  type='text'
                  className='form-control'
                  aria-describedby='text'
                  placeholder=''
                />
              </div>
          </div>
          <div className='col-lg-6'>
              <div className='form-group'>
                <label htmlFor='neighborhood' className='form-label mt-4'>
                 الحي
                </label>
                <input
                  name='address2'
                  value={ data.address2 }
                  onChange={ onChangeHandler }
                  className='form-control'
                  type='number'
                />
              </div>
          </div>
        </div>    
          
        <div className='row'>
        <div className='col-lg-6'>
              <div className='form-group'>
                <label htmlFor='email' className='form-label mt-4'>
                  الإيميل
                </label>
                <input
                  
                  value={ data.email }
                  onChange={onChangeHandler}
                  name='email'
                  type='texta'
                  className='form-control'
                  aria-describedby='text'
                  placeholder=''
                />
              </div>
          </div>
          <div className='col-lg-6'>
              <div className='form-group'>
                <label htmlFor='password' className='form-label mt-4'>
                 كلمة المرور
                </label>
                <input className='form-control'
                  value={ data.password }
                  onChange={onChangeHandler}type='password' name='password' />
              </div>
          </div>
        </div>

        <div className='form-group'>
          <label htmlFor='notes' className='form-label'>ملاحظات</label>
          <textarea className='form-control' type='text' name='notes' 
                  value={ data.notes }
                  onChange={onChangeHandler}></textarea>
        </div>     
          <div>
            <button type='submit' className='btn btn-primary mt-3 px-5 me-2' style={{width: '200px'}}>
              إنشاء حساب
            </button>

            <button type='submit' className='btn btn-outline-primary mt-3 me-2 px-5' style={{width: '200px'}}>
              تعديل
            </button>
          </div>
         
        </div>
      </form>
    </div>
  );
};

export default EmpForm;
