import React from 'react';
import { Button, TextField } from '@mui/material';

const DeliveriesComapnyForm = () => {
  return (
    <form>
      <h2>DeliveriesComapny</h2>

      <TextField label='اسم الشركة' variant='standard' />
      <Button variant='contained' type='submit'>
        Add
      </Button>
      <Button variant='outlined'>Edit</Button>
    </form>
  );
};

export default DeliveriesComapnyForm;
