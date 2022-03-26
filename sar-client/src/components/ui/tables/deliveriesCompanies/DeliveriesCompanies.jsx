import React from 'react';
import { Button, Checkbox, FormControlLabel } from '@mui/material';

const DeliveriesCompanies = ({ data }) => {
  return (
    <div className='text-center'>
      <h3 className='my-5 fw-bold'>شركات التوصيل </h3>
      <table className='table table-striped w-75 mx-auto mt-2' dir='rtl'>
        <thead>
          <tr className='bg-primary text-white'>
            <th>ID</th>
            <th>الاسم</th>
            <th className='bg-primary text-white'>خيارات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cat) => (
            <tr>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td className='d-flex justify-content-center'>
              <button className='btn btn-danger mx-2'>حذف</button> 
              <button className='btn btn-primary mx-2'>تعديل</button>
                <FormControlLabel
                  control={<Checkbox name='Show' />}
                  label='إظهار'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveriesCompanies;
