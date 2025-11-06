
import { Routes,Route } from 'react-router-dom'
import './App.css'
import MainLayout from './layout/MainLayout'
import Home from './components/Home'
import Product from './components/Product'
import AddProduct from './components/AddProduct'
import ViewProduct from './components/ViewProduct'
import UpdateProduct from './components/UpdateProduct'
import Cart from './components/Cart'
import Orders from './components/Order'

function App() {


  return (
    <>
    <Routes>
      <Route element={<MainLayout/>}>
    <Route path='/' element={<Home/>}/>
    <Route path='/products' element={<Product/>}/>
    <Route path='/add-product' element={<AddProduct/>}/>
    <Route path="/products/:id" element={<ViewProduct />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/update-product/:id" element={<UpdateProduct />} />
    <Route path='/orders' element={<Orders/>}/>
    


</Route>
    </Routes>
     
    </>
  )
}

export default App
