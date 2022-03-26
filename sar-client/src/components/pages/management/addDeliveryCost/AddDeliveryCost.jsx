import React from 'react'
import DeliveryCostForm from '../../../ui/forms/deliveriesCost/DeliveryCostForm'
import DeliveriesCosts from '../../../ui/tables/deliveriesCosts/DeliveriesCosts'
import { dComs } from '../../../ui/tables/deliveriesCosts/dummy-deliveries'

const AddDeliveryCost = () => {
  return (
      <div>
          
          <DeliveryCostForm />
          <DeliveriesCosts data={dComs} />
    </div>
  )
}

export default AddDeliveryCost