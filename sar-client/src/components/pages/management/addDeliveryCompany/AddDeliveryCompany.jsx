import React from 'react';
import DeliveriesComapnyForm from '../../../ui/forms/deliveriesCompany/DeliveriesComapnyForm';
import DeliveriesCompanies from '../../../ui/tables/deliveriesCompanies/DeliveriesCompanies';
import { dComs } from '../../../ui/tables/deliveriesCosts/dummy-deliveries';

const AddDeliveryCompany = () => {
  return (
    <div>
      <DeliveriesComapnyForm />
      <DeliveriesCompanies data={dComs} />
    </div>
  );
};

export default AddDeliveryCompany;
