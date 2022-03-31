import React, { useState } from 'react'
import './orders.css'
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
                    <form className="mt-4 w-50 mx-auto">
                        <div className='d-flex'>
                            <div className='form-group'>
                                <label className='form-label' htmlFor='date'>التاريخ</label>
                                <input type='date' className='form-control' />
                            </div>
                            <button className='btn btn-primary btn-sm date-btn'>عرض كل التواريخ </button>
                        </div>
                       
                        <div className='form-group mt-4'> 
                            <label className='form-label' htmlFor='employeeSelect'>اختر المندوب</label>
                            <select className="form-select" name='employeeSelect'>
                                <option> Test  </option>
                            </select>
                        </div>
                        <div className='form-group mt-4'> 
                            <label className='form-label' htmlFor='deliveryComp'>اختر شركة التوصيل</label>
                            <select className="form-select" name='deliveryComp'>
                                <option> Test  </option>
                            </select>
                        </div>
                     
                    </form>
                </div>
            ) }
            <ul className="nav justify-content-center mt-5">
              <li className="nav-item">
                    <span className="nav-link border" style={{cursor: 'pointer'}}>ملغاة</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link border" style={{cursor: 'pointer'}}>غير مكتملة</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link border" style={{cursor: 'pointer'}}>تم التسليم</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link border" style={{cursor: 'pointer'}}>قيد العمل</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link border" style={{cursor: 'pointer'}}>في الانتظار </span>
                </li>
            </ul>
            <div>

            </div>
        </div>
        
        {/* Employees Table  */}
        <div className='employees-container mt-4'>
            <div className='row'>
                <div className='col-xl-6 col-md-12'>
                    <table className='table table-sm table-striped'>
                        <thead>
                            <th>عدد الطلبيات</th>
                            <th>الحالة</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>تم التسليم</td>
                            </tr>

                            <tr>
                                <td>1</td>
                                <td>قيد العمل </td>
                            </tr>

                            <tr>
                                <td>1</td>
                                <td> ملغاة</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='col-xl-6 col-md-12'>
                    <table className='table table-sm table-striped table-borderd border-primary'>
                        <tbody>
                            <tr>
                                <td>مجموع الخصومات</td>
                                <td> 111</td>
                            </tr>
                            <tr>
                                <td>مجموع  عمولات من أجور التوصيل</td>
                                <td> 1</td>
                            </tr>
                            <tr>
                                <td>مجموع العمولات</td>
                                <td> 102</td>
                            </tr>
                            <tr>
                                <td>مجموع المكافئات</td>
                                <td> 111</td>
                            </tr>
                            <tr>
                                <td>مجموع النهائية العمولات</td>
                                <td> 111</td>
                            </tr>
                        </tbody>
                        
                    </table>
                </div>
                
        
                
            </div>
           
           <div className='mt-5'>
           <div className='table-responsive'>
                <table className='table table-striped table-bordered table-sm'>
                   <thead className='bg-primary text-white'>
                       <th>التاريخ</th>
                       <th>ملاحظات</th>
                       <th>إضافة مبلغ</th>
                       <th>المبلغ المتبقي</th>
                       <th>المبلغ المدفوع</th>
                       <th> مجموع العمولات</th>
                       <th></th>
                   </thead>

                   <tbody>
                       <tr>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td>5456</td>
                           <td>5646</td>
                           <td>545</td>
                           <td>
                               <button className='btn btn-sm btn-primary'>فتح</button>
                           </td>
                       </tr>
                   </tbody>
               </table>
           </div>
             
           </div>
        </div>
       


        {/* Orders Table  */}
        <div className='table-responsive'>
            <table className='table table-striped table-hover table-bordered orders-table'> 
                <thead>
                    <th>تاريخ إنشاء الطلبية</th>
                    <th>اسم البائع</th>
                    <th>شركة التوصيل</th>
                    <th>المدينة</th>
                    <th>رقم التتبع</th>
                    <th>رقم الموبايل</th>
                    <th>العنوان</th>
                    <th>حالة الطلبية</th>
                    <th>اسم الزبون</th>
                    <th>رقم الطلبية</th>
                    <th>تسلسل</th>
                    <th className='text-center'>خيارات</th>
                </thead>
                <tbody>
                    <tr>
                        <td>12-2-1900 </td>
                        <td>أحمد أحمد</td>
                        <td>شركة</td>
                        <td>الدمام</td>
                        <td>0</td>
                        <td>0964646546</td>
                        <td>السويس</td>
                        <td>في النتظار</td>
                        <td>محمد</td>
                        <td>54</td>
                        <td>1</td>
                        <td>

                            <div className='d-flex justify-content-around'>
                                <button className='btn btn-sm btn-primary'>تم التسليم</button>
                                <button className='btn btn-sm btn-danger'>إلغاء</button>
                                <button className='btn btn-sm btn-light'> اختيار </button>
                            </div>
                          
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
  )
}

export default Orders