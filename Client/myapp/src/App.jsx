import React from 'react'
import { Routes, Route } from "react-router-dom";
import CustomersPage from "./Pages/Customers";
import OrderPage from './Pages/Order';
import ProductsPage from './Pages/Products';
import './App.css'
import ResponsiveAppBar from './Components/AppBarComp';
import Cart from './Pages/Cart';

export default function App() {

  return (
    <div>
      <ResponsiveAppBar/>
      <Routes>
        <Route path='/' element={<CustomersPage/>}></Route>
        <Route path='/products' element={<ProductsPage/>}></Route>
        <Route path='/order' element={<OrderPage/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
    </div>
  )
}
