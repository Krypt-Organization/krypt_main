import React from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Layout from './pages/layout/Layout'
import Home from './pages/home/Home'
import Contact from './pages/contact/Contact'
import Product from './pages/products/Product'
import Products from './pages/products/Products'
import Order from './components/Order'
import Auth from "./pages/auth/Auth"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Billing from "./components/Billing.jsx"
import User from "./pages/users/User"
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import OrderStatus from './components/OrderStatus.jsx'

function Krypt() {
  return (
    <React.Fragment>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path='/order' element={<Order/>}/>
                    <Route path="/billing" element={<Billing/>}/>
                    <Route path="/order-status" element={<OrderStatus/>}/>
                    <Route path='/:id' element={<Product/>}/>
                    <Route path='/auth' element={<Auth/>}>
                      <Route path='login' element={<Login/>}/>
                      <Route path='register' element={<Register/>}/>
                      <Route path="forgot-password" element={<ForgotPassword/>}/>
                    </Route>
                </Route>
                <Route path='/user' element={<User/>}/>
            </Routes>
        </BrowserRouter>
    </React.Fragment>
  )
}

export default Krypt