import React from 'react';

const BillDetails = () => {
  return (
    <div className='container w-75' style={{border:'2.5px solid black'}}>
      <div className='justify-content-center'>
        <h6 className='text-center'>تفاصيل الفاتورة</h6>
      </div>
      <div className='container'>
        <div className='row'>
        <div className='col-3'>
          <div className='d-flex flex-row-reverse justify-content-around'>
            <p>رقم الطلبية</p>
            <p>8798709</p>
          </div >
          <div className='d-flex flex-row-reverse'>
            <p>اسم الزبون</p>
            <p>محمد أبو حميد</p>
          </div>
          <div className='d-flex flex-row-reverse'>
            <p>رقم الهاتف</p>

            <div className='d-flex flex-column'>
              <input type='number' />
              <input type='number' />
            </div>
          </div>
        </div>
        <div className='col-6'>
          <div className='d-flex flex-row-reverse'>
            <p>تاريخ الطلبية</p>
            <p>2022/6/20 4:10 PM</p>
          </div >
          <div className='d-flex flex-row-reverse'>
            <p>اسم الحي</p>
            <input type="text" name="" id="" />
          </div>
          <div className='d-flex flex-row-reverse'>
            <p>رابط الموقع</p>
            <input type='text' />
          </div>
        </div>
          <div className='col-3'>
            <div className='d-flex flex-row-reverse'>
              <p>رقم تتبع الطلبية</p>
              <input type="number"/>
            </div >
            <div className='d-flex flex-row-reverse'>
              <p>حالة الطلبية</p>
              <p>قيد الانتظار</p>
            </div>
            <div className='d-flex flex-row-reverse'>
              <p>اسم البائع</p>
              <select class="form-select" id="exampleSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className="col-9">
              <textarea name="" id="" cols="30" rows="3"></textarea>
          </div>
          <div className='col-3'>
            <div className='d-flex flex-row-reverse'>
              <p>اختر مدينة</p>
              <select class="form-select" id="exampleSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className='d-flex flex-row-reverse'>
              <p>مندوب التوصيل</p>
              <select class="form-select" id="exampleSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className='d-flex flex-row-reverse'>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked=""/>
                  Option one 
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2"/>
                  Option two
                </label>
              </div>
              <div className="form-check disabled">
                <label className="form-check-label">
                  <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3" disabled=""/>
                  Option three
                </label>
              </div>
              </div>
          </div>
          
        </div>
      </div>
      </div>
  )
}

export default BillDetails;
