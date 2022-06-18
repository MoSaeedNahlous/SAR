import React from 'react';
import CreateBillForm from '../../ui/forms/createBillForm/CreateBillForm';

const CreateBillPage = ({ emp }) => {
  return (
    <div className='w-75 py-3 mx-auto pt-5'>
      <CreateBillForm emp={emp} />
    </div>
  );
};

export default CreateBillPage;
