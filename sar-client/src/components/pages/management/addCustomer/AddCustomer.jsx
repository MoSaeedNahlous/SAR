import React from 'react'
import AddCustomerForm from '../../../ui/forms/addCustomer/AddCustomerForm'
import Customer from '../../../ui/tables/customers/Customer'

const AddCustomer = () => {
  return (
    <>
        <AddCustomerForm />
        <Customer />
    </>
  )
}

export default AddCustomer