import React from 'react';
import Products from '../../../../../ui/products/Products';

const ProductsPage = ({ edit }) => {
  return (
    <div>
      <Products edit={edit} />
    </div>
  );
};

export default ProductsPage;
