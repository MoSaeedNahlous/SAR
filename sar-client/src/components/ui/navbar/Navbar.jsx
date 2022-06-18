import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import './navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getProducts } from '../../../redux/actions/productsActions';
import { useCookies } from 'react-cookie';

const Navbar = () => {
  const nav = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const logout = () => {
    if (confirm('هل أنت متأكد؟')) {
      if (cookies.user.split('+')[1] == 'A') {
        removeCookie('user');
        nav('/manager/login', { replace: true });
      } else {
        removeCookie('user');
        nav('/emp/login', { replace: true });
      }
    }
  };

  const [data, setData] = useState({ searchMethod: 'size', word: '' });

  const submitHandler = (e) => {
    e.preventDefault();
    setData({ searchMethod: 'size', word: '' });
    nav(`/products/${data.searchMethod}/${data.word}`);
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          <img
            src={'/logo.png'}
            alt=''
            srcset=''
            style={{ width: '50px', height: '50px' }}
          />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        {cookies.user && cookies.user.split('+')[1] == 'A' && (
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              {localStorage.getItem('currentBillId') != null && (
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    aria-current='page'
                    to='/return-to-current-order'
                  >
                    العودة إلى الطلبية
                  </Link>
                </li>
              )}

              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  href='#'
                  id='navbarDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  المندوب
                </a>
                <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                  <li>
                    <Link className='dropdown-item' to={'/emp/accountments'}>
                      كشف حساب مندوب
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='dropdown-item'
                      aria-current='page'
                      to='/emp/stats'
                    >
                      الإحصاءات
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  href=''
                  id='navbarDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  شركات التوصيل
                </a>
                <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                  <li>
                    {' '}
                    <Link
                      className='dropdown-item'
                      to={'/delivery-companies-total-payments'}
                    >
                      مجموع الأجور من شركات التوصيل
                    </Link>{' '}
                  </li>
                </ul>
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  aria-current='page'
                  to={'/products/modify/'}
                >
                  {' '}
                  تعديل المنتجات{' '}
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  aria-current='page'
                  to='/create-bill'
                >
                  {' '}
                  إنشاء فاتورة
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' aria-current='page' to='/orders'>
                  الطلبيات
                </Link>
              </li>
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  href=''
                  id='navbarDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  المنتجات
                </a>
                <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                  <li>
                    {' '}
                    <Link
                      className='dropdown-item'
                      to={'/products/add-product'}
                    >
                      إضافة منتج
                    </Link>{' '}
                  </li>
                  <li>
                    {' '}
                    <Link className='dropdown-item' to={'/products/categories'}>
                      المنتجات
                    </Link>{' '}
                  </li>
                  <li>
                    {' '}
                    <Link
                      className='dropdown-item'
                      to={'/products/out-of-stock'}
                    >
                      المنتجات 0
                    </Link>{' '}
                  </li>
                </ul>
              </li>

              <li className='nav-item dropdown'>
                <span
                  className='nav-link dropdown-toggle'
                  id='navbarDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  الإدارة
                </span>
                <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                  <li>
                    {' '}
                    <Link
                      className='dropdown-item'
                      to={'/management/add-category'}
                    >
                      إضافة صنف رئيسي
                    </Link>{' '}
                  </li>
                  <li>
                    {' '}
                    <Link
                      className='dropdown-item'
                      to={'/management/add-subcategory'}
                    >
                      إضافة صنف فرعي
                    </Link>{' '}
                  </li>
                  <li>
                    {' '}
                    <Link
                      className='dropdown-item'
                      to={'/management/add-target'}
                    >
                      إضافة مخصص
                    </Link>{' '}
                  </li>
                  <li>
                    {' '}
                    <Link className='dropdown-item' to={'/management/add-size'}>
                      إضافة قياس
                    </Link>{' '}
                  </li>
                  <li>
                    {' '}
                    <Link className='dropdown-item' to={'/management/add-city'}>
                      إضافة مدينة
                    </Link>{' '}
                  </li>
                  <li>
                    {' '}
                    <Link
                      className='dropdown-item'
                      to={'/management/add-delivery-cost'}
                    >
                      إضافة أجور التوصيل
                    </Link>{' '}
                  </li>
                  <li>
                    {' '}
                    <Link
                      className='dropdown-item'
                      to={'/management/add-delivery-company'}
                    >
                      إضافة شركة التوصيل
                    </Link>{' '}
                  </li>
                  <li>
                    {' '}
                    <Link
                      className='dropdown-item'
                      to={'/management/add-employee'}
                    >
                      إضافة مندوب جديد
                    </Link>{' '}
                  </li>
                  <li>
                    {' '}
                    <Link className='dropdown-item' to={'/management/add-post'}>
                      إضافة منشور جديد
                    </Link>{' '}
                  </li>
                  <li>
                    {' '}
                    <Link
                      className='dropdown-item'
                      to={'./management/add-customer'}
                    >
                      إضافة زبون جديد
                    </Link>{' '}
                  </li>
                </ul>
              </li>
            </ul>
            <button
              className='btn btn-primary bg-gradient me-2'
              onClick={logout}
            >
              تسجيل خروج
            </button>
            <form className='d-flex' onSubmit={submitHandler}>
              <select
                onChange={(e) =>
                  setData({ ...data, searchMethod: e.target.value })
                }
                value={data.searchMethod}
                className='form-select w-50'
                id='exampleSelect1'
              >
                <option value={'size'}>القياس</option>
                <option value={'pCode'}>رقم الموديل</option>
              </select>

              <input
                required
                className='form-control me-2'
                type='search'
                value={data.word}
                onChange={(e) => setData({ ...data, word: e.target.value })}
                placeholder='.. بحث'
                aria-label='Search'
              />
              <button className='btn btn-light' type='submit'>
                بحث
              </button>
            </form>
          </div>
        )}
        {cookies.user && cookies.user.split('+')[1] != 'A' && (
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              {localStorage.getItem('currentBillId') != null && (
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    aria-current='page'
                    to='/return-to-current-order-emp'
                  >
                    العودة إلى الطلبية
                  </Link>
                </li>
              )}

              <li className='nav-item'>
                <Link className='nav-link' aria-current='page' to='/profile'>
                  حسابي
                </Link>
              </li>

              <li className='nav-item'>
                <Link
                  className='nav-link'
                  aria-current='page'
                  to={'/products/categories'}
                >
                  عرض المنتجات
                </Link>
              </li>

              <li className='nav-item'>
                <Link
                  className='nav-link'
                  aria-current='page'
                  to='/create-bill-employee'
                >
                  إنشاء الفاتورة
                </Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' aria-current='page' to='/orders-emp'>
                  الطلبيات
                </Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' aria-current='page' to='/reports'>
                  عرض الكشوفات
                </Link>
              </li>

              <li className='nav-item'>
                <Link
                  className='nav-link'
                  aria-current='page'
                  to='/add-customer'
                >
                  إضافة زبون جديد
                </Link>
              </li>
            </ul>
            <button
              className='btn btn-primary bg-gradient me-2'
              onClick={logout}
            >
              تسجيل خروج
            </button>
            <form className='d-flex' onSubmit={submitHandler}>
              <select
                onChange={(e) =>
                  setData({ ...data, searchMethod: e.target.value })
                }
                value={data.searchMethod}
                className='form-select w-50'
                id='exampleSelect1'
              >
                <option value={'size'}>القياس</option>
                <option value={'pCode'}>رقم الموديل</option>
              </select>

              <input
                required
                className='form-control me-2'
                type='search'
                value={data.word}
                onChange={(e) => setData({ ...data, word: e.target.value })}
                placeholder='.. بحث'
                aria-label='Search'
              />
              <button className='btn btn-light' type='submit'>
                بحث
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
