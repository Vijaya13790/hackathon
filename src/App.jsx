
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './component/auth/ProtectedRoute'
import Cart from './pages/Cart'
import Product from './component/Product'
function App() {

  return (
    <>
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/products' element={<Product />} />
           
             <Route path='/cart' element={<Cart />} />
           
          </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
