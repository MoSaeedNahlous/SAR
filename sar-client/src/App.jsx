import {
  HashRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import Home from './components/pages/home/Home';
import AddCategory from './components/pages/management/addCategory/AddCategory';
import AddSubCategory from './components/pages/management/addSubCategory/AddSubCategory';
import AddTarget from './components/pages/management/addTarget/AddTarget';
import AddSize from './components/pages/management/addSize/AddSize';
import AddCity from './components/pages/management/addCity/AddCity';
import AddDeliveryCost from './components/pages/management/addDeliveryCost/AddDeliveryCost';
import AddDeliveryCompany from './components/pages/management/addDeliveryCompany/AddDeliveryCompany';
import './bootstrap.min.css';
import Navbar from './components/ui/navbar/Navbar';
import AddProduct from './components/pages/products/addProduct/AddProduct';
import AddPost from './components/pages/management/addPost/AddPost';
import AddCustomer from './components/pages/management/addCustomer/AddCustomer';
import AddEmp from './components/pages/management/addEmp/AddEmp';
import OrderPage from './components/pages/orders/OrderPage';
import CreateBillPage from './components/pages/createBill/CreateBillPage';
import BillDetails from './components/ui/complexComponents/BIllDetails';
import ShowProducts from './components/pages/products/showProducts/ShowProducts';
import './App.css';
import ShowProductsSubCat from './components/pages/products/showProducts/showProductsSubCat/ShowProductsSubCat';
import ProductsPage from './components/pages/products/showProducts/showProductsSubCat/products/ProductsPage';
import ProductPage from './components/pages/product/ProductPage';
import Products from './components/ui/products/Products';
import OutOfStockProducts from './components/pages/products/outOfStockProducts/OutOfStockProducts';
import ProductDetails from './components/ui/product/ProductDetails';
import LoginPage from './components/pages/login/LoginPage';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { isEmpBlocked } from './redux/actions/authActions';
import Statics from './components/pages/emp/Statics';
import TotalPayments from './components/pages/deliveryCompanies/TotalPayments';
import Accountment from './components/pages/emp/Accountment';
import ModifyProductsCat from './components/pages/products/modifyProducts/ModifyProductsCat';
import ProductsSubCat from './components/ui/productsSubCat/ProductsSubCat';
import ModifyProductsSubCat from './components/pages/products/modifyProducts/ModifyProductsSubCat';
import ModifyProducts from './components/pages/products/modifyProducts/ModifyProducts';
import Profile from './components/employeePages/profile/Profile';
import Reports from './components/employeePages/reports/Reports';
import Orders from './components/ui/complexComponents/Orders';

function App() {
  const [user, setUser] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const dispatch = useDispatch();
  const blockedST = useSelector((state) => state.login);
  const { isBlocked } = blockedST;

  useEffect(() => {
    if (cookies.user) {
      dispatch(isEmpBlocked(cookies.user.split('+')[0]));
      if (isBlocked == true) {
        removeCookie('user');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userType');
      }
    }
  }, [isBlocked, cookies.user]);

  useEffect(() => {
    if (cookies.user) {
      sessionStorage.setItem('userId', cookies.user.split('+')[0]);
      sessionStorage.setItem('userType', cookies.user.split('+')[1]);
      setUser(cookies.user);
    }
  }, [cookies.user]);

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route exact path='/emp/login' element={<LoginPage emp />} />
          <Route exact path='/manager/login' element={<LoginPage manager />} />
          {/* Management Routes*/}
          <Route path='/management/add-category' element={<AddCategory />} />
          <Route
            path='/management/add-subcategory'
            element={<AddSubCategory />}
          />
          <Route path='/management/add-target' element={<AddTarget />} />
          <Route path='/management/add-size' element={<AddSize />} />
          <Route path='/management/add-city' element={<AddCity />} />
          <Route
            path='/management/add-delivery-cost'
            element={<AddDeliveryCost />}
          />
          <Route
            path='/management/add-delivery-company'
            element={<AddDeliveryCompany />}
          />
          <Route path='/management/add-post' element={<AddPost />} />
          <Route path='/management/add-employee' element={<AddEmp />} />
          <Route path='/management/add-customer' element={<AddCustomer />} />
          {/* Products Routes */}
          <Route path='/products/add-product' element={<AddProduct />} />
          <Route path='/products/categories' element={<ShowProducts />} />
          <Route
            path='/products/subcategories/:catId'
            element={<ShowProductsSubCat />}
          />
          <Route path='/products/product/:pid' element={<ProductDetails />} />
          <Route
            path='/products/out-of-stock'
            element={<OutOfStockProducts />}
          />
          <Route
            exact
            path='/products/out-of-stock/product/:pid'
            element={<ProductDetails showBtn />}
          />
          <Route
            exact
            path='/products/modify/'
            element={<ModifyProductsCat />}
          />
          <Route
            exact
            path='/products/modify/subcategories/:catId'
            element={<ModifyProductsSubCat />}
          />
          <Route
            exact
            path='/products/modify/:subCatId'
            element={<ModifyProducts />}
          />
          <Route
            exact
            path='/products/modify/product/:pid'
            element={<ProductDetails showBtn edit />}
          />
          <Route exact path='/products' element={<ProductsPage />} />
          <Route path='/products/:subCatId' element={<ProductsPage />} />
          <Route path='/products/:method/:word' element={<ProductsPage />} />
          <Route
            path='/products/modify/:method/:word'
            element={<ProductsPage edit />}
          />
          {/* Orders Route  */}
          <Route path='/orders' element={<OrderPage />} />
          {/* Delivery Companies Route  */}
          <Route
            path='/delivery-companies-total-payments'
            element={<TotalPayments />}
          />
          {/* Create Bill Route */}
          <Route path='/create-bill' element={<CreateBillPage />} />
          <Route path='/test' element={<ProductPage />} />
          {/* emp Route */}
          <Route path='/emp/stats' element={<Statics />} />
          <Route path='/emp/accountments' element={<Accountment />} />
          {/* return to order */}
          <Route path='/return-to-current-order' element={<BillDetails />} />

          {/* Employees Routes */}
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/reports' element={<Accountment empST />} />
          <Route exact path='/add-customer' element={<AddCustomer emp />} />
          <Route
            exact
            path='/create-bill-employee'
            element={<CreateBillPage emp />}
          />

          <Route exact path='/orders-emp' element={<OrderPage empST />} />

          <Route
            path='/return-to-current-order-emp'
            element={<BillDetails emp />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
