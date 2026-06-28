import './App.css'
import { Routes, Route } from "react-router-dom";
import { Navbar } from './component/navbar/Navbar';
import { Home } from './pages/home/Home';
import { Footer } from './component/footer/Footer';
import { Toaster } from "./component/sonner/Sonner";
import { Login } from './pages/login/Login';
import { useState } from 'react';
import { Aboutus } from './pages/aboutus/Aboutus';
import { Productpage } from './pages/productpage/Productpage';
import { ProductDetails } from './pages/productdetail/ProductDetails';
import { Cart } from './pages/cart/Cart';
import { Checkout } from './pages/checkout/Checkout';
import { OrderHistory } from './pages/orderhistory/Orderhistory';
import { Profile } from './pages/profile/Profile';
import EditProfile from './pages/editprofile/EditProfile';
import Settings from './pages/Setting/Setting';
import { AddProducts } from './pages/admin/AddProducts/AddProducts';
import { AdminDashboard } from './pages/admin/Dashboard/AdminDashboard';
import { OrderManagement } from './pages/admin/ordermanagement/OrderManagement';
import { ProductManagement } from './pages/admin/productmanagement/ProductManagement';
import { UserManagement } from './pages/admin/UserManagement/UserMangement';
import { OrderDetails } from './pages/OrderDetails/OrderDetails';
import { AdminLayout } from "./pages/admin/AdminLayout/AdminLayout";
import AddUserModel from './pages/admin/AddUser/AddUserModel';
import EditUser from './pages/admin/EditUser/EditUser';
import EditProduct from './pages/admin/EditProduct/EditProduct';
import AdminOrderDetails from './pages/admin/AdminOrderDetails/AdminOrderDetails';
import AdminProfile from './pages/admin/AdminProfile/AdminProfile';
import EditAdminProfile from './pages/admin/EditAdminProfile/EditAdminProfile';
import ChangePassword from './pages/admin/ChangePassword/ChangePassword';
function App() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
    <Toaster />
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/products" element={<Productpage/>}/>
        <Route path="/productpage" element={<Productpage/>}/>
        <Route path="/aboutus" element={<Aboutus/>}/>
        <Route path="/products/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/orders" element={<OrderHistory/>}/>
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/edit" element={<EditProfile/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="profile/edit" element={<EditAdminProfile/>} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/add-products" element={<AddProducts />} />
          <Route path="products/add" element={<AddProducts />} />
          <Route  path="products/edit/:id" element={<EditProduct />}/>
          <Route path="orders" element={<OrderManagement />} />
          <Route path="orders/:id"  element={<AdminOrderDetails />}/>
          <Route path="users" element={<UserManagement />} />
          <Route path="users/add-user" element={<AddUserModel />} />
          <Route path="users/edit/:id" element={<EditUser />} />
          <Route path="change-password" element={<ChangePassword />}/>
        </Route>
      </Routes>

      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />

      <Footer/>
    </>
  )
}

export default App
