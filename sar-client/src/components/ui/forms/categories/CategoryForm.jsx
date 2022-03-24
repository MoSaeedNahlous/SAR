import { Button, TextField } from '@mui/material';
import React from 'react';

const CategoryForm = () => {
  return (
    <form>
      <h2>Category</h2>

      <TextField label='اسم الصنف' variant='standard' />
      <Button variant='contained' type='submit'>
        Add
      </Button>
      <Button variant='outlined'>Edit</Button>
    </form>
  );
};

export default CategoryForm;
