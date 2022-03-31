import React from 'react'

const AddCustomerForm = () => {
  return (
    <div className='container'>
      <form className='mx-auto w-50' dir='rtl'>
        <div className=''>
        <div className='row'>
          <div className='col-lg-12'>
              <div className='form-group'>
                <label htmlFor='customer-name' className='form-label mt-4'>
                  اسم الزبون{' '}
                </label>
                <input
                  name='customer-name'
                  type='text'
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
                  name='firstPhoneNumber'
                  type='number'
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
                <input className='form-control' type='number' name='secondPhoneNumber' />
              </div>
          </div>
        </div>  
          
        <div className='row'>
            <div className='col-lg-6'>
                <div className='form-group'>
                    <label htmlFor='city' className='form-label mt-4'>
                        المدينة
                        </label>
                        <select className='form-select' name='city'>
                            <option>الرياض</option>
                            <option>جدة</option>
                        
                        </select>
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='form-group'>
                    <label htmlFor='neighborhood' className='form-label mt-4'>
                    الحي
                    </label>
                    <input className='form-control' type='text' name='neighborhood' />
                </div>
            </div>
        </div>    
          
        <div className='row'>
            <div className='col-lg-6'>
                    <div className='form-group'>
                        <label htmlFor='address' className='form-label mt-4'>
                            العنوان
                        </label>
                        <input className='form-control' type='text' name='address' />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label htmlFor='position' className='form-label mt-4'>
                        الموقع
                        </label>
                        <input className='form-control' type='text' name='position' />
                    </div>
                </div>
        </div>

        <div className='form-group'>
          <label htmlFor='notes' className='form-label'>ملاحظات</label>
          <textarea className='form-control' type='text' name='notes'></textarea>
        </div>     
          <div>
            <button type='submit' className='btn btn-primary mt-3 px-5 me-2' style={{width: '200px'}}>
              إنشاء حساب
            </button>

            <button type='submit' className='btn btn-outline-primary mt-3 px-5 me-2' style={{width: '200px'}}>
              تعديل
            </button>
          </div>
         
        </div>
      </form>
    </div>
  )
}

export default AddCustomerForm