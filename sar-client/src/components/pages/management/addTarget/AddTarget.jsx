import React from 'react';
import { cats } from '../../../ui/forms/categories/dummy-cats';
import TargetForm from '../../../ui/forms/target/TargetForm';
import Targets from '../../../ui/tables/targets/Targets';

const AddTarget = () => {
  return (
    <div>
      <TargetForm />
      <Targets data={cats} />
    </div>
  );
};

export default AddTarget;
