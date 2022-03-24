import React from 'react'
import CityForm from '../../../ui/forms/city/CityForm'
import Cities from '../../../ui/tables/cities/Cities'
import { cities } from '../../../ui/tables/cities/dummy-cities'

const AddCity = () => {
  return (
      <div>
          <CityForm />
          <Cities data={cities} />
    </div>
  )
}

export default AddCity