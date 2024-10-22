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
                    <Route path='/:id' element={<Product/>}/>
                    <Route path='/auth' element={<Auth/>}>
                      <Route path='login' element={<Login/>}/>
                      <Route path='register' element={<Register/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.Fragment>
  )
}

export default Krypt