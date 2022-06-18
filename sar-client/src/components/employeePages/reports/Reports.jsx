import React from 'react';

const Reports = () => {
  return (
    <div className='container'>
      <h3 className='text-center m-5'>الكشوفات</h3>
      <div className='table-responsive m-2'>
        <table className='table table-hover table-striped w-100'>
          <thead>
            <tr className='table-primary'>
              <th>ID</th>
              <th>رقم الطلبية</th>
              <th>رأس المال</th>
              <th>المبيع</th>
              <th>العمولة</th>
              <th>العمولة من أجور التوصيل</th>
              <th>الخصومات</th>
              <th>ملاحظات على الخصومات</th>
              <th>المكافئات</th>
              <th>ملاحظات على المكافئات</th>
              <th>العمولة الكلية</th>
              <th>العنوان</th>
              <th>حالة كشف الحساب</th>
              <th>اسم الزبون</th>
              <th>تاريخ كشف الحساب</th>
              <th>حالة الطلبية</th>
              <th>ملاحظات</th>
              <th>اسم المدينة</th>
              <th></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
