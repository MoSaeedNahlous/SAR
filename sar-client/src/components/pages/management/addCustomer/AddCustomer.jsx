import React from 'react';
import AddCustomerForm from '../../../ui/forms/addCustomer/AddCustomerForm';
import Customers from '../../../ui/tables/customers/Customers';

const AddCustomer = ({ emp }) => {
  return (
    <>
      <AddCustomerForm emp={emp} />
      <Customers emp={emp} />
    </>
  );
};

export default AddCustomer;
