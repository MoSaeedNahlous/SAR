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
import AddEmp from './components/pages/management/addEmp/AddEmp';

function App() {
  return (
    <div className='App'>
      <Router>
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
          <Route path='/management/add-emp' element={<AddEmp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
