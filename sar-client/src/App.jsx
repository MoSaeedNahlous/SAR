import EmpLoginPage from './components/pages/EmpLogin/EmpLoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/emp-login' element={<EmpLoginPage />} />

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
          <Route
            path='/management/add-post'
            element={<AddPost />}
          />
           <Route
            path='/management/add-employee'
            element={<AddEmp />}
          />
           <Route
            path='/management/add-customer'
            element={ <AddCustomer /> }
          />
          {/* Products Routes */}
          <Route path='/products/add-product' element={<AddProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
