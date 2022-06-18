import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import ProductsCat from '../../../ui/productsCat/ProductsCat';

const ModifyProductsCat = () => {
  const nav = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  useEffect(() => {
    if (!cookies.user) {
      nav('/manager/login', { replace: true });
    }
    if (cookies.user.split('+')[1] !== 'A') {
      nav('/', { replace: true });
    }
  }, [cookies.user]);
  const [data, setData] = useState({ word: '', method: 'pCode' });

  const submitHandler = (e) => {
    e.preventDefault();
    nav(`/products/modify/${data.method}/${data.word}`);
  };

  return (
    <div>
      <form className='d-flex w-50 m-4 mx-auto' onSubmit={submitHandler}>
        <input
          required
          className='form-control me-2'
          type='search'
          value={data.word}
          onChange={(e) => setData({ ...data, word: e.target.value })}
          placeholder='رقم الموديل'
          aria-label='Search'
        />
        <button className='btn btn-light' type='submit'>
          بحث
        </button>
      </form>
      <ProductsCat edit />
    </div>
  );
};

export default ModifyProductsCat;
