import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Items from './Items';
import About from './About';
import AddProduct from './AddProduct';
import Header from './Header';
import Item from './Item';
import BookingPage from './BookingPage';
import Register from './Register';
import Login from './Login';
import UserDashboard from './UserDashboard';
import SupplierDashboard from './SupplierDashboard.js'

import { useAuth } from './AuthContext'; // ✅ Auth context
import ProductData from './ProductData.js';
import UpdateProduct from './UpdateProduct.js';
import AdminDashboard from './AdminDashboard.js'
import ForgetPassword from './ForgetPassword.js';

function App() {
  const { role,username } = useAuth(); // ✅ Get logged-in user from context
console.log("role is : ",role)
  return (
    <div className="App" >
      {/* <AuthProvider> */}
      <BrowserRouter>
        <Header className='bg-primary' />
        <Routes >
          {/* Public routes */}
          <Route path="/" element={<Items />} />
          <Route path="/product" element={<Items />} />
          <Route path="/product/:id" element={<Item />} />
          <Route path="/about" element={<About />} />
          <Route path="/addProduct" element={(role==='ROLE_SUPPLIER')?<AddProduct />:<Items/>}></Route>
          <Route path="/login" element={(!username)?<Login />:<Items></Items>} />
          <Route path="/register" element={<Register />} />
          
          <Route path='/dashboard' element={(role==='ROLE_SUPPLIER')?<SupplierDashboard></SupplierDashboard>:(role==='ROLE_ADMIN')?<AdminDashboard></AdminDashboard>:<UserDashboard></UserDashboard>}></Route>
          <Route path='/productDashboard' element={(role==='ROLE_ADMIN'||role==='ROLE_SUPPLIER')?<ProductData></ProductData>:<Items></Items>}></Route>
          <Route path='/UpdateProduct/:id' element={(role==='ROLE_SUPPLIER')?<UpdateProduct></UpdateProduct>:<Items></Items>}></Route>
          <Route path='/book/:id' element={<BookingPage></BookingPage>}></Route>
          <Route path='/adminDashboard' element={<AdminDashboard></AdminDashboard>}></Route>
          <Route path='/forgetPassword' element={<ForgetPassword></ForgetPassword>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
