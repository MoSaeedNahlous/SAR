import React, { useState } from 'react'

const Orders = () => {

  const [searchMethod, setSearchMethod] = useState('')

    const handelChange = (e) => {
        setSearchMethod(e.target.value)
    }

  return (
    <div className='container' dir='rtl'>
        <h1 className='text-center my-5 fw-bold'>الطلبيات</h1>

        <div className=''>

            <div className='input-group w-50 mx-auto'>
                <label className='form-label ms-3' htmlFor='SearchMethod'>طريقة البحث</label>
                <select className='form-select' name='SearchMethod' value={searchMethod} onChange={handelChange}>
                    <option value='' disabled>__طريقة البحث__</option>
                    <option value='1'>بحث عن طلبية محددة</option>
                    <option value='2'>بحث حسب الحالة</option>
                </select>
            </div>
            { searchMethod &&  searchMethod == 1 && (
                <div>
                    <form className="d-flex w-75 mt-4 mx-auto">
                        <div className='input-group'>
                            <select className="form-select w-50">
                                <option>رقم الهاتف</option>
                                <option>رقم الطلبية</option>
                                
                            </select>
                        </div>
                      
                        <input className="form-control me-2" type="number" placeholder=".. بحث" aria-label="Search" />
                        <button className="btn btn-primary mx-3" type="submit">بحث</button>
                    </form>
                </div>
            ) }
            { searchMethod &&  searchMethod == 2 && (
                <div>
                    <form className="w-50 mt-4 mx-auto">

                        <div className='form-group mx-auto' style={{width:'fitContent'}}>
                            <label className='form-label' htmlFor='date'>التاريخ</label>
                            <input type='date' className='form-control w-50 mx-auto' />
                        </div>
                        <div className='form-group mt-4'> 
                            <label className='form-label' htmlFor='employeeSelect'>اختر المندوب</label>
                            <select className="form-select w-50 mx-auto" name='employeeSelect'>
                                <option> Test  </option>
                            </select>
                        </div>
                        <div className='form-group mt-4'> 
                            <label className='form-label' htmlFor='deliveryComp'>اختر شركة التوصيل</label>
                            <select className="form-select w-50 mx-auto" name='deliveryComp'>
                                <option> Test  </option>
                            </select>
                        </div>
                     
                    </form>
                </div>
            ) }
            <ul class="nav justify-content-center mt-5">
              <li class="nav-item">
                    <span class="nav-link border" style={{cursor: 'pointer'}}>ملغاة</span>
                </li>
                <li class="nav-item">
                    <span class="nav-link border" style={{cursor: 'pointer'}}>غير مكتملة</span>
                </li>
                <li class="nav-item">
                    <span class="nav-link border" style={{cursor: 'pointer'}}>تم التسليم</span>
                </li>
                <li class="nav-item">
                    <span class="nav-link border" style={{cursor: 'pointer'}}>قيد العمل</span>
                </li>
                <li class="nav-item">
                    <span class="nav-link border" style={{cursor: 'pointer'}}>في الانتظار </span>
                </li>
            </ul>
            <div>

            </div>
        </div>
    </div>
  )
}

export default Orders