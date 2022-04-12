import React from 'react';

const CreateBillForm = () => {
  return (
    <form dir='rtl'>
      <h2 className='text-center'>اختيار زبون</h2>
      <div className='form-group w-50 m-auto my-3'>
        <label for='exampleInputEmail1'>اسم الزبون</label>
        <input type='text' className='form-control' />
      </div>
      <div className='form-group w-50 m-auto my-3'>
        <label for='exampleInputPassword1'>رقم الزبون الأول أو الثاني</label>
        <input type='number' className='form-control' />
      </div>
      <div className='d-flex justify-content-around mt-2 w-50 mx-auto'>
        <button type='button' class='btn btn-success'>
          إنشاء فاتورة
        </button>
        <button type='button' class='btn btn-warning px-4'>
          بحث
        </button>
        <button type='button' class='btn btn-danger px-4'>
          حظر
        </button>
      </div>
      <div className='d-flex justify-content-center align-items-center mt-3  mx-auto'>
        <small className=''>تريد إنشاء حساب زبون جديد؟</small>
        <button type='button' class='btn btn-info mx-3'>
          إنشاء حساب
        </button>
      </div>
    </form>
  );
};

export default CreateBillForm;
