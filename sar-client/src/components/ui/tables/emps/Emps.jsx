import React from 'react';

const Emps = () => {
  return (
    <div>
      <h2>Emps</h2>
      <div class='form-group'>
        <label for='exampleInputEmail1' class='form-label mt-4'>
          البحث عن مندوب
        </label>
        <input
          type='email'
          class='form-control'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          placeholder='اكتب اسم أو جزء من اسم المندوب'
        />
      </div>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>passowrd</td>
            <td>الحي</td>
            <td>رقم الجوال الأول</td>
            <td>رقم الجوال الثاني</td>
            <td>البريد الإلكتروني</td>
            <td>الحي</td>
            <td>ملاحظات</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default Emps;
