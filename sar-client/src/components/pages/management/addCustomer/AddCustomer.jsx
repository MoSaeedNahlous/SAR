import React from 'react'
import AddCustomerForm from '../../../ui/forms/addCustomer/AddCustomerForm'
import Customers from '../../../ui/tables/customers/Customers'

const AddCustomer = () => {
  return (
    <>
        <AddCustomerForm />
        <Customers />
    </>
  )
}

export default AddCustomer