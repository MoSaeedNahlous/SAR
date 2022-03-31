import React from 'react';

const EmpForm = () => {
  return (
    <div className='container'>
      <form className='mx-auto w-50' dir='rtl'>
        <div className=''>
        <div className='row'>
          <div className='col-lg-12'>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1' className='form-label mt-4'>
                  اسم المندوب{' '}
                </label>
                <input
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
                <input
                  name='city'
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
                <input className='form-control' type='number' name='neighborhood' />
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
                <input className='form-control' type='password' name='password' />
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
