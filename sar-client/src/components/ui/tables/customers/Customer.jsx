import React from 'react'

const Customer = () => {
  return (
    <div>
      <h2 className='text-center mt-5'>الموظفون</h2>
      <div className='form-group w-75 mb-3 mx-auto' dir='rtl'>
        <label htmlFor='customers' className='form-label mt-4'>
          الزبائن
        </label>
        <input
          type='customers'
          className='form-control'
          id='exampleInputEmail1'
          placeholder='اكتب اسم أو جزء من اسم المندوب'
        />
      </div>

      <div className='container-fluid px-5'>
      <table className='table table-striped mx-auto' dir='rtl'>
        <thead>
          <tr className='bg-primary text-white'>
            <th scope='col'>ID</th>
            <th scope='col'>اسم الزبون</th>
            <th scope='col'>العنوان </th>
            <th scope='col'>اسم الحي</th>
            <th scope='col'>رقم الجوال 1</th>
            <th scope='col'>رقم الجوال 2</th>
            <th scope='col'> الموقع</th>
            <th scope='col'>ملاحظات</th>
            <th scope='col'>المدينة</th>
            <th scope='col'>اسم المندوب</th>
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
          <td>@twitter</td>

          <td>
              <button className='btn btn-primary'>تعديل للتحديد</button>
              <button className='btn btn-danger mx-2'>حذف</button>
              <button className='btn btn-warning'>إلغاء الحظر</button>
              
          </td>
       
        </tr>
        </tbody>
      </table>
      </div>
      
    </div>
  )
}

export default Customer