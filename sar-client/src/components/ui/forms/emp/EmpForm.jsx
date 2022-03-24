import React from 'react';

const EmpForm = () => {
  return (
    <form>
      <legend>إضافة مندوب</legend>
      <div class='form-group row'>
        <label for='staticEmail' class='col-sm-2 col-form-label'>
          الاسم
        </label>
        <div class='col-sm-10'>
          <input
            type='text'
            readonly=''
            class='form-control-plaintext'
            id='staticEmail'
          />
        </div>
      </div>
      <div class='form-group'>
        <label for='exampleInputEmail1' class='form-label mt-4'>
          رقم الجوال الأول
        </label>
        <input
          type='email'
          class='form-control'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          placeholder='Enter email'
        />
      </div>
      <div class='form-group'>
        <label for='exampleInputEmail1' class='form-label mt-4'>
          رقم الجوال الثاني
        </label>
        <input
          type='email'
          class='form-control'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          placeholder='Enter email'
        />
      </div>
      <div class='form-group'>
        <label for='exampleInputEmail1' class='form-label mt-4'>
          المدينة
        </label>
        <input
          type='email'
          class='form-control'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          placeholder='Enter email'
        />
      </div>
      <div class='form-group'>
        <label for='exampleInputEmail1' class='form-label mt-4'>
          الحي
        </label>
        <input
          type='email'
          class='form-control'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          placeholder='Enter email'
        />
      </div>
      <div class='form-group'>
        <label for='exampleInputEmail1' class='form-label mt-4'>
          البريد الإلكتروني
        </label>
        <input
          type='email'
          class='form-control'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          placeholder='Enter email'
        />
      </div>
      <div class='form-group'>
        <label for='exampleInputPassword1' class='form-label mt-4'>
          كلمة السر{' '}
        </label>
        <input
          type='password'
          class='form-control'
          id='exampleInputPassword1'
          placeholder='Password'
        />
      </div>

      <div class='form-group'>
        <label for='exampleTextarea' class='form-label mt-4'>
          الملاحظات
        </label>
        <textarea class='form-control' id='exampleTextarea' rows='3'></textarea>
      </div>

      <button type='submit' class='btn btn-primary'>
        إضافة
      </button>
      <button type='submit' class='btn btn-primary'>
        تعديل
      </button>
    </form>
  );
};

export default EmpForm;
