import React from 'react';

const Emps = () => {
  return (
    <div>
      <h2 className='text-center mt-5'>الموظفون</h2>
      <div class='form-group w-75 mb-3 mx-auto' dir='rtl'>
        <label for='search-for-employee' class='form-label mt-4'>
          البحث عن مندوب
        </label>
        <input
          type='text'
          class='form-control'
          name='search-for-employee'
          placeholder='اكتب اسم أو جزء من اسم المندوب'
        />
      </div>

      <div className='container-fluid px-5'>
      <div className='table-responsive'>
          <table className='table table-bordered table-striped mx-auto' dir='rtl'>
            <thead>
              <tr className='bg-primary text-white'>
                <th scope='col'>ID</th>
                <th scope='col'>الاسم</th>
                <th scope='col'>كلمة المرور</th>
                <th scope='col'>الحي</th>
                <th scope='col'>رقم الجوال الأول</th>
                <th scope='col'>رقم الجوال الثاني</th>
                <th scope='col'>البريد الإلكتروني</th>
                <th scope='col'>الحي</th>
                <th scope='col'>ملاحظات</th>
                <th scope='col'>خيارات</th>
              </tr>
            </thead>
            <tbody  style={{fontSize: '0.9rem'}}>
            <tr>
              <td>1</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
          
            </tr>
            <tr>
            <td>1</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
          
            </tr>
            <tr>
            <td>1</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
          
            </tr>
            <tr>
            <td>1</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
          
            </tr>
            <tr>
            <td>1</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>
                  <button className='btn btn-primary mx-2 my-1' style={{width: '70px'}}>تعديل</button>
                  <button className='btn btn-danger mx-2' style={{width: '70px'}}>حذف</button>
              </td>
          
            </tr>
            </tbody>
          </table>
      </div>
      
      </div>
      
    </div>
  );
};

export default Emps;
