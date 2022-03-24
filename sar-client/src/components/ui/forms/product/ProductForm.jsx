import React from 'react';

const ProductForm = () => {
  return (
    <div className='container'>
      <form className='mx-auto w-50' dir='rtl'>
        <div className=''>
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1' className='form-label mt-4'>
              اسم المنتج{' '}
            </label>
            <input
              type='text'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='text'
              placeholder='Enter email'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='mainProduct' className='form-label mt-4'>
              الصنف الرئيسي
            </label>
            <select className='form-select' id='mainProduct'>
              <option>بيجامات</option>
              <option>شوزات</option>
              <option>للتجربة</option>
              <option>تيشيرت</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='specialFor' className='form-label mt-4'>
              مخصص للـ
            </label>
            <select multiple='' className='form-select' id='specialFor'>
              <option>بيجاما كم سحاب</option>
              <option>بيجاما كم سحاب جامبو</option>
              <option>بيجاما كم</option>
              <option>بيجاما كم جامبو</option>
              <option>شوز جامبو</option>
              <option> بيجاما كم سحاب 3 قطع جامبو</option>
              <option>رجالي</option>
              <option>شورت</option>
              <option>ولادي</option>
              <option>شوز فيتنامي</option>
              <option>نسائي</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='wholeSalePrice' className='form-label mt-4'>
              سعر الجملة
            </label>
            <input className='form-control' type='number' id='wholeSalePrice' />
          </div>
          <div className='form-group'>
            <label htmlFor='sellPrice' className='form-label mt-4'>
              سعر المبيع
            </label>
            <input
              type='text'
              className='form-control'
              id='sellPrice'
              rows='3'
            />
          </div>
          <div className='form-group d-flex mt-4'>
            <div>
              <label htmlFor='trackCode' className='form-label'>
                كود التتبع{' '}
              </label>
              <input className='form-control' type='text' id='trackCode' />
            </div>
            <div className='d-flex flex-column align-item-center justify-content-center me-3'>
              <button className='btn btn-dark mb-1 btn-sm'>عرض الجدول</button>
              <button className='btn btn-dark mt-1 btn-sm'>
                مسح كل القياسات
              </button>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='productDetail' className='form-label mt-4'>
              تفاصيل المنتج
            </label>
            <textarea className='form-control' type='text' id='productDetail' />
          </div>
          <div class='mt-3'>
            <label htmlFor='formFile1' class='form-label'>
              صورة
            </label>
            <input class='form-control' type='file' id='formFile1' />
          </div>
          <div class='mt-3'>
            <label htmlFor='formFile2' class='form-label'>
              صورة
            </label>
            <input class='form-control' type='file' id='formFile2' />
          </div>
          <div class='mt-3'>
            <label htmlFor='formFile3' class='form-label'>
              صورة
            </label>
            <input class='form-control' type='file' id='formFile3' />
          </div>
          <button type='submit' className='btn btn-primary mt-3'>
            إضافة
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
