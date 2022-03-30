import {Link} from 'react-router-dom'
import React from 'react'
import './navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="#">العودة إلى الطلبية</a>
        </li>
        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            المندوب
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">كشف حساب مندوب</a></li>
            <li><a className="dropdown-item" href="#">الإحصاءات</a></li>
        </ul>
        </li>
        <li className='nav-item dropdown'>
            <a className='nav-link dropdown-toggle' href='' id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                شركات التوصيل
            </a>
            <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li> <a className='dropdown-item' href=''>مجموع الأجور من شركات التوصيل</a> </li>
            </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="#"> تعديل المنتجات </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="#">  إنشاء فاتورة</a>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/orders">الطلبيات</Link>
        </li>
        <li className='nav-item dropdown'>
            <a className='nav-link dropdown-toggle' href='' id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
            المنتجات
            </a>
            <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li> <Link className='dropdown-item' to={'/products/add-product'}>إضافة منتج</Link> </li>
                <li> <a className='dropdown-item' href=''>المنتجات</a> </li>
            </ul>
        </li>
        
        <li className='nav-item dropdown'>
            <span className='nav-link dropdown-toggle' id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
            الإدارة
            </span>
            <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li> <Link className='dropdown-item' to={'/management/add-category'}>إضافة صنف رئيسي</Link> </li>
                <li> <Link className='dropdown-item' to={'/management/add-subcategory'}>إضافة صنف فرعي</Link> </li>
                <li> <Link className='dropdown-item' to={'/management/add-target'}>إضافة مخصص</Link> </li>
                <li> <Link className='dropdown-item' to={'/management/add-size'}>إضافة قياس</Link> </li>
                <li> <Link className='dropdown-item' to={'/management/add-city'}>إضافة مدينة</Link> </li>
                <li> <Link className='dropdown-item' to={'/management/add-delivery-cost'}>إضافة أجور التوصيل</Link> </li>
                <li> <Link className='dropdown-item' to={'/management/add-delivery-company'}>إضافة شركة التوصيل</Link> </li>
                <li> <Link className='dropdown-item' to={'/management/add-employee'}>إضافة مندوب جديد</Link> </li>
                <li> <Link className='dropdown-item' to={'/management/add-post'}>إضافة منشور جديد</Link> </li>
                <li> <Link className='dropdown-item' to={'./management/add-customer'}>إضافة زبون جديد</Link> </li>

            </ul>
        </li>
      </ul>
    <button className='btn btn-primary bg-gradient me-2'>تسجيل خروج</button>
      <form className="d-flex">
      
      <select className="form-select w-50" id="exampleSelect1">
        <option>القياس</option>
        <option>رقم الموديل</option>
        
      </select>
  
        <input className="form-control me-2" type="search" placeholder=".. بحث" aria-label="Search" />
        <button className="btn btn-light" type="submit">بحث</button>
      </form>
    </div>
  </div>
</nav>
  )
}

export default Navbar