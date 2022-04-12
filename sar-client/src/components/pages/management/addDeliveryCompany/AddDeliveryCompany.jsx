import React from 'react';
import DeliveriesCompanyForm from '../../../ui/forms/deliveriesCompany/DeliveriesCompanyForm';
import DeliveriesCompanies from '../../../ui/tables/deliveriesCompanies/DeliveriesCompanies';
import { dComs } from '../../../ui/tables/deliveriesCosts/dummy-deliveries';

const AddDeliveryCompany = () => {
  return (
    <div>
      <DeliveriesCompanyForm />
      <DeliveriesCompanies />
    </div>
  );
};

export default AddDeliveryCompany;
