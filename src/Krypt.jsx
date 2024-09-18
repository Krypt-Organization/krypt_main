import React from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Layout from './pages/layout/Layout'
import Home from './pages/home/Home'
import Contact from './pages/contact/Contact'
import Product from './pages/products/Product'
import Products from './pages/products/Products'
import Cart from './components/Cart'

function Krypt() {
  return (
    <React.Fragment>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/:id' element={<Product/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.Fragment>
  )
}

export default Krypt