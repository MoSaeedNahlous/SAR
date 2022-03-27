import React from 'react'
import { cats } from '../../../ui/forms/categories/dummy-cats'
import SizeForm from '../../../ui/forms/size/SizeForm'
import Sizes from '../../../ui/tables/sizes/Sizes'

const AddSize = () => {
  return (
      <div>
          <SizeForm />
          <Sizes data={cats} />
    </div>
  )
}

export default AddSize